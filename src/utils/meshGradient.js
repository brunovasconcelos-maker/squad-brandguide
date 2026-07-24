import { hexToRgb } from "./contrast";

// Falls back to the app's own background when no colors are placed yet.
const EMPTY_FILL = hexToRgb("#1d1d1d");

// Renders a mesh gradient onto `ctx` (width x height) using Shepard's
// inverse-distance-weighting interpolation between the given color points.
// This is plain per-pixel Canvas math (no CSS gradients), so the same
// function produces pixel-identical output for both the live preview and
// the full-resolution PNG export.
export function renderMeshGradient(ctx, width, height, points) {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  if (points.length === 0) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = EMPTY_FILL.r;
      data[i + 1] = EMPTY_FILL.g;
      data[i + 2] = EMPTY_FILL.b;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return;
  }

  const pts = points.map((point) => {
    const { r, g, b } = hexToRgb(point.hex);
    return { x: point.x * width, y: point.y * height, r, g, b };
  });

  const POWER = 2;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      let exact = null;
      let sumWeight = 0;
      let r = 0;
      let g = 0;
      let b = 0;

      for (const pt of pts) {
        const dx = px - pt.x;
        const dy = py - pt.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 0.0001) {
          exact = pt;
          break;
        }
        const weight = 1 / Math.pow(distSq, POWER / 2);
        sumWeight += weight;
        r += weight * pt.r;
        g += weight * pt.g;
        b += weight * pt.b;
      }

      const idx = (py * width + px) * 4;
      if (exact) {
        data[idx] = exact.r;
        data[idx + 1] = exact.g;
        data[idx + 2] = exact.b;
      } else {
        data[idx] = r / sumWeight;
        data[idx + 1] = g / sumWeight;
        data[idx + 2] = b / sumWeight;
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// Renders a full-resolution PNG export at the exact requested dimensions,
// independent of whatever resolution the on-screen preview canvas used.
export function exportMeshGradientPng(width, height, points) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  renderMeshGradient(ctx, width, height, points);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to export gradient"));
    }, "image/png");
  });
}
