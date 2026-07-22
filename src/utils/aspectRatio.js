// Common ratios a real photo is likely to have been shot/exported at. Real
// image dimensions rarely reduce to a perfectly clean fraction on their own
// (e.g. 2752x1536 reduces to 43:24), so we snap to the closest standard ratio
// within a small tolerance before falling back to a plain GCD reduction.
const STANDARD_RATIOS = [
  [1, 1],
  [4, 5],
  [5, 4],
  [4, 3],
  [3, 4],
  [16, 9],
  [9, 16],
  [3, 2],
  [2, 3],
  [21, 9],
  [9, 21],
  [2, 1],
  [1, 2],
];

const SNAP_TOLERANCE = 0.02;

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export function computeAspectRatio(width, height) {
  if (!width || !height) return null;

  const decimal = width / height;
  let closest = null;
  let closestDiff = Infinity;

  for (const [w, h] of STANDARD_RATIOS) {
    const diff = Math.abs(decimal - w / h) / (w / h);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = [w, h];
    }
  }

  if (closest && closestDiff <= SNAP_TOLERANCE) {
    return `${closest[0]}:${closest[1]}`;
  }

  const w = Math.round(width);
  const h = Math.round(height);
  const divisor = gcd(w, h);
  return `${w / divisor}:${h / divisor}`;
}
