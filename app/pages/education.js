// Education: enrolment by level (gross, 2015–2023), net enrolment 2015–2017
// and government spending on education % of GDP (2015–2022).
import { EDUCATION, YEARS } from '../data/education.js';
import { fmt1, fmt2, srcLine } from '../data/meta.js';
import { barChart } from '../charts/bar.js';
import { lineChart } from '../charts/line.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b';

const render = (state) => {
  const y = state.year;
  const idx = YEARS.indexOf(Math.min(y, 2023));
  const enrolBars = barChart({ title: 'Gross enrolment ratio by level, %',
    labels: YEARS.map(String),
    series: [
      { label: 'Primary', color: TEAL, values: EDUCATION.primaryGross },
      { label: 'Secondary', color: NAVY, values: EDUCATION.secondaryGross },
      { label: 'Tertiary', color: AMBER, values: EDUCATION.tertiaryGross },
    ], yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '%' });
  const spendLine = lineChart({ years: EDUCATION.spendingYears, title: 'Education spending, % of GDP',
    series: [{ label: 'Spending', color: TEAL, values: EDUCATION.spendingPct }],
    yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt2(v) + '% of GDP' });

  const rows = YEARS.map((yr, j) => `<tr${j === idx ? ' class="hl"' : ''}><td>${yr}</td><td>${fmt1(EDUCATION.primaryGross[j])}%</td><td>${fmt1(EDUCATION.secondaryGross[j])}%</td><td>${fmt1(EDUCATION.tertiaryGross[j])}%</td><td>${j < EDUCATION.spendingPct.length ? fmt2(EDUCATION.spendingPct[j]) + '%' : '—'}</td></tr>`).join('');

  const html = `
  <div class="page-head"><h1>Education</h1>
  <p>Nearly every Icelandic child is in school: primary gross enrolment was <strong>98.2% in 2023</strong>. Secondary enrolment exceeds 100% — it counts over-age and adult students too (see Methods). Government spending on education was 7.3% of GDP in 2022.</p></div>
  <div class="verdict">In ${YEARS[idx]}: primary enrolment <strong>${fmt1(EDUCATION.primaryGross[idx])}%</strong>, secondary <strong>${fmt1(EDUCATION.secondaryGross[idx])}%</strong>, tertiary <strong>${fmt1(EDUCATION.tertiaryGross[idx])}%</strong>. Net enrolment (2017): primary 99.8%, secondary 91.3%.
  <span class="v-src">Source: World Bank, ${YEARS[idx]}.</span></div>
  <div class="panel"><h2>Enrolment by level, 2015–2023</h2><p class="panel-sub">Gross enrolment ratios, %. Secondary stays above 100% because adults and over-age students are counted; tertiary jumped to 86.5% in 2021, then fell back to 76.5% in 2023.</p>
    ${enrolBars}<p class="src">${srcLine('World Bank, SE.PRM/SE.SEC/SE.TER.ENRR', 2023)}</p></div>
  <div class="panel"><h2>Education spending, 2015–2022</h2><p class="panel-sub">Government expenditure on education as % of GDP. Peaked at 8.6% in the pandemic year 2020, then fell to 7.3% in 2022.</p>
    ${spendLine}<p class="src">${srcLine('World Bank, SE.XPD.TOTL.GD.ZS', 2022)}</p></div>
  <div class="panel"><h2>Enrolment and spending, 2015–2023</h2><p class="panel-sub">Gross enrolment ratios by level; spending is % of GDP. The selected year is highlighted where data exists (enrolment ends 2023, spending ends 2022).</p>
  <div class="table-wrap"><table class="data"><thead><tr><th>Year</th><th>Primary gross</th><th>Secondary gross</th><th>Tertiary gross</th><th>Spending (% GDP)</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="footnote">Net enrolment (2015–2017 only): primary 98.6%, 99.5%, 99.8%; secondary 89.7%, 90.0%, 91.3%. Gross ratios can exceed 100% — see Methods.</p>
  <p class="src">${srcLine('World Bank, SE.PRM/SE.SEC/SE.TER.ENRR; SE.PRM/SE.SEC.NENR; SE.XPD.TOTL.GD.ZS', 2023)}</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI. Enrolment to 2023, spending to 2022, net enrolment to 2017. Indicators: SE.PRM/SE.SEC/SE.TER.ENRR, SE.XPD.TOTL.GD.ZS.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Schooling is effectively universal at primary level (98–99% all decade).</li>
    <li>Tertiary enrolment is volatile: 69.3% (2018) → 86.5% (2021) → 76.5% (2023).</li>
    <li>Iceland spends more on education than most countries — 7.3–8.6% of GDP.</li></ul></div>
  <div class="rail-card amber"><h3>Key numbers — ${YEARS[idx]}</h3>
    <p>Primary <strong>${fmt1(EDUCATION.primaryGross[idx])}%</strong><br>Secondary <strong>${fmt1(EDUCATION.secondaryGross[idx])}%</strong><br>Tertiary <strong>${fmt1(EDUCATION.tertiaryGross[idx])}%</strong></p></div>`;

  return { html, rail, headline: `${YEARS[idx]} · Primary enrolment <b>${fmt1(EDUCATION.primaryGross[idx])}%</b> · Tertiary <b>${fmt1(EDUCATION.tertiaryGross[idx])}%</b> · Spending <b>${fmt2(EDUCATION.spendingPct[Math.min(idx, 7)])}% of GDP</b>` };
};

export default { render };
