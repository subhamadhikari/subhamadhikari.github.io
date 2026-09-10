---
title: "Transactional Outbox"
date: 2026-06-22
draft: false
math: true
description: "Notes on designing distributed service."
tags: ["software engineering", "system design", "Computer Science"]
---

When a service needs to update its database and publish an event about that update, you run into a classic problem: how do you do both reliably? If you write to the database first and then publish the event, the publish can fail and other services never find out. If you publish first and then write to the database, the write can fail and now you've told the world about something that never happened.

The transactional outbox pattern solves this by turning "update the DB and publish an event" into a single local transaction. Instead of publishing directly to a message broker, the service writes the event into an outbox table inside the same database transaction as the actual data change. Since both writes happen atomically, they either both succeed or both fail — there's no in-between state.

![Tranasctional Outbox](/cover/outbox-pattern.png "General Implementation")

A separate process then reads the outbox table and relays those events to the actual message broker, which fans them out to whichever services care about them. This relay can poll the table, tail the write-ahead log, or run on a schedule — the point is that it's decoupled from the original request, so a slow or failing broker never blocks the main write path.

I ended up implementing this pattern twice for the same use case: payment processing and reminders. Here's how both versions worked.

## Phase 1: Celery Worker + Beat

The first version was built around Celery. Payment events come in from Stripe — either through the payment service itself or through Stripe's webhook — and get written into an `Event Outbox` table as part of the same transaction as the payment record.

![Tranasctional Outbox](/cover/payment-flow.png "My Implementation")

Celery Beat polls this outbox table every 30 seconds, looking for rows where the status is `Pending`. When it finds one, it hands the row off to a Celery Worker, which executes the actual handler for that event — things like updating a subscription. Once the handler finishes, the outbox row gets updated to `Processed` or `Failed`, and if the event needs to change something downstream (like a subscription's state), the handler writes that update to its own table.

This worked, but it had two things I wasn't fully happy with:

- **Polling interval as a bottleneck.** A 30-second poll means worst-case latency of 30 seconds before an event even starts processing.
- **Infrastructure overhead.** Running Celery Beat and Workers means keeping long-lived processes alive, even when there's nothing to process.

## Phase 2: AWS Lambda + EventBridge

The second version moved the relay off Celery entirely and onto a serverless setup. FastAPI writes subscription-related operations (create, update, cancel, renew) into the outbox table in RDS, same as before — the write pattern doesn't change.

![Tranasctional Outbox](/cover/lambda-outbox.png "Lambda Implementation")

What changes is the relay itself. Instead of a Celery Beat process polling in a loop, an EventBridge rule triggers an Outbox Lambda on a schedule — every minute. The Lambda polls RDS for pending rows, branches on the event type, and pushes the event onto SQS for the relevant handler to consume downstream.

This got rid of the always-on worker processes — the Lambda only runs when EventBridge triggers it, and SQS handles the actual event delivery instead of a broker I had to manage myself. It also made the "what happens for each event type" logic more explicit, since the Lambda branches directly on event type rather than relying on Celery task routing.

## Takeaways

Both implementations follow the same core idea — write the event and the state change atomically, relay it separately — but the second version trades a stateful worker pool for a scheduled, stateless function. For a workload like this, where events don't need sub-second delivery, polling every minute from a Lambda is simpler to operate than keeping Celery processes alive around the clock.