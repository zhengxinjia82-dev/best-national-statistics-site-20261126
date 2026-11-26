// Population: 2024 age-sex pyramid, total 2015–2024, age-group stacked bars,
// births/deaths/fertility table and a sortable regional table.
import { POPULATION, PYRAMID_2024, REGIONS, YEARS } from '../data/population.js';
import { fmtInt, fmt1, fmt2, srcLine } from '../data/meta.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';
import { pyramidChart } from '../charts/pyramid.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b', GLACIER = '#48cae4';

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const pyr = pyramidChart({ bands: PYRAMID_2024, title: 'Population pyramid, Iceland, 2024' });
  const totalLine = lineChart({ years: YEARS, title: 'Total population, 2015–2024',
    series: [{ label: 'Population', color: TEAL, values: POPULATION.total }],
    yFmt: (v) => fmtInt(v), pointFmt: (v) => fmtInt(v) + ' people', highlightIndex: i });
  const ageBars = barChart({ years: YEARS, title: 'Age structure, % of population',
    labels: YEARS.map(String),
    series: [
      { label: 'Age 0–14', color: GLACIER, values: POPULATION.age014 },
      { label: 'Age 15–64', color: TEAL, values: POPULATION.age1564 },
      { label: 'Age 65+', color: AMBER, values: POPULATION.age65 },
    ], stacked: true, yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '%' });

  const rows = YEARS.map((yr, j) => `<tr${j === i ? ' class="hl"' : ''}><td>${yr}</td><td>${fmt1(POPULATION.birthRate[j])}</td><td>${fmt1(POPULATION.deathRate[j])}</td><td>${fmt2(POPULATION.fertility[j])}</td><td>${fmt1(POPULATION.age014[j])}%</td><td>${fmt1(POPULATION.age65[j])}%</td><td>${fmt1(POPULATION.urbanPct[j])}%</td></tr>`).join('');

  const regionRows = REGIONS.map((r) => `<tr><td>${r.name}</td><td data-v="${r.population}">${fmtInt(r.population)}</td><td data-v="${r.area}">${fmtInt(r.area)}</td><td data-v="${r.density}">${fmt1(r.density)}</td><td data-v="${r.share}">${fmt1(r.share)}%</td><td>${r.town}</td></tr>`).join('');

  const html = `
  <div class="page-head"><h1>Population</h1>
  <p>Iceland had <strong>${fmtInt(POPULATION.total[9])} people in 2024</strong> — up 16.8% since 2015, but growth slowed to +0.2% in 2024. The population is ageing: 17.8% are under 15 and 15.6% are 65 or older.</p></div>
  <div class="verdict">The 2024 pyramid bulges at <strong>30–34</strong> — the largest band, 32,895 people — and narrows fast above 70. Fertility fell to <strong>1.56 births per woman</strong> in 2024, below replacement.
  <span class="v-src">Source: World Bank, 2024.</span></div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Who lives here — age pyramid, 2024</h2><p class="panel-sub">Female left, male right. Bands sum to 386,508 — 2 more than the World Bank total, a rounding difference (see Methods).</p>
      ${pyr}<p class="src">${srcLine('World Bank, SP.POP.<band>.<FE|MA>', 2024)}</p></div>
    <div class="panel"><h2>Total population, 2015–2024</h2><p class="panel-sub">The selected year is highlighted. Growth peaked at +2.7% in 2018 and +2.5% in 2022.</p>
      ${totalLine}<p class="src">${srcLine('World Bank, SP.POP.TOTL', 2024)}</p></div>
  </div>
  <div class="panel"><h2>Age structure, 2015–2024</h2><p class="panel-sub">Share of the population in each age band. The 65+ share rose every single year, from 13.7% to 15.6%.</p>
    ${ageBars}<p class="src">${srcLine('World Bank, SP.POP.0014/1564/65UP.TO.ZS', 2024)}</p></div>
  <div class="panel"><h2>Births, deaths and fertility, 2015–2024</h2><p class="panel-sub">The selected year (${y}) is highlighted. Births per 1,000 people fell from 12.5 to 11.2; deaths held near 6.5.</p>
  <div class="table-wrap"><table class="data"><thead><tr><th>Year</th><th>Births /1,000</th><th>Deaths /1,000</th><th>Fertility</th><th>Age 0–14</th><th>Age 65+</th><th>Urban</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="src">${srcLine('World Bank, SP.DYN.CBRT/CDRT/TFRT.IN; SP.URB.TOTL.IN.ZS', 2024)}</p></div>
  <div class="panel"><h2>Where people live — regions, 1 January 2025</h2><p class="panel-sub">Click a column heading to sort. Two in three Icelanders live in the Capital Region; the Westfjords hold 1.8%.</p>
  <div class="table-wrap"><table class="data sortable"><thead><tr><th data-sort="text">Region</th><th data-sort="num">Population</th><th data-sort="num">Area km²</th><th data-sort="num">Density /km²</th><th data-sort="num">Share</th><th data-sort="text">Largest town</th></tr></thead><tbody>${regionRows}</tbody></table></div>
  <p class="footnote">Regional total 389,444 (Statistics Iceland, 1 Jan 2025) — a different reference date from the World Bank 2024 total 386,506. Full comparison on the <a href="#/regions">Regions page</a>.</p>
  <p class="src">${srcLine('Statistics Iceland, Population by regions', 2025)}</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI, ${y} · Statistics Iceland, 1 Jan 2025. Indicators: SP.POP.TOTL, SP.POP.GROW, SP.DYN.CBRT.IN, SP.DYN.CDRT.IN, SP.DYN.TFRT.IN.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Growth is slowing: +0.2% in 2024, the weakest year of the decade.</li>
    <li>Ageing is steady: the 65+ share rose in all ten years.</li>
    <li>94.2% of Icelanders live in urban areas — one of the highest shares in Europe.</li></ul></div>
  <div class="rail-card amber"><h3>Key numbers — ${y}</h3>
    <p>Population <strong>${fmtInt(POPULATION.total[i])}</strong><br>Growth <strong>${fmtSigned(POPULATION.growthPct[i])}%</strong><br>Fertility <strong>${fmt2(POPULATION.fertility[i])}</strong> births per woman</p></div>`;

  return { html, rail, headline: `${y} · Population <b>${fmtInt(POPULATION.total[i])}</b> · Growth <b>${fmtSigned(POPULATION.growthPct[i])}%</b> · Fertility <b>${fmt2(POPULATION.fertility[i])}</b>` };
};

function fmtSigned(n) { return (n > 0 ? '+' : '') + fmt1(n); }

export default { render };
