// SVG population pyramid, drawn by hand: female bars to the left, male bars
// to the right, age bands down the centre, values on hover.
import { esc, fmtAxis } from './util.js';

export function pyramidChart(o) {
  const bands = o.bands;
  const W = o.width || 560;
  const rowH = 24, padT = 26, padB = 8;
  const H = padT + bands.length * rowH + padB;
  const mid = W / 2;
  const maxV = Math.max(...bands.flatMap((b) => [b.female, b.male]));
  const half = mid - 56;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title || 'Population pyramid, 2024')}" class="chart">`;
  s += `<text x="${mid - half / 2}" y="16" text-anchor="middle" class="pyr-head">Female</text>`;
  s += `<text x="${mid + half / 2}" y="16" text-anchor="middle" class="pyr-head">Male</text>`;
  bands.forEach((b, i) => {
    const y = padT + i * rowH;
    const fw = (b.female / maxV) * half;
    const mw = (b.male / maxV) * half;
    const tipF = `${b.band} — female ${fmtAxis(b.female)}`;
    const tipM = `${b.band} — male ${fmtAxis(b.male)}`;
    s += `<rect x="${(mid - fw).toFixed(1)}" y="${y + 2}" width="${fw.toFixed(1)}" height="${rowH - 4}" fill="#2a9d8f" data-tip="${esc(tipF)}"><title>${esc(tipF)}</title></rect>`;
    s += `<rect x="${mid}" y="${y + 2}" width="${mw.toFixed(1)}" height="${rowH - 4}" fill="#0b2545" data-tip="${esc(tipM)}"><title>${esc(tipM)}</title></rect>`;
    s += `<text x="${mid}" y="${y + rowH / 2 + 4}" text-anchor="middle" class="axis">${esc(b.band)}</text>`;
  });
  s += '</svg>';
  return s;
}
