// Overview dashboard: 8 KPI cards for the selected year, GDP and population
// lines, a verdict strip and an at-a-glance table. The year selector in the
// top bar drives every value on this page.
import { POPULATION, YEARS } from '../data/population.js';
import { ECONOMY } from '../data/economy.js';
import { JOBS } from '../data/jobs.js';
import { PRICES } from '../data/prices.js';
import { HEALTH } from '../data/health.js';
import { ENVIRONMENT } from '../data/environment.js';
import { fmtInt, fmt1, fmt2, fmtSigned, srcLine } from '../data/meta.js';
import { lineChart } from '../charts/line.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b', GLACIER = '#48cae4';

function kpi(label, value, delta, src) {
  return `<div class="kpi"><div class="k-label">${label}</div><div class="k-value">${value}</div>
    <div class="k-delta">${delta}</div><div class="k-src">${src}</div></div>`;
}

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const prev = i > 0 ? i - 1 : i;
  const gdpLine = lineChart({ years: YEARS, title: 'GDP, current US$ billion, 2015–2024',
    series: [{ label: 'GDP, current US$', color: NAVY, values: ECONOMY.gdpCurrentBn }],
    yFmt: (v) => '$' + fmt1(v) + 'bn', pointFmt: (v) => '$' + fmt2(v) + 'bn', highlightIndex: i });
  const popLine = lineChart({ years: YEARS, title: 'Population, 2015–2024',
    series: [{ label: 'Population', color: TEAL, values: POPULATION.total }],
    yFmt: (v) => fmtInt(v), pointFmt: (v) => fmtInt(v) + ' people', highlightIndex: i });

  const html = `
  <div class="page-head"><h1>Iceland in Numbers</h1>
  <p>Ten years of Iceland, 2015–2024 — population, economy, jobs, prices, health, education, energy and regions. Every figure on this site carries its source and its year.</p></div>
  <div class="verdict">Iceland in ${y}: <strong>${fmtInt(POPULATION.total[i])} people</strong>, GDP <strong>$${fmt1(ECONOMY.gdpCurrentBn[i])}bn</strong>, unemployment <strong>${fmt1(JOBS.unemployment[i])}%</strong>, prices up <strong>${fmt1((PRICES.cpi[i] / PRICES.cpi[0] - 1) * 100)}%</strong> since 2015.
  <span class="v-src">Sources: World Bank, ${y}; Statistics Iceland, ${y}.</span></div>
  <div class="cards">
    ${kpi('Population', fmtInt(POPULATION.total[i]), `growth ${fmtSigned(POPULATION.growthPct[i])}% vs ${YEARS[prev]}`, srcLine('World Bank', y))}
    ${kpi('GDP', '$' + fmt1(ECONOMY.gdpCurrentBn[i]) + ' <span class="unit">bn</span>', `real growth ${fmtSigned(ECONOMY.gdpGrowthPct[i])}%`, srcLine('World Bank', y))}
    ${kpi('GDP per capita', '$' + fmtInt(ECONOMY.gdpPerCapita[i]), `PPP $${fmtInt(ECONOMY.gdpPerCapitaPpp[i])}`, srcLine('World Bank', y))}
    ${kpi('Unemployment', fmt1(JOBS.unemployment[i]) + ' <span class="unit">%</span>', `youth 15–24: ${fmt1(JOBS.unemploymentYouth[i])}%`, srcLine('World Bank, ILO', y))}
    ${kpi('Inflation', fmt1(PRICES.inflation[i]) + ' <span class="unit">%</span>', `CPI ${fmt1(PRICES.cpi[i])} (2010=100)`, srcLine('World Bank', y))}
    ${kpi('Life expectancy', fmt1(HEALTH.lifeExpectancy[i]) + ' <span class="unit">yrs</span>', `infant mortality ${fmt1(HEALTH.infantMortality[i])} /1,000`, srcLine('World Bank', y))}
    ${kpi('Renewable electricity', fmt2(ENVIRONMENT.renewableElectricityPct) + ' <span class="unit">%</span>', 'of generation, 2024', srcLine('Eurostat', 2024))}
    ${kpi('Internet users', fmt1(ENVIRONMENT.internetUsersPct) + ' <span class="unit">%</span>', 'of population, 2024', srcLine('World Bank', 2024))}
  </div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>GDP, 2015–${y}</h2><p class="panel-sub">Current US$ billion. The 2020 dip is the pandemic year (−6.6% real growth); 2022 bounced back +8.9%.</p>
      ${gdpLine}<p class="src">${srcLine('World Bank, NY.GDP.MKTP.CD', 2024)}</p></div>
    <div class="panel"><h2>Population, 2015–${y}</h2><p class="panel-sub">Total residents. Growth slowed to +0.2% in 2024 after +2.5% in 2022 — the fastest year of the decade.</p>
      ${popLine}<p class="src">${srcLine('World Bank, SP.POP.TOTL', 2024)}</p></div>
  </div>
  <div class="panel"><h2>At a glance — ${y}</h2><p class="panel-sub">The headline numbers for the year you picked, side by side.</p>
  <div class="table-wrap"><table class="data"><thead><tr><th>Indicator</th><th>${y}</th><th>2015</th><th>Change since 2015</th><th>Source</th></tr></thead><tbody>
    <tr><td>Population</td><td>${fmtInt(POPULATION.total[i])}</td><td>${fmtInt(POPULATION.total[0])}</td><td>+${fmt1((POPULATION.total[i] / POPULATION.total[0] - 1) * 100)}%</td><td>World Bank, ${y}</td></tr>
    <tr><td>GDP (current US$ bn)</td><td>$${fmt1(ECONOMY.gdpCurrentBn[i])}</td><td>$${fmt1(ECONOMY.gdpCurrentBn[0])}</td><td>+${fmt1((ECONOMY.gdpCurrentBn[i] / ECONOMY.gdpCurrentBn[0] - 1) * 100)}%</td><td>World Bank, ${y}</td></tr>
    <tr><td>GDP per capita (US$)</td><td>$${fmtInt(ECONOMY.gdpPerCapita[i])}</td><td>$${fmtInt(ECONOMY.gdpPerCapita[0])}</td><td>+${fmt1((ECONOMY.gdpPerCapita[i] / ECONOMY.gdpPerCapita[0] - 1) * 100)}%</td><td>World Bank, ${y}</td></tr>
    <tr><td>Unemployment (%)</td><td>${fmt1(JOBS.unemployment[i])}</td><td>${fmt1(JOBS.unemployment[0])}</td><td>${fmtSigned(JOBS.unemployment[i] - JOBS.unemployment[0])} pp</td><td>World Bank, ILO, ${y}</td></tr>
    <tr><td>Consumer prices (CPI, 2010=100)</td><td>${fmt1(PRICES.cpi[i])}</td><td>${fmt1(PRICES.cpi[0])}</td><td>+${fmt1((PRICES.cpi[i] / PRICES.cpi[0] - 1) * 100)}%</td><td>World Bank, ${y}</td></tr>
    <tr><td>Life expectancy (years)</td><td>${fmt1(HEALTH.lifeExpectancy[i])}</td><td>${fmt1(HEALTH.lifeExpectancy[0])}</td><td>${fmtSigned(HEALTH.lifeExpectancy[i] - HEALTH.lifeExpectancy[0])} yrs</td><td>World Bank, ${y}</td></tr>
  </tbody></table></div>
  <p class="src">Renewable electricity and internet users are 2024 values (Eurostat; World Bank, 2024).</p></div>
  <div class="section-links">
    <a href="#/population">Population →</a><a href="#/economy">Economy →</a><a href="#/jobs">Jobs →</a>
    <a href="#/prices">Prices →</a><a href="#/health">Health →</a><a href="#/education">Education →</a>
    <a href="#/environment">Environment →</a><a href="#/regions">Regions →</a><a href="#/methods">Methods &amp; sources →</a>
  </div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank, World Development Indicators, ${y} · Eurostat, 2024 · Statistics Iceland, ${y}. Full list on the <a href="#/methods">Methods page</a>.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Iceland grew fast, then cooled: real GDP +8.9% in 2022, −1.3% in 2024.</li>
    <li>Prices are the story of the decade: +46.6% from 2015 to 2024.</li>
    <li>Almost everyone is online (98.2%) and almost all electricity is renewable (99.98%).</li></ul></div>
  <div class="rail-card amber"><h3>Try it</h3>
    <p>Change the year in the top bar — every card and chart on this page follows it. Then try the <a href="#/prices">price calculator</a>: $100 in 2015 buys what $146.59 buys in 2024.</p></div>`;

  return { html, rail, headline: `${y} · Population <b>${fmtInt(POPULATION.total[i])}</b> · GDP <b>$${fmt1(ECONOMY.gdpCurrentBn[i])}bn</b> · Unemployment <b>${fmt1(JOBS.unemployment[i])}%</b>` };
};

export default { render };
