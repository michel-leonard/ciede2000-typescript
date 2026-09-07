Browse : [R](https://github.com/michel-leonard/ciede2000-r) · [Ruby](https://github.com/michel-leonard/ciede2000-ruby) · [Rust](https://github.com/michel-leonard/ciede2000-rust) · [SQL](https://github.com/michel-leonard/ciede2000-sql) · [Swift](https://github.com/michel-leonard/ciede2000-swift) · **TypeScript** · [VBA](https://github.com/michel-leonard/ciede2000-vba) · [Wolfram Language](https://github.com/michel-leonard/ciede2000-wolfram-language) · [AWK](https://github.com/michel-leonard/ciede2000-awk) · [BC](https://github.com/michel-leonard/ciede2000-basic-calculator) · [C#](https://github.com/michel-leonard/ciede2000-csharp)

# CIEDE2000 color difference formula in TypeScript

This page presents the CIEDE2000 color difference, implemented in the TypeScript programming language.

![Logo for CIEDE2000 in TypeScript](https://raw.githubusercontent.com/michel-leonard/ciede2000-color-matching/refs/heads/main/docs/assets/images/logo.jpg)

## About

Here you’ll find the first rigorously correct implementation of CIEDE2000 that doesn’t use any conversion between degrees and radians. Set parameter `canonical` to obtain results in line with your existing pipeline.

`canonical`|The algorithm operates...|
|:--:|-|
`false`|in accordance with the CIEDE2000 values currently used by many industry players|
`true`|in accordance with the CIEDE2000 values provided by [this](https://hajim.rochester.edu/ece/sites/gsharma/ciede2000/) academic MATLAB function|

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

### Test Results

LEONARD’s tests are based on well-chosen L\*a\*b\* colors, with various parametric factors `kL`, `kC` and `kH`.

```
CIEDE2000 Verification Summary :
          Compliance : [ ] CANONICAL [X] SIMPLIFIED
  First Checked Line : 40.0,0.5,-128.0,49.91,0.0,24.0,1.0,1.0,1.0,51.01866090771252
           Precision : 12 decimal digits
           Successes : 100000000
               Error : 0
            Duration : 1007.84 seconds
     Average Delta E : 67.13
   Average Deviation : 5.7e-15
   Maximum Deviation : 3.1e-13
```

```
CIEDE2000 Verification Summary :
          Compliance : [X] CANONICAL [ ] SIMPLIFIED
  First Checked Line : 40.0,0.5,-128.0,49.91,0.0,24.0,1.0,1.0,1.0,51.018463019698125
           Precision : 12 decimal digits
           Successes : 100000000
               Error : 0
            Duration : 1004.93 seconds
     Average Delta E : 67.13
   Average Deviation : 6.1e-15
   Maximum Deviation : 3.1e-13
```

## Public Domain Licence

You are free to use these files, even for commercial purposes.
