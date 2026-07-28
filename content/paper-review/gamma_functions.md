# Leonhard Euler's Integral: A Historical Profile of the Gamma Function

## 1. The Interpolation Problem and the Birth of the Function

The Gamma function emerged in 1729 from correspondence between Leonhard Euler and Christian Goldbach regarding the problem of interpolation: finding a smooth curve to connect the discrete values of the factorial sequence ($1, 2, 6, 24, \dots$). While simple algebraic formulas existed for sequences like triangular numbers, factorials grew too rapidly and required "infinite processes".

---

## 2. Euler’s Infinite Product

Euler first tackled the problem by experimenting with infinite products of numbers.

**Equation (1):** Euler found that for any positive integer $n$, the following product yields $n!$:
$$\left[ \left(\frac{2}{1}\right)^n \frac{1}{n+1} \right] \left[ \left(\frac{3}{2}\right)^n \frac{2}{n+2} \right] \left[ \left(\frac{4}{3}\right)^n \frac{3}{n+3} \right] \dots = n!$$
This product is meaningful for all values of $n$ except negative integers.

**Equation (2):** Euler noticed that setting $n = \frac{1}{2}$ yielded the famous product for $\pi/2$ discovered by John Wallis:
$$\left(\frac{2 \cdot 2}{1 \cdot 3}\right) \left(\frac{4 \cdot 4}{3 \cdot 5}\right) \left(\frac{6 \cdot 6}{5 \cdot 7}\right) \left(\frac{8 \cdot 8}{7 \cdot 9}\right) \dots = \frac{\pi}{2}$$
This connection to $\pi$ suggested to Euler that the function could be represented as an integral, which was the standard way to express "quadratures" (areas related to circles).

**Equation (3):** Today, Euler's infinite product is written more conventionally as a limit:
$$\lim_{m \to \infty} \frac{m! (m+1)^n}{(n+1)(n+2) \dots (n+m)}$$
This serves as the foundational limit definition for the function.

---

## 3. Deriving the Euler Integral

Euler then turned to integral calculus, specifically the integral $\int_{0}^{1} x^e (1-x)^n \, dx$.

**Equation (4):** Euler found that if $n$ is an integer and $e$ is arbitrary, the integral evaluates to:
$$\int_{0}^{1} x^e (1-x)^n \, dx = \frac{1 \cdot 2 \dots n}{(e+1)(e+2) \dots (e+n+1)}$$

**Equation (5):** To isolate the $n!$ term in the numerator, he substituted $f/g$ for $e$:
$$\int_{0}^{1} x^{f/g} (1-x)^n \, dx = \frac{g^{n+1}}{f \cdot (f+g) \cdot (f+2g) \dots (f+ng)} \cdot 1 \cdot 2 \dots n$$

**Equation (6):** He rearranged Eq. (5) to put the factorial term on the left:
$$\frac{1 \cdot 2 \dots n}{(f+g)(f+2g) \dots (f+ng)} = \frac{f+(n+1)g}{g^{n+1}} \int_{0}^{1} x^{f/g} (1-x)^n \, dx$$

**Equation (7):** Euler realized that setting $f=1$ and $g=0$ would isolate $n!$, but it produced an indeterminate expression involving division by zero:
$$\frac{1}{0^{n+1}} \int_{0}^{1} x^{1/0} (1-x)^n \, dx$$

**Equation (8):** To resolve this, he substituted $x^{g/(f+g)}$ for $x$, which changed the differential $dx$ to:
$$\frac{f+g}{g} x^{-f/(f+g)} \, dx$$

**Equation (9):** The right-hand member of Eq. (6) then transformed into:
$$\frac{f+(n+1)g}{g^{n+1}} \int \frac{f+g}{g} \, dx \left(1 - x^{g/(f+g)}\right)^n$$

**Equation (10):** A trial setting of $f=1, g=0$ reduced this integral to:
$$\frac{f+(n+1)g}{(f+g)^{n+1}} \int_{0}^{1} \left(\frac{1 - x^{g/(f+g)}}{g/(f+g)}\right)^n \, dx$$

**Equation (11):** This still initially appeared as an indeterminate "vanishing" form:
$$\int_{0}^{1} \frac{(1 - x^0)^n}{0^n} \, dx$$

**Equation (12):** Euler applied L'Hospital's rule to evaluate the term $(1 - x^z)/z$ as $z$ approaches zero:
$$\frac{d}{dz} (1 - x^z) = -x^z \log x$$

**Equation (13):** Setting $z=0$ produced:
$$\frac{1 - x^0}{0} = -\log x$$

**Equation (14):** Extending this to the $n$-th power:
$$\frac{(1 - x^0)^n}{0^n} = (-\log x)^n$$

**Equation (15):** This led to Euler’s final analytical expression for $n!$:
$$n! = \int_{0}^{1} (-\log x)^n \, dx$$
This provided a formula for factorials where non-integers could be substituted for $n$.

---

## 4. Modern Notation and Properties

**Equation (16):** Adrien-Marie Legendre introduced the modern notation $\Gamma(x)$ and defined the "second Eulerian integral":
$$\Gamma(x) = \int_{0}^{\infty} e^{-t} t^{x-1} \, dt$$

**Equation (17):** He defined the Beta function (the "first Eulerian integral"):
$$B(m,n) = \int_{0}^{1} x^{m-1} (1-x)^{n-1} \, dx$$

**Equation (18):** This establishes the link between Gamma and factorials:
$$\Gamma(n+1) = n!$$
for any positive integer $n$.

**Equation (19):** The fundamental recurrence relation:
$$x\Gamma(x) = \Gamma(x+1)$$
This property is crucial for reducing the factorial of any real number to a value between 0 and 1.

**Equation (20):** The relationship between the Beta and Gamma functions:
$$B(m,n) = \frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)}$$

**Equation (21):** Stirling’s formula, which provides a simple approximation for large $x$:
$$\Gamma(x) \sim e^{-x} x^{x-1/2} \sqrt{2\pi}$$

---

## 5. Extension to Fractional and Negative Values

The recurrence relation allows the calculation of factorials for complex and negative numbers.

**Equation (22):** Example of calculating $(5\frac{1}{2})!$:
$$\left(5\frac{1}{2}\right)! = \left(\frac{11}{2}\right)\left(\frac{9}{2}\right)\left(\frac{7}{2}\right)\left(\frac{5}{2}\right)\left(\frac{3}{2}\right)\left(\frac{1}{2}\right)!$$

**Equation (23):** Calculation for a negative value $(-5\frac{1}{2})!$ by reducing "upwards" to known positive values:
$$\left(-5\frac{1}{2}\right)! = \left(\frac{2}{1}\right)\left(-\frac{2}{1}\right)\left(-\frac{2}{3}\right)\left(-\frac{2}{5}\right)\left(-\frac{2}{7}\right)\left(-\frac{2}{9}\right)\left(\frac{1}{2}\right)!$$

---

## 6. Complex Analysis and Remarkable Identities

In the 19th century, the function moved into the complex plane ($x+iy$), where it was identified as meromorphic—meaning it has isolated peaks (poles) at zero and negative integers.

**Equation (24):** Euler’s reflection formula:
$$\Gamma(z)\Gamma(1-z) = \frac{\pi}{\sin \pi z}$$

**Equation (25):** Legendre’s duplication formula:
$$\Gamma(2z) = (2\pi)^{-1/2} 2^{2z-1/2} \Gamma(z)\Gamma\left(z+\frac{1}{2}\right)$$

**Equation (26):** Gauss’s multiplication formula, which generalizes the duplication formula.

**Equation (27):** An infinite series for the second derivative of $\log\Gamma(z)$:
$$\frac{d^2}{dz^2} \log\Gamma(z) = \frac{1}{z^2} + \frac{1}{(z+1)^2} + \frac{1}{(z+2)^2} + \dots$$

**Equation (28):** The identity relating the Gamma function to the Riemann zeta function:
$$\zeta(z) = \zeta(1-z) \Gamma(1-z) 2^z \pi^{z-1} \sin \frac{1}{2}\pi z$$

**Equation (29):** The definition of the zeta function:
$$\zeta(z) = 1 + \frac{1}{2^z} + \frac{1}{3^z} + \dots$$

**Equation (30):** F. W. Newman’s (Weierstrass) formula for the reciprocal of the Gamma function:
$$\frac{1}{\Gamma(z)} = z e^{\gamma z} \prod_{k=1}^{\infty} \left\{ \left(1 + \frac{z}{k}\right) e^{-z/k} \right\}$$
where $\gamma$ is the Euler-Mascheroni constant.

**Equation (31):** The related infinite product factorization of the sine function:
$$\sin \pi z = \pi z (1 - z^2)\left(1 - \frac{z^2}{4}\right)\left(1 - \frac{z^2}{9}\right)\dots$$

---

## 7. Stirling and Digamma Series

**Equation (32):** The Stirling series for $\log\Gamma(1+z)$, which is useful for fitting polynomials to factorial values.

**Equation (33):** The series for the digamma (or psi) function $\psi(z) = \frac{d}{dz}\log\Gamma(z)$:
$$\psi(z) = -\gamma + (z-1) - \frac{(z-1)(z-2)}{2 \cdot 2!} + \dots$$

---

## 8. Uniqueness and the Bohr-Mollerup Theorem

The paper notes that many functions could connect the factorial dots, so Euler’s is not the only solution.

**Equation (34):** Hadamard’s factorial function, which, unlike Euler’s, has no singularities (poles) in the finite complex plane.

**Equation (35):** A piecewise "pseudogamma" function $\Gamma_s(x)$ that satisfies the recurrence relation but is not smooth:
$$\Gamma_s(x) = 1 \text{ for } 1 \le x \le 2; \quad \Gamma_s(x) = x-1 \text{ for } 2 \le x \le 3, \dots$$
The Bohr-Mollerup theorem finally established that Euler's function is the unique solution because it is logarithmically convex for $x>0$.

---

## 9. The Euler-Mascheroni Constant

The paper concludes with mysteries surrounding the constant $\gamma$.

**Equation (36):** Expresses $\gamma$ in terms of the derivative of the Gamma function:
$$\gamma = -\left.\frac{d\Gamma(x)}{dx}\right|_{x=1}$$

**Equation (37):** The standard limit definition for $\gamma$ ($\approx 0.57721$):
$$\gamma = \lim_{n \to \infty} \left(1 + \frac{1}{2} + \frac{1}{3} + \dots + \frac{1}{n}\right) - \log n$$
Davis notes that while $\gamma$ is known to hundreds of decimal places, mathematicians still do not know if it is a rational or irrational number.
