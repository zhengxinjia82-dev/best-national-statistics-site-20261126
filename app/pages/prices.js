// Prices: CPI index and inflation 2015–2024, plus a working price
// calculator that converts any amount from any base year to 2024 prices
// using the CPI index series. The calculator computes on load (default
// $100 in 2015) so its result is visible immediately.
import { PRICES, inflate, YEARS } from '../data/prices.js';
import { fmt1, fmt2, srcLine } from '../data/meta.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';

const NAVY = '#0b2545', AMBER = '#e9a13b';

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const cpiLine = lineChart({ years: YEARS, title: 'Consumer price index, 2010=100',
    series: [{ label: 'CPI (2010=100)', color: NAVY, values: PRICES.cpi }],
    yFmt: (v) => fmt1(v), pointFmt: (v) => fmt2(v), highlightIndex: i });
  const infBars = barChart({ title: 'Annual inflation, %',
    labels: YEARS.map(String),
    series: [{ label: 'Inflation', color: AMBER, values: PRICES.inflation }],
    yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '%', highlightIndex: i });

  const rows = YEARS.map((yr, j) => `<tr${j === i ? ' class="hl"' : ''}><td>${yr}</td><td>${fmt2(PRICES.cpi[j])}</td><td>${fmt1(PRICES.inflation[j])}%</td><td>+$${fmt2(100 * PRICES.cpi[9] / PRICES.cpi[j])}</td></tr>`).join('');
  const yearOptions = YEARS.slice(0, 9).map((yr) => `<option value="${yr}"${yr === 2015 ? ' selected' : ''}>${yr}</option>`).join('');

  const html = `
  <div class="page-head"><h1>Prices</h1>
  <p>Prices in Iceland rose <strong>46.6% from 2015 to 2024</strong>. Inflation peaked at 8.7% in 2023 — the highest of the decade — and eased to 5.9% in 2024.</p></div>
  <div class="verdict">In ${y}: CPI <strong>${fmt2(PRICES.cpi[i])}</strong> (2010=100), inflation <strong>${fmt1(PRICES.inflation[i])}%</strong>. $100 in 2015 buys what <strong>$146.59</strong> buys in 2024.
  <span class="v-src">Source: World Bank, ${y}.</span></div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Consumer price index, 2015–2024</h2><p class="panel-sub">Index, 2010=100. The slope steepens after 2021 — the post-pandemic inflation wave.</p>
      ${cpiLine}<p class="src">${srcLine('World Bank, FP.CPI.TOTL', 2024)}</p></div>
    <div class="panel"><h2>Annual inflation, 2015–2024</h2><p class="panel-sub">Year-on-year % change. Below 2% until 2018, above 8% in 2022–2023.</p>
      ${infBars}<p class="src">${srcLine('World Bank, FP.CPI.TOTL.ZG', 2024)}</p></div>
  </div>
  <div class="panel"><h2>Price calculator — what is it worth in 2024?</h2>
    <p class="panel-sub">Enter an amount and a base year. The calculator uses the CPI index series above — no guessing, the same index the World Bank publishes.</p>
    <div class="calc">
      <label>Amount $<input id="calc-amount" type="number" min="0" step="0.01" value="100"></label>
      <label>From year <select id="calc-year">${yearOptions}</select></label>
      <button id="calc-go" type="button">Calculate</button>
    </div>
    <p class="calc-result" id="calc-result" aria-live="polite"></p>
    <p class="footnote">Formula: amount × CPI(2024) ÷ CPI(base year). CPI 2024 = 172.76; CPI 2015 = 117.85. Check: $100 in 2015 = $146.59 in 2024.</p></div>
  <div class="panel"><h2>CPI and inflation, 2015–2024</h2><p class="panel-sub">The last column shows what $100 from each year is worth in 2024 prices.</p>
  <div class="table-wrap"><table class="data"><thead><tr><th>Year</th><th>CPI (2010=100)</th><th>Inflation</th><th>$100 then = $… in 2024</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="src">${srcLine('World Bank, FP.CPI.TOTL / FP.CPI.TOTL.ZG', 2024)}</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI, ${y}. Indicators: FP.CPI.TOTL (index, 2010=100), FP.CPI.TOTL.ZG (inflation).</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Money lost nearly a third of its value in nine years: $100 (2015) = $146.59 (2024).</li>
    <li>The 2022–2023 spike (8.3%, 8.7%) was the worst inflation since the 2008 crisis years.</li>
    <li>Even in the calm years, inflation never fell below 1.6%.</li></ul></div>
  <div class="rail-card amber"><h3>Try it</h3>
    <p>Put in a 2015 price you remember — a coffee, a bus fare — and see what it costs in 2024 money.</p></div>`;

  return { html, rail, headline: `${y} · CPI <b>${fmt2(PRICES.cpi[i])}</b> · Inflation <b>${fmt1(PRICES.inflation[i])}%</b> · Prices <b>+46.6%</b> since 2015` };
};

function compute(view) {
  const amount = parseFloat(view.querySelector('#calc-amount').value);
  const baseYear = Number(view.querySelector('#calc-year').value);
  const out = view.querySelector('#calc-result');
  const result = inflate(amount, baseYear);
  if (result === null || Number.isNaN(result)) {
    out.innerHTML = 'Enter an amount above 0 and pick a base year.';
    return;
  }
  out.innerHTML = `<b>$${amount.toFixed(2)} in ${baseYear} = $${result.toFixed(2)} in 2024 prices.</b> That is +${fmt1((result / amount - 1) * 100)}% (CPI ${fmt2(PRICES.cpi[YEARS.indexOf(baseYear)])} → ${fmt2(PRICES.cpi[9])}).`;
}

const mount = (view) => {
  view.querySelector('#calc-go').addEventListener('click', () => compute(view));
  view.querySelector('#calc-amount').addEventListener('input', () => compute(view));
  view.querySelector('#calc-year').addEventListener('change', () => compute(view));
  compute(view);
};

export default { render, mount };
