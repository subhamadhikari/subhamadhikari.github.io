---
title: "API Design"
date: 2026-06-10
draft: false
math: true
description: "Notes on API design and RESTful best practices for System Design."
tags: ["software engineering", "system design", "Computer Science"]
---

## 1. Identifying Resources

Resources are the core nouns of your API — anything the client can act on. Rules:

- Use **nouns, not verbs** in endpoints. The HTTP method conveys the action.
- Model resources around business entities: `users`, `orders`, `products`.
- Keep URIs **lowercase and hyphen-separated** for multi-word names: `/product-categories`.
- Represent hierarchy through nesting where ownership is clear: `/users/{id}/orders`.
  Avoid nesting deeper than 2 levels — it becomes brittle.
- Treat collections and single items as distinct resources:
  - Collection: `/articles`
  - Single item: `/articles/{id}`

---

## 2. Structuring the API

### Base URL

```
https://api.example.com/v1/
```

Always version at the URL level (`/v1/`) to allow breaking changes without disrupting existing clients.

### URL Patterns

| Resource      | URI                                |
| ------------- | ---------------------------------- |
| All users     | `GET /users`                       |
| Single user   | `GET /users/{id}`                  |
| User's orders | `GET /users/{id}/orders`           |
| Single order  | `GET /users/{id}/orders/{orderId}` |

### General Guidelines

- **Plural nouns** for collections: `/users`, not `/user`.
- Use **path parameters** for identifying a specific resource: `/users/{id}`.
- Use **query parameters** for filtering, sorting, and pagination: `/users?role=admin&sort=created_at`.
- Avoid encoding actions in the URL. Instead of `POST /users/activate`, prefer `PATCH /users/{id}` with `{ "status": "active" }` in the body. For actions that don't map cleanly to CRUD, a controller sub-resource is acceptable: `POST /users/{id}/activate`.

---

## 3. HTTP Methods

| Method   | Usage                                                              | Idempotent? |
| -------- | ------------------------------------------------------------------ | ----------- |
| `GET`    | Retrieve a resource or collection. Never modifies state.           | Yes         |
| `POST`   | Create a new resource. Body contains the new resource data.        | No          |
| `PUT`    | Replace a resource entirely. Client sends the full representation. | Yes         |
| `PATCH`  | Partially update a resource. Client sends only changed fields.     | No\*        |
| `DELETE` | Remove a resource.                                                 | Yes         |

> \*PATCH can be made idempotent by design, but is not required to be.

**Key rules:**

- `GET` and `DELETE` have no request body.
- `PUT` requires the full resource; missing fields may be nulled out.
- Prefer `PATCH` over `PUT` for partial updates to avoid accidental data loss.

---

## 4. HTTP Status Codes

### Success (2xx)

| Code             | Meaning            | When to use                                               |
| ---------------- | ------------------ | --------------------------------------------------------- |
| `200 OK`         | Request succeeded  | `GET`, `PATCH`, `PUT` responses with a body               |
| `201 Created`    | Resource created   | `POST` that creates a resource; include `Location` header |
| `204 No Content` | Succeeded, no body | `DELETE`, or `PATCH`/`PUT` with no response body          |

### Client Errors (4xx)

| Code                       | Meaning                                 | When to use                                      |
| -------------------------- | --------------------------------------- | ------------------------------------------------ |
| `400 Bad Request`          | Malformed request or validation failure | Invalid JSON, missing required fields            |
| `401 Unauthorized`         | Not authenticated                       | Missing or invalid auth token                    |
| `403 Forbidden`            | Authenticated but not authorized        | Correct token, wrong permissions                 |
| `404 Not Found`            | Resource doesn't exist                  | Invalid ID, deleted resource                     |
| `409 Conflict`             | State conflict                          | Duplicate unique field, version mismatch         |
| `422 Unprocessable Entity` | Semantically invalid request            | Structurally valid body but fails business rules |
| `429 Too Many Requests`    | Rate limit exceeded                     | Throttling; include `Retry-After` header         |

### Server Errors (5xx)

| Code                        | Meaning                                        |
| --------------------------- | ---------------------------------------------- |
| `500 Internal Server Error` | Unhandled server-side error                    |
| `503 Service Unavailable`   | Server temporarily down; include `Retry-After` |

**Always return a consistent error body:**

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The 'email' field is required.",
    "field": "email"
  }
}
```

---

## 5. Pagination

For any endpoint returning a collection, always paginate. Returning unbounded lists will break at scale.

### Cursor-Based (Preferred for large/real-time data)

Uses an opaque pointer to a position in the dataset. Stable under inserts/deletes.

**Request:**

```
GET /posts?cursor=eyJpZCI6MTAwfQ&limit=20
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTIwfQ",
    "has_more": true
  }
}
```

### Offset-Based (Simpler, good for small datasets)

Uses `page`/`limit` or `offset`/`limit`. Easy to implement but can skip or duplicate items on concurrent writes.

**Request:**

```
GET /users?page=3&limit=25
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 3,
    "limit": 25,
    "total": 340,
    "total_pages": 14
  }
}
```

### Guidelines

- Always set a **default and maximum page size** (e.g., default 20, max 100).
- Never return unbounded collections even on small datasets — enforce limits defensively.
- Include `total` count only when you can compute it cheaply; skip it with cursor pagination.
- Return pagination metadata in a consistent `pagination` envelope, not mixed with `data`.

---

## Quick Checklist

- [ ] Resources are nouns; HTTP method expresses the action
- [ ] URIs are versioned (`/v1/`)
- [ ] Correct HTTP method used for each operation
- [ ] Responses use the appropriate 2xx/4xx/5xx code
- [ ] Error responses have a consistent machine-readable structure
- [ ] All list endpoints are paginated with a capped default limit
- [ ] Auth failures return `401` vs authorization failures return `403`
