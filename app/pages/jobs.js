// Jobs: unemployment by group 2015–2024, labour force and derived
// employment. The year selector highlights the chart point and the table row.
import { JOBS, employed, YEARS } from '../data/jobs.js';
import { fmtInt, fmt1, srcLine } from '../data/meta.js';
import { lineChart } from '../charts/line.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b', GLACIER = '#48cae4';

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const uLine = lineChart({ years: YEARS, title: 'Unemployment rate, % of labour force',
    series: [
      { label: 'Total', color: NAVY, values: JOBS.unemployment },
      { label: 'Male', color: TEAL, values: JOBS.unemploymentMale },
      { label: 'Female', color: GLACIER, values: JOBS.unemploymentFemale },
      { label: 'Youth 15–24', color: AMBER, values: JOBS.unemploymentYouth, dashed: true },
    ], yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '%', highlightIndex: i });

  const rows = YEARS.map((yr, j) => {
    const emp = employed(j);
    return `<tr${j === i ? ' class="hl"' : ''}><td>${yr}</td><td>${fmt1(JOBS.unemployment[j])}%</td><td>${fmt1(JOBS.unemploymentMale[j])}%</td><td>${fmt1(JOBS.unemploymentFemale[j])}%</td><td>${fmt1(JOBS.unemploymentYouth[j])}%</td><td>${fmtInt(JOBS.labourForce[j])}</td><td>${fmtInt(emp)}</td></tr>`;
  }).join('');

  const html = `
  <div class="page-head"><h1>Jobs</h1>
  <p>Unemployment in Iceland was <strong>${fmt1(JOBS.unemployment[9])}% in 2024</strong> — low by any standard, and back near its pre-pandemic level after spiking to 6.0% in 2021. Youth unemployment runs about twice the overall rate.</p></div>
  <div class="verdict">In ${y}: unemployment <strong>${fmt1(JOBS.unemployment[i])}%</strong> (men ${fmt1(JOBS.unemploymentMale[i])}%, women ${fmt1(JOBS.unemploymentFemale[i])}%), youth <strong>${fmt1(JOBS.unemploymentYouth[i])}%</strong>, labour force <strong>${fmtInt(JOBS.labourForce[i])}</strong>, about <strong>${fmtInt(employed(i))}</strong> people employed.
  <span class="v-src">Source: World Bank, ILO modelled estimates, ${y}.</span></div>
  <div class="panel"><h2>Unemployment, 2015–2024</h2><p class="panel-sub">Total, male, female and youth (15–24) rates. The pandemic spike of 2020–2021 is the decade's story; the recovery was fast.</p>
    ${uLine}<p class="src">${srcLine('World Bank, SL.UEM.TOTL.ZS / .MA / .FE / SL.UEM.1524.ZS', 2024)}</p></div>
  <div class="panel"><h2>Labour force and employment, 2015–2024</h2><p class="panel-sub">Employment is derived as labour force × (1 − unemployment rate). The selected year (${y}) is highlighted.</p>
  <div class="table-wrap"><table class="data"><thead><tr><th>Year</th><th>Unemployment</th><th>Male</th><th>Female</th><th>Youth 15–24</th><th>Labour force (15+)</th><th>Employed (derived)</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="src">${srcLine('World Bank, SL.TLF.TOTL.IN; SL.UEM.TOTL.ZS', 2024)}</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI, ILO modelled estimates, ${y}. Indicators: SL.UEM.TOTL.ZS, SL.UEM.TOTL.MA, SL.UEM.TOTL.FE, SL.UEM.1524.ZS, SL.TLF.TOTL.IN.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Jobs recovered fast: unemployment halved from 6.0% (2021) to 3.5% (2023).</li>
    <li>Women's unemployment has been below men's in most years since 2017.</li>
    <li>Youth unemployment (8.8% in 2024) is the weak spot — 2.4× the overall rate.</li></ul></div>
  <div class="rail-card amber"><h3>Key numbers — ${y}</h3>
    <p>Unemployment <strong>${fmt1(JOBS.unemployment[i])}%</strong><br>Labour force <strong>${fmtInt(JOBS.labourForce[i])}</strong><br>Employed <strong>${fmtInt(employed(i))}</strong></p></div>`;

  return { html, rail, headline: `${y} · Unemployment <b>${fmt1(JOBS.unemployment[i])}%</b> · Youth <b>${fmt1(JOBS.unemploymentYouth[i])}%</b> · Labour force <b>${fmtInt(JOBS.labourForce[i])}</b>` };
};

export default { render };
