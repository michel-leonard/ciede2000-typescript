// This function written in TypeScript is not affiliated with the CIE (International Commission on Illumination),
// and is released into the public domain. It is provided "as is" without any warranty, express or implied.

// The classic CIE ΔE2000 implementation, which operates on two L*a*b* colors, and returns their difference.
// "l" ranges from 0 to 100, while "a" and "b" are unbounded and commonly clamped to the range of -128 to 127.
function ciede2000(l1: number, a1: number, b1: number, l2: number, a2: number, b2: number, kl?: number, kc?: number, kh?: number, canonical?: boolean): number {
	// Working in TypeScript with the CIEDE2000 color-difference formula.
	// kl, kc, kh are parametric factors to be adjusted according to
	// different viewing parameters such as textures, backgrounds...
	let n = (Math.sqrt(a1 * a1 + b1 * b1) + Math.sqrt(a2 * a2 + b2 * b2)) * 0.5;
	n = n * n * n * n * n * n * n;
	// A factor involving chroma raised to the power of 7 designed to make
	// the influence of chroma on the total color difference more accurate.
	n = 1.0 + 0.5 * (1.0 - Math.sqrt(n / (n + 6103515625.0)));
	// Application of the chroma correction factor.
	const c1 = Math.sqrt(a1 * a1 * n * n + b1 * b1);
	const c2 = Math.sqrt(a2 * a2 * n * n + b2 * b2);
	// atan2 is preferred over atan because it accurately computes the angle of
	// a point (x, y) in all quadrants, handling the signs of both coordinates.
	let h1 = Math.atan2(b1, a1 * n), h2 = Math.atan2(b2, a2 * n);
	if (h1 < 0.0)
		h1 += 2.0 * Math.PI;
	if (h2 < 0.0)
		h2 += 2.0 * Math.PI;
	// When the hue angles lie in different quadrants, the straightforward
	// average can produce a mean that incorrectly suggests a hue angle in
	// the wrong quadrant, the next lines handle this issue.
	let h_mean = (h1 + h2) * 0.5, h_delta = (h2 - h1) * 0.5;
	// The part where most programmers get it wrong.
	if (Math.PI + 1E-14 < Math.abs(h2 - h1)) {
		h_delta += Math.PI;
		if (canonical && Math.PI + 1E-14 < h_mean)
			// Sharma’s implementation, OpenJDK, ...
			h_mean -= Math.PI;
		else
			// Lindbloom’s implementation, Netflix’s VMAF, ...
			h_mean += Math.PI;
	}
	const p = 36.0 * h_mean - 55.0 * Math.PI;
	n = (c1 + c2) * 0.5;
	n = n * n * n * n * n * n * n;
	// The hue rotation correction term is designed to account for the
	// non-linear behavior of hue differences in the blue region.
	const r_t = -2.0 * Math.sqrt(n / (n + 6103515625.0))
		* Math.sin(Math.PI / 3.0 * Math.exp(p * p / (-25.0 * Math.PI * Math.PI)));
	n = (l1 + l2) * 0.5;
	n = (n - 50.0) * (n - 50.0);
	// Lightness.
	const l = (l2 - l1) / ((kl || 1.0) * (1.0 + 0.015 * n / Math.sqrt(20.0 + n)));
	// These coefficients adjust the impact of different harmonic
	// components on the hue difference calculation.
	const t = 1.0	- 0.17 * Math.sin(h_mean + Math.PI / 3.0)
			+ 0.24 * Math.sin(2.0 * h_mean + Math.PI * 0.5)
			+ 0.32 * Math.sin(3.0 * h_mean + 8.0 * Math.PI / 15.0)
			- 0.20 * Math.sin(4.0 * h_mean + 3.0 * Math.PI / 20.0);
	n = c1 + c2;
	// Hue.
	const h = 2.0 * Math.sqrt(c1 * c2)
		* Math.sin(h_delta) / ((kh || 1.0) * (1.0 + 0.0075 * n * t));
	// Chroma.
	const c = (c2 - c1) / ((kc || 1.0) * (1.0 + 0.0225 * n));
	// The result reflects the actual geometric distance in color space, given a tolerance of 3.6e-13.
	return Math.sqrt(l * l + h * h + c * c + c * h * r_t);
}

// If you remove the constant 1E-14, the code will continue to work, but CIEDE2000
// interoperability between all programming languages will no longer be guaranteed.
