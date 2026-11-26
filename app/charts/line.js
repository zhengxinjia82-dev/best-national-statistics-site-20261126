// SVG line chart, drawn by hand: axes, gridlines, one polyline per series,
// a dot per point with a hover tooltip (native <title> plus data-tip for the
// site-wide tooltip box), and an optional highlighted year.
import { esc, ticks, fmtAxis } from './util.js';

export function lineChart(o) {
  const W = o.width || 560, H = o.height || 250;
  const hasLegend = o.series.length > 1;
  const padL = 52, padR = 14, padT = hasLegend ? 30 : 12, padB = 30;
  const years = o.years;
  const all = o.series.flatMap((s) => s.values);
  let lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo) * 0.12 || 1;
  lo -= pad; hi += pad;
  const tk = ticks(lo, hi, 4);
  lo = Math.min(lo, tk[0]); hi = Math.max(hi, tk[tk.length - 1]);
  const x = (i) => padL + (i * (W - padL - padR)) / (years.length - 1);
  const y = (v) => padT + ((hi - v) * (H - padT - padB)) / (hi - lo);
  const yFmt = o.yFmt || fmtAxis;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title || 'Line chart')}" class="chart">`;
  for (const t of tk) {
    s += `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" class="grid"/>`;
    s += `<text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" class="axis">${esc(yFmt(t))}</text>`;
  }
  years.forEach((yr, i) => {
    s += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="axis">${yr}</text>`;
  });
  for (const ser of o.series) {
    const pts = ser.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    s += `<polyline points="${pts}" fill="none" stroke="${ser.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"${ser.dashed ? ' stroke-dasharray="6 4"' : ''}/>`;
    ser.values.forEach((v, i) => {
      const hl = o.highlightIndex === i;
      const tip = `${years[i]}: ${o.pointFmt ? o.pointFmt(v) : yFmt(v)}${ser.label ? ' — ' + ser.label : ''}`;
      s += `<circle cx="${x(i)}" cy="${y(v)}" r="${hl ? 6 : 3.5}" fill="${ser.color}" stroke="#fff" stroke-width="1.5" data-tip="${esc(tip)}"><title>${esc(tip)}</title></circle>`;
    });
  }
  if (o.series.length > 1) {
    let lx = padL;
    for (const ser of o.series) {
      s += `<g transform="translate(${lx},16)"><rect x="0" y="-11" width="10" height="10" fill="${ser.color}"/><text x="14" y="-2" class="legend">${esc(ser.label)}</text></g>`;
      lx += 14 + ser.label.length * 6.4 + 26;
    }
  }
  s += '</svg>';
  return s;
}
