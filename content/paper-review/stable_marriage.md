---
title: "College Admissions and the Stability of Marriage"
date: 2026-03-28
draft: false
author: "Subham Adhikari"
tags: ["matching theory", "game theory", "algorithm design", "stable matching"]
categories: ["Paper Reviews", "Economics", "Computer Science"]
description: "A detailed review of the seminal 1962 paper by Gale and Shapley that introduced the stable matching problem and the deferred acceptance algorithm"
math: true
weight: 1
---

## Paper Information

**Title:** College Admissions and the Stability of Marriage  
**Authors:** D. Gale and L. S. Shapley  
**Published:** The American Mathematical Monthly, Vol. 69, No. 1 (January 1962), pp. 9-15  
**Institutions:** Brown University and RAND Corporation

---

## 1. Introduction and Motivation

### The Core Problem

Gale and Shapley begin with a practical scenario: college admissions. A college must decide which applicants to admit from a pool larger than its quota $q$. The traditional approach of simply admitting the top $q$ candidates faces several challenges:

1. **Uncertainty in acceptances**: Not all admitted students will accept
2. **Strategic behavior**: Students may misrepresent their preferences
3. **Information asymmetry**: Colleges don't know where else students have applied
4. **Coordination failures**: The result is often inefficient for both parties

### Real-World Complications

The authors identify specific pain points in existing admissions procedures:

- **Waiting lists** create strategic dilemmas for applicants
- Students face ethical quandaries about accepting one offer while waiting for another
- Colleges struggle to predict yield rates
- The system lacks transparency and certainty

The authors' bold claim: **these difficulties can be avoided** through a better assignment mechanism.

---

## 2. The Stability Concept

### Definition of Instability

The paper's key insight is the concept of a **stable matching**. An assignment is called **unstable** if:

> There exist two applicants $\alpha$ and $\beta$ assigned to colleges $A$ and $B$ respectively, where:
>
> - $\beta$ prefers college $A$ to college $B$, AND
> - College $A$ prefers applicant $\beta$ to applicant $\alpha$

**Why this matters:** In an unstable assignment, college $A$ and applicant $\beta$ could both improve by forming a new match, effectively "blocking" the original assignment. This creates an incentive for parties to deviate from the proposed matching.

### Philosophical Foundation

The authors make an important normative statement:

> "On the philosophy that the colleges exist for the students rather than the other way around, it would be fitting to assign students to their preferred choices."

This motivates their focus on **applicant-optimal** stable matchings.

---

## 3. The Marriage Problem: A Simplified Case

To build intuition, the authors first analyze a special case: **the stable marriage problem**.

### Problem Setup

- $n$ men and $n$ women
- Each person ranks all members of the opposite sex
- Goal: Find a complete matching with no blocking pairs

### Example 1: Multiple Stable Matchings

Consider the ranking matrix with 3 men $(\alpha, \beta, \gamma)$ and 3 women $(A, B, C)$:

|     | A   | B   | C   |
| --- | --- | --- | --- |
| α   | 1,3 | 2,2 | 3,1 |
| β   | 3,1 | 1,3 | 2,2 |
| γ   | 2,2 | 3,1 | 1,3 |

The first number is the man's ranking of the woman; the second is the woman's ranking of the man.

**Three stable matchings exist:**

1. **Men-optimal**: $(\alpha \rightarrow A, \beta \rightarrow B, \gamma \rightarrow C)$ - each man gets his first choice, each woman gets her last choice
2. **Women-optimal**: $(\alpha \rightarrow C, \beta \rightarrow A, \gamma \rightarrow B)$ - each woman gets her first choice, each man gets his last choice
3. **Compromise**: $(\alpha \rightarrow B, \beta \rightarrow C, \gamma \rightarrow A)$ - everyone gets their second choice

**Key observation:** Even when women receive their worst outcomes, the matching remains stable because no blocking pairs exist.

### Example 2: Unique Stable Matching

With 4 men and 4 women:

|     | A       | B       | C       | D       |
| --- | ------- | ------- | ------- | ------- |
| α   | 1,3     | 2,3     | **3,2** | 4,3     |
| β   | 1,4     | 4,1     | 3,3     | **2,2** |
| γ   | **2,2** | 1,4     | 3,4     | 4,1     |
| δ   | 4,1     | **2,2** | 3,1     | 1,4     |

The unique stable matching (circled) assigns: $(\alpha \rightarrow C, \beta \rightarrow D, \gamma \rightarrow A, \delta \rightarrow B)$.

**Notable:** No one receives their first choice! This demonstrates that stability can require compromise from all parties.

## 4. The Deferred Acceptance Algorithm

### **Theorem 1** (Existence)

> **There always exists a stable set of marriages.**

### Proof by Construction

The proof introduces the **deferred acceptance algorithm** with men proposing:

**Algorithm (Men-Proposing Version):**

```
Stage 1:
  - Each man proposes to his first choice
  - Each woman tentatively accepts her favorite proposer
  - She rejects all others but does NOT finalize the match

Stage k (k ≥ 2):
  - Each rejected man proposes to his next choice
  - Each woman compares new proposers to her current tentative match
  - She tentatively accepts the best option so far
  - She rejects all others

Termination:
  - When every woman has received at least one proposal
  - All tentative matches become final
```

**Maximum iterations:** $n^2 - 2n + 2$ stages (worst case).

### Proof of Stability

Suppose the algorithm produces matching $M$ and suppose for contradiction that $M$ is unstable. Then there exist man $m$ and woman $w$ not matched to each other where:

- $m$ prefers $w$ to his current partner
- $w$ prefers $m$ to her current partner

But if $m$ prefers $w$, he must have proposed to $w$ at some stage (before proposing to his current partner). Since $m$ is not matched to $w$ in $M$, woman $w$ must have rejected $m$ in favor of someone she preferred more. By the algorithm's structure, $w$ only ever "upgrades" her tentative match, so her final partner must be at least as good as the man who displaced $m$.

Therefore $w$ cannot prefer $m$ to her final partner - **contradiction!**

### Extension to College Admissions

**Modified Algorithm:**

```
Stage 1:
  - All students apply to their first-choice college
  - Each college with quota q places the top q applicants on its waiting list
  - Rejects the rest

Stage k (k ≥ 2):
  - Rejected students apply to their next choice
  - Each college selects the top q from {new applicants + current waiting list}
  - Updates waiting list, rejects the rest

Termination:
  - When every student is either on a waiting list or has been rejected by all acceptable colleges
  - All waiting lists convert to final admissions
```

---

## 5. Optimality Results

### **Theorem 2** (Applicant-Optimality)

> **Every applicant is at least as well off under the deferred acceptance procedure as under any other stable assignment.**

This is the paper's most profound result: the algorithm doesn't just find _a_ stable matching—it finds the _best possible_ stable matching for the proposing side.

### Proof Sketch

**Key concept:** Call a college "possible" for a student if there exists some stable matching assigning that student to that college.

**Proof by induction on stages:**

_Base case:_ Initially, no student has been rejected from any possible college.

_Inductive step:_ Suppose at stage $k$, college $A$ (with quota $q$) rejects student $\alpha$ after receiving applications from $q$ better-qualified students $\beta_1, \ldots, \beta_q$.

We must show $A$ is impossible for $\alpha$.

Consider a hypothetical stable matching $M'$ that assigns $\alpha$ to $A$. Since $A$ has quota $q$ and $\alpha$ is assigned there, at least one student $\beta_i$ must be assigned elsewhere in $M'$.

By the algorithm's structure:

- Each $\beta_i$ prefers $A$ to all colleges except those that previously rejected them
- By inductive hypothesis, colleges that rejected $\beta_i$ are impossible for $\beta_i$
- Therefore $\beta_i$ prefers $A$ to their assignment in $M'$

But $A$ prefers $\beta_i$ to $\alpha$ (by assumption). Thus $(\beta_i, A)$ form a blocking pair for $M'$.

**Conclusion:** $M'$ is unstable, so $A$ is impossible for $\alpha$. The algorithm only rejects students from impossible colleges.

### Uniqueness of the Optimal Matching

**Corollary:** The applicant-optimal stable matching is unique.

**Proof:** Suppose two different matchings $M_1$ and $M_2$ are both applicant-optimal. Then some student $s$ must prefer one to the other (by the no-ties assumption). Say $s$ prefers $M_1$ to $M_2$. Then $s$ is better off under $M_1$ than under $M_2$, contradicting the assumption that $M_2$ is applicant-optimal. □

### The College-Optimal Side

The authors note that the algorithm can be **inverted**:

- Colleges make "offers" to their top-choice students
- Students tentatively accept their favorite offer
- This produces the **college-optimal** stable matching

**Key insight:** The applicant-optimal and college-optimal matchings coincide only when the stable matching is unique.

---

## 6. Mathematical Elegance and Pedagogical Value

The authors conclude with a meta-observation about mathematics itself:

### What is Mathematics?

> "The answer, it appears, is that any argument which is carried out with sufficient precision is mathematical..."

**Their claim:** Theorem 1's proof exemplifies pure mathematical reasoning despite:

- Using no mathematical symbols
- Requiring no calculus
- Being expressible in plain English
- Dealing with everyday concepts (marriage, preferences)

**The difficulty** for non-mathematicians lies not in specialized knowledge but in:

- Following extended logical chains
- Maintaining precise mental state through multiple inferences
- Tracking hypothetical scenarios and their implications

This serves as an excellent counterexample to the stereotype that "mathematics = formulas and calculations."

---

## 7. Critical Analysis

### Strengths

**1. Theoretical Contributions**

- Introduces fundamental concepts: stability, blocking pairs, optimality
- Proves constructive existence (algorithm itself is the proof)

**2. Algorithmic Innovation**

- Polynomial-time algorithm: $O(n^2)$ proposals in worst case
- Simple to implement and explain
- Truthful for proposing side (strategy-proof)

**3. Generality**

- Framework applies to many two-sided matching markets
- Quotas handled naturally
- Extends beyond initial marriage motivation

### Limitations and Open Questions

**1. Assumptions**

- Requires complete preference rankings (no incomplete lists initially)
- Assumes strict preferences (no indifference)
- Bipartite structure necessary
- Assumes preferences are known and fixed

**2. Fairness Concerns**

The algorithm's asymmetry raises equity questions:

- Proposing side gets optimal stable outcome
- Receiving side gets _worst_ stable outcome among all stable matchings
- In Example 1, women receive their last choices when men propose

---

## 9. Worked Example: Complete Algorithm Trace

Let's trace through the algorithm on the 4-person example requiring 10 iterations (mentioned in the paper):

**Preferences:**

|     | A   | B   | C   | D   |
| --- | --- | --- | --- | --- |
| α   | 1,3 | 2,2 | 3,1 | 4,3 |
| β   | 1,4 | 2,3 | 3,2 | 4,4 |
| γ   | 3,1 | 1,4 | 2,3 | 4,2 |
| δ   | 2,2 | 3,1 | 1,4 | 4,1 |

**Stage-by-stage execution:**

**Round 1:** All propose to first choice

- α → A, β → A, γ → B, δ → C
- A tentatively accepts α (prefers α to β)
- B tentatively accepts γ
- C tentatively accepts δ
- **Rejected:** β

**Round 2:** β proposes to second choice

- β → B
- B compares: γ vs β, prefers β (ranks him 3 vs γ ranked 4)
- B switches to β
- **Rejected:** γ

**Round 3:** γ proposes to second choice

- γ → C
- C compares: δ vs γ, prefers γ (ranks him 3 vs δ ranked 4)
- C switches to γ
- **Rejected:** δ

**Round 4:** δ proposes to second choice

- δ → B
- B compares: β vs δ, prefers δ (ranks him 1 vs β ranked 3)
- B switches to δ
- **Rejected:** β

This continues for several more rounds until convergence. The final stable matching is determined by the algorithm's termination.

**Final Matching Properties:**

- Stable (no blocking pairs)
- Optimal for men (each gets best possible college among all stable matchings)
- Worst for women (each gets worst possible man among all stable matchings)

---

## 10. Connection to Other Fields

### Game Theory

- Introduces **cooperative game theory** concepts to matching
- Core of the matching game corresponds to stable matchings
- Nash equilibrium connections in strategic preference revelation

### Computer Science

- **Algorithm design:** simple, elegant, efficient
- **Complexity theory:** polynomial-time solvable (unlike many optimization problems)
- **Distributed systems:** decentralized implementation possible

### Economics

- **Market design:** engineering markets that work well
- **Mechanism design:** incentive-compatible mechanisms
- **Auction theory:** connections to ascending auctions

---

## 11. Conclusion

### Summary of Contributions

1. **Problem formulation:** Introduced stability concept for matching markets
2. **Algorithmic solution:** Deferred acceptance algorithm
3. **Theoretical results:**
   - Existence of stable matchings (Theorem 1)
   - Optimality for proposing side (Theorem 2)
   - Uniqueness of optimal matching
4. **Practical relevance:** Framework applicable to real-world markets

### Historical Significance

This 7-page paper, written in accessible English with minimal mathematical notation, founded an entire field. Its ideas have:

- Generated thousands of research papers
- Enabled practical market design saving lives (kidney exchange)
- Improved outcomes for millions (school choice, residency matching)
- Earned a Nobel Prize 50 years later

### Why It Matters Today

In an age of online platforms and marketplace design, the principles from this 1962 paper remain foundational:

- Airbnb, Uber, and other platforms face two-sided matching problems
- Online dating uses matching algorithms
- Resource allocation in cloud computing
- Peer-to-peer networks

### Final Assessment

**Elegant simplicity meets profound depth.** The paper exemplifies the best of mathematical research:

- Motivated by practical problems
- Solves them with simple, implementable algorithms
- Provides deep theoretical insights
- Opens entire new research directions

**Rating: 10/10** - A timeless classic that deserves its place among the most influential papers in mathematics, economics, and computer science.

---

## References

**Original Paper:**
Gale, D., & Shapley, L. S. (1962). College Admissions and the Stability of Marriage. _The American Mathematical Monthly_, 69(1), 9-15.
