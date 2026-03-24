---
title: "Recounting the Rationals"
date: 2026-02-04
draft: false
math: true
description: "An exploration of enumerating rational numbers using hyperbinary representations"
tags: ["mathematics", "rational numbers", "number theory"]
---

## Authors

**Neil Calkin**  
Department of Mathematics, Clemson University

**Herbert S. Wilf**  
Department of Mathematics, University of Pennsylvania

---

## Let's Start From The Beginning

A **rational number** is any number that can be expressed as a fraction $p/q$ of two integers, where the numerator $p$ is an integer and the denominator $q$ is a non-zero integer.

We know we can enumerate natural numbers as:

$$
\mathbb{N} = \{1, 2, 3, 4, \ldots\}
$$

This leads us to several fundamental questions:

- Can we create a similar list for every rational number?
- Is it possible to list them in order (1st, 2nd, 3rd...) without missing a single fraction?
- Is there a specific formula or method to find the n-th rational number?

---

## Let's See What Hyperbinary Means

### Binary Representation

Binary representation is the method of representing numbers using **at most one** of each power of 2.

**Question:** How many ways can a number be represented in binary?

**Example: The number 10**

| Decimal | $2^3$ | $2^2$ | $2^1$ | $2^0$ | Binary |
|---------|-------|-------|-------|-------|--------|
| 10      | 1     | 0     | 1     | 0     | 1010   |

There is exactly **one** way to represent 10 in binary.

### Hyperbinary Representation

Hyperbinary representation is the method of representing numbers using **at most two** of each power of 2.

**Example: The number 5**

| Decimal | $2^2$ | $2^1$ | $2^0$ | Hyperbinary |
|---------|-------|-------|-------|-------------|
| 5       | 1     | 0     | 1     | 101         |
| 5       | 0     | 2     | 1     | 021         |

The number 5 has **two** hyperbinary representations.

**Example: The number 6**

$$
6 = 110, \quad 022, \quad 102
$$

| Decimal | $2^2$ | $2^1$ | $2^0$ | Hyperbinary |
|---------|-------|-------|-------|-------------|
| 6       | 1     | 1     | 0     | 110         |
| 6       | 0     | 2     | 2     | 022         |
| 6       | 1     | 0     | 2     | 102         |

The number 6 has **three** hyperbinary representations.

---

## The Formula

### The Main Result

The $n^{th}$ positive rational is given by:

$$
f(n) = \frac{b(n)}{b(n+1)}
$$

where $n \geq 0$ and $b(n)$ is the number of hyperbinary representations of the integer $n$.

### Positive Rational Sequence

This generates a sequence of all positive rational numbers in reduced form.

![Positive Rational Sequence](/cover/rec.png "Positive Rational Sequence")

### Features

- **Denominator-Numerator Connection:** The denominator of each fraction is the numerator of the next one.

- **Counting Function:** The function values $b(n)$ represent the number of hyperbinary representations of the integer $n$.

![Number of hyperbinary representations of the integer](/cover/recou.png "number of hyperbinary representations of the integer")

- **Always Reduced:** Consecutive values of this function $b$ are always relatively prime, so that each rational occurs in reduced form when it occurs.

- **Complete Enumeration:** Every positive rational occurs once and only once in this list.

---

## Tree of Fractions (Calkin-Wilf Tree)

### Tree Algorithm

The rationals can be organized in a binary tree structure:

1. **Root:** $1/1$ is at the top of the tree

2. **Children:** Each vertex $i/j$ has two children:
   - **Left child:** $i/(i+j)$
   - **Right child:** $(i+j)/j$

![Calkin-Wilf Tree](/cover/tree.png "The Calkin Wilf Tree")


### Properties

- The numerator and denominator at each vertex are relatively prime.
- Every reduced positive rational number occurs at some vertex.
- No reduced positive rational number occurs at more than one vertex.

Here is the implementation of [Calkin-Wilf](https://calkin-wilf-tree.vercel.app/) Tree.

---

## Theorem

**Main Theorem:** The n-th rational number, in reduced form, can be taken to be $b(n)/b(n+1)$, where $b(n)$ is the number of hyperbinary representations of the integer $n$, for $n = 0, 1, 2, \ldots$

That is:
- $b(n)$ and $b(n+1)$ are relatively prime, and
- Each positive reduced rational number occurs once and only once in the list:

$$
\frac{b(0)}{b(1)}, \frac{b(1)}{b(2)}, \frac{b(2)}{b(3)}, \ldots
$$

---

## Related Works

### Stern-Brocot Tree

The Stern-Brocot tree is a closely related construction that also enumerates all positive rational numbers exactly once in their reduced form. It provides an alternative perspective on the structure of the rationals.

---

## References

Neil Calkin & Herbert S. Wilf, [Recounting the Rationals (1999)](https://www2.math.upenn.edu/~wilf/website/recounting.pdf). 