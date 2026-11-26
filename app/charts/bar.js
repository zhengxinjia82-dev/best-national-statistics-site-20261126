// SVG bar chart, drawn by hand: vertical bars (grouped or stacked) or
// horizontal bars, with value labels and hover tooltips.
import { esc, ticks, fmtAxis } from './util.js';

export function barChart(o) {
  const W = o.width || 560, H = o.height || 250;
  const horizontal = !!o.horizontal;
  const yFmt = o.yFmt || fmtAxis;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title || 'Bar chart')}" class="chart">`;
  if (!horizontal) {
    const hasLegend = o.series.length > 1;
    const padL = 52, padR = 10, padT = hasLegend ? 30 : 12, padB = 30;
    const totals = o.labels.map((_, i) => o.stacked
      ? o.series.reduce((a, ser) => a + (ser.values[i] || 0), 0)
      : Math.max(...o.series.map((ser) => ser.values[i] || 0)));
    const hi = Math.max(...totals, 1) * 1.08;
    const tk = ticks(0, hi, 4);
    const y = (v) => padT + ((tk[tk.length - 1] - v) * (H - padT - padB)) / tk[tk.length - 1];
    for (const t of tk) {
      s += `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" class="grid"/>`;
      s += `<text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" class="axis">${esc(yFmt(t))}</text>`;
    }
    const slot = (W - padL - padR) / o.labels.length;
    o.labels.forEach((lab, i) => {
      const cx = padL + slot * i + slot / 2;
      s += `<text x="${cx}" y="${H - 8}" text-anchor="middle" class="axis">${esc(lab)}</text>`;
      if (o.stacked) {
        let base = 0;
        for (const ser of o.series) {
          const v = ser.values[i] || 0;
          const tip = `${lab}: ${ser.label} ${o.pointFmt ? o.pointFmt(v) : yFmt(v)}`;
          s += `<rect x="${(cx - slot * 0.32).toFixed(1)}" y="${y(base + v).toFixed(1)}" width="${(slot * 0.64).toFixed(1)}" height="${Math.max(0, y(base) - y(base + v)).toFixed(1)}" fill="${ser.color}" data-tip="${esc(tip)}"><title>${esc(tip)}</title></rect>`;
          base += v;
        }
      } else {
        const n = o.series.length;
        const bw = Math.min(34, (slot * 0.78) / n);
        o.series.forEach((ser, j) => {
          const v = ser.values[i] || 0;
          const bx = cx - (n * bw) / 2 + j * bw;
          const hl = o.highlightIndex === i;
          const tip = `${lab}: ${ser.label} ${o.pointFmt ? o.pointFmt(v) : yFmt(v)}`;
          s += `<rect x="${bx.toFixed(1)}" y="${y(v).toFixed(1)}" width="${(bw - 1.5).toFixed(1)}" height="${Math.max(0, y(0) - y(v)).toFixed(1)}" fill="${ser.color}" ${hl ? 'stroke="#0b2545" stroke-width="2"' : ''} data-tip="${esc(tip)}"><title>${esc(tip)}</title></rect>`;
        });
      }
    });
  } else {
    const padL = 150, padR = 56, padT = 8, padB = 8;
    const vals = o.series[0].values;
    const hi = Math.max(...vals) * 1.05;
    const rowH = (H - padT - padB) / o.labels.length;
    o.labels.forEach((lab, i) => {
      const v = vals[i];
      const bw = ((W - padL - padR) * v) / hi;
      const cy = padT + rowH * i + rowH / 2;
      const tip = `${lab}: ${o.pointFmt ? o.pointFmt(v) : yFmt(v)}`;
      const hl = o.highlightIndex === i;
      s += `<text x="${padL - 8}" y="${cy + 4}" text-anchor="end" class="axis">${esc(lab)}</text>`;
      s += `<rect x="${padL}" y="${(cy - rowH * 0.32).toFixed(1)}" width="${bw.toFixed(1)}" height="${(rowH * 0.64).toFixed(1)}" fill="${o.series[0].color}" ${hl ? 'stroke="#0b2545" stroke-width="2"' : ''} data-tip="${esc(tip)}"><title>${esc(tip)}</title></rect>`;
      s += `<text x="${padL + bw + 6}" y="${cy + 4}" class="axis">${esc(o.pointFmt ? o.pointFmt(v) : yFmt(v))}</text>`;
    });
  }
  if (o.series.length > 1 && !horizontal) {
    let lx = 52;
    for (const ser of o.series) {
      s += `<g transform="translate(${lx},16)"><rect x="0" y="-11" width="10" height="10" fill="${ser.color}"/><text x="14" y="-2" class="legend">${esc(ser.label)}</text></g>`;
      lx += 14 + ser.label.length * 6.4 + 26;
    }
  }
  s += '</svg>';
  return s;
}
