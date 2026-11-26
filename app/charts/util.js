// Shared helpers for the hand-drawn SVG charts: number formatting, axis ticks
// and HTML escaping. No libraries, no network — every chart is inline SVG.
export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Nice round axis ticks covering [min, max].
export function ticks(min, max, count = 4) {
  if (max === min) max = min + 1;
  const span = max - min;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const out = [];
  for (let v = lo; v <= hi + step * 0.001; v += step) out.push(Math.round(v * 1000) / 1000);
  return out;
}

export function fmtAxis(v) {
  if (Math.abs(v) >= 1000000) return (v / 1000000).toFixed(v % 1000000 ? 1 : 0) + 'm';
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k';
  if (Math.abs(v) >= 100) return String(Math.round(v));
  return String(Math.round(v * 10) / 10);
}
