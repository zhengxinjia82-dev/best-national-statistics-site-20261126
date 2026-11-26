// SVG donut chart, drawn by hand: arc segments, centre label and a legend
// with values. Used for the electricity-generation mix.
import { esc } from './util.js';

export function donutChart(o) {
  const size = o.size || 240;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  const total = o.segments.reduce((a, s) => a + s.value, 0);
  let s = `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(o.title || 'Donut chart')}" class="chart donut">`;
  let a0 = -Math.PI / 2;
  for (const seg of o.segments) {
    const frac = seg.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const tip = `${seg.label}: ${seg.pct !== undefined ? seg.pct + '%' : seg.value}`;
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${seg.color}" stroke="#fff" stroke-width="1.5" data-tip="${esc(tip)}"><title>${esc(tip)}</title></path>`;
    a0 = a1;
  }
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" class="donut-centre-big">${esc(o.centreBig || '')}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" class="donut-centre-small">${esc(o.centreSmall || '')}</text>`;
  s += '</svg><ul class="donut-legend">';
  for (const seg of o.segments) {
    s += `<li><span class="swatch" style="background:${seg.color}"></span>${esc(seg.label)} — <strong>${seg.pct !== undefined ? seg.pct + '%' : seg.value}</strong></li>`;
  }
  s += '</ul></div>';
  return s;
}
