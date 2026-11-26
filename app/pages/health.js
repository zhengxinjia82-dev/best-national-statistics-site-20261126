// Health: life expectancy, infant mortality and health spending, 2015–2024.
import { HEALTH, YEARS } from '../data/health.js';
import { fmt1, fmt2, srcLine } from '../data/meta.js';
import { lineChart } from '../charts/line.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b';

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const leLine = lineChart({ years: YEARS, title: 'Life expectancy at birth, years',
    series: [{ label: 'Life expectancy', color: TEAL, values: HEALTH.lifeExpectancy }],
    yFmt: (v) => fmt1(v), pointFmt: (v) => fmt2(v) + ' years', highlightIndex: i });
  const imLine = lineChart({ years: YEARS, title: 'Infant mortality, per 1,000 live births',
    series: [{ label: 'Infant mortality', color: NAVY, values: HEALTH.infantMortality }],
    yFmt: (v) => fmt1(v), pointFmt: (v) => fmt1(v) + ' per 1,000', highlightIndex: i });
  const spendLine = lineChart({ years: YEARS, title: 'Health expenditure, % of GDP',
    series: [{ label: 'Health spending', color: AMBER, values: HEALTH.healthSpendingPct }],
    yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt2(v) + '% of GDP', highlightIndex: i });

  const rows = YEARS.map((yr, j) => `<tr${j === i ? ' class="hl"' : ''}><td>${yr}</td><td>${fmt2(HEALTH.lifeExpectancy[j])}</td><td>${fmt1(HEALTH.infantMortality[j])}</td><td>${fmt2(HEALTH.healthSpendingPct[j])}%</td></tr>`).join('');

  const html = `
  <div class="page-head"><h1>Health</h1>
  <p>Icelanders live <strong>${fmt1(HEALTH.lifeExpectancy[9])} years on average (2024)</strong> — among the longest lives in the world. Infant mortality is 2.1 per 1,000 live births, and health spending is 9.0% of GDP.</p></div>
  <div class="verdict">In ${y}: life expectancy <strong>${fmt2(HEALTH.lifeExpectancy[i])} years</strong>, infant mortality <strong>${fmt1(HEALTH.infantMortality[i])} per 1,000</strong>, health spending <strong>${fmt2(HEALTH.healthSpendingPct[i])}% of GDP</strong>.
  <span class="v-src">Source: World Bank, ${y}.</span></div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Life expectancy, 2015–2024</h2><p class="panel-sub">Years at birth. Dipped to 82.1 in 2022 — the pandemic years show in the line — then recovered to 82.8.</p>
      ${leLine}<p class="src">${srcLine('World Bank, SP.DYN.LE00.IN', 2024)}</p></div>
    <div class="panel"><h2>Infant mortality, 2015–2024</h2><p class="panel-sub">Deaths per 1,000 live births. Flat at 2.0–2.2 all decade — among the lowest rates anywhere.</p>
      ${imLine}<p class="src">${srcLine('World Bank, SP.DYN.IMRT.IN', 2024)}</p></div>
  </div>
  <div class="panel"><h2>Health spending, 2015–2024</h2><p class="panel-sub">Current health expenditure as % of GDP. Jumped to 9.7% in the pandemic year 2021 and settled near 9.0%.</p>
    ${spendLine}<p class="src">${srcLine('World Bank, SH.XPD.CHEX.GD.ZS', 2024)}</p></div>
  <div class="panel"><h2>Health, 2015–2024</h2><p class="panel-sub">The selected year (${y}) is highlighted.</p>
  <div class="table-wrap"><table class="data"><thead><tr><th>Year</th><th>Life expectancy (years)</th><th>Infant mortality /1,000</th><th>Health spending (% GDP)</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="src">${srcLine('World Bank, SP.DYN.LE00.IN; SP.DYN.IMRT.IN; SH.XPD.CHEX.GD.ZS', 2024)}</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI, ${y}. Indicators: SP.DYN.LE00.IN, SP.DYN.IMRT.IN, SH.XPD.CHEX.GD.ZS.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Life expectancy barely moved in a decade: 82.5 → 82.8 years.</li>
    <li>Infant mortality is flat and tiny — 2.1 per 1,000 in 2024.</li>
    <li>Health spending rose with the pandemic and stayed high: 8.1% (2015) → 9.0% (2024).</li></ul></div>
  <div class="rail-card amber"><h3>Key numbers — ${y}</h3>
    <p>Life expectancy <strong>${fmt2(HEALTH.lifeExpectancy[i])} yrs</strong><br>Infant mortality <strong>${fmt1(HEALTH.infantMortality[i])} /1,000</strong><br>Health spending <strong>${fmt2(HEALTH.healthSpendingPct[i])}% of GDP</strong></p></div>`;

  return { html, rail, headline: `${y} · Life expectancy <b>${fmt2(HEALTH.lifeExpectancy[i])} years</b> · Infant mortality <b>${fmt1(HEALTH.infantMortality[i])} /1,000</b>` };
};

export default { render };
