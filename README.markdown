# CIEDE2000 color difference formula in TypeScript

This page presents the CIEDE2000 color difference, implemented in the TypeScript programming language.

![Logo for CIEDE2000 in TypeScript](https://raw.githubusercontent.com/michel-leonard/ciede2000-color-matching/refs/heads/main/docs/assets/images/logo.jpg)

## Our CIEDE2000 offer

This production-ready file, released in 2026, contain the CIEDE2000 algorithm.

Source File|Type|Bits|Purpose|Advantage|
|:--:|:--:|:--:|:--:|:--:|
[ciede2000.ts](./ciede2000.ts)|`number`|64|General|Interoperability|

### Software Versions

- tsc 5.9.3
- Node.js 20.20
- npm 10.8.2

### Example Usage

We calculate the CIEDE2000 distance between two colors, first without and then with parametric factors.

```javascript
// Example of two L*a*b* colors
const l1 = 88.3, a1 = 126.1, b1 = -1.7
const l2 = 89.3, a2 = 109.1, b2 = 4.6

let delta_e = ciede2000(l1, a1, b1, l2, a2, b2)
console.log("CIEDE2000 = ", delta_e) // ΔE2000 = 3.393723108445056

// Example of parametric factors used in the textile industry
const kl = 2.0, kc = 1.0, kh = 1.0

// Perform a CIEDE2000 calculation compliant with that of Gaurav Sharma
const canonical = true

delta_e = ciede2000(l1, a1, b1, l2, a2, b2, kl, kc, kh, canonical)
console.log("CIEDE2000 = ", delta_e) // ΔE2000 = 3.349051046055125
```

These CIEDE2000 calculations in TypeScript are fast, typically allowing millions of color comparisons per second.

## Public Domain Licence

You are free to use these files, even for commercial purposes.
