// Environment and energy: renewable electricity donut (2024 generation),
// primary-energy mix (2020), energy use per capita and CO2 per capita lines.
import { ENVIRONMENT, YEARS } from '../data/environment.js';
import { fmtInt, fmt1, fmt2, srcLine } from '../data/meta.js';
import { donutChart } from '../charts/donut.js';
import { barChart } from '../charts/bar.js';
import { lineChart } from '../charts/line.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b', GLACIER = '#48cae4';

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const donut = donutChart({ title: 'Electricity generation by source, 2024',
    segments: [
      { label: 'Hydro', value: 13.46, pct: 70.7, color: GLACIER },
      { label: 'Geothermal and other renewables', value: 5.57, pct: 29.2, color: TEAL },
      { label: 'Wind', value: 0.01, pct: 0.1, color: AMBER },
      { label: 'Solar', value: 0.01, pct: 0.1, color: NAVY },
    ], centreBig: '19.1 TWh', centreSmall: 'generated, 2024' });
  const mixBars = barChart({ title: 'Primary energy supply by source, 2020, %',
    labels: ENVIRONMENT.primaryEnergy2020.map((s) => s.source),
    series: [{ label: 'Share', color: TEAL, values: ENVIRONMENT.primaryEnergy2020.map((s) => s.share) }],
    horizontal: true, yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '%' });
  const energyLine = lineChart({ years: YEARS, title: 'Energy use per capita, kg of oil equivalent',
    series: [{ label: 'Energy use', color: NAVY, values: ENVIRONMENT.energyUsePerCapita }],
    yFmt: (v) => fmtInt(v), pointFmt: (v) => fmtInt(v) + ' kg', highlightIndex: i });
  const co2Line = lineChart({ years: YEARS, title: 'CO2 emissions per capita, tonnes',
    series: [{ label: 'CO2 per capita', color: AMBER, values: ENVIRONMENT.co2PerCapita }],
    yFmt: (v) => fmt1(v), pointFmt: (v) => fmt2(v) + ' tonnes', highlightIndex: i });

  const genRows = ENVIRONMENT.generation2024.map((g) => `<tr><td>${g.source}</td><td>${fmt2(g.twh)}</td><td>${fmt1(g.share)}%</td></tr>`).join('');
  const mixRows = ENVIRONMENT.primaryEnergy2020.map((g) => `<tr><td>${g.source}</td><td>${fmt1(g.share)}%</td></tr>`).join('');

  const html = `
  <div class="page-head"><h1>Environment &amp; energy</h1>
  <p>Iceland runs on the earth itself: <strong>99.98% of electricity was renewable in 2024</strong> (Eurostat), and geothermal heats about 90% of homes. Yet each Icelander still uses 16,248 kg of oil equivalent a year — aluminium smelting is energy-hungry — and emits 8.5 tonnes of CO₂.</p></div>
  <div class="verdict">In ${y}: energy use <strong>${fmtInt(ENVIRONMENT.energyUsePerCapita[i])} kg</strong> per person, CO₂ <strong>${fmt2(ENVIRONMENT.co2PerCapita[i])} tonnes</strong> per person — down from 11.0 tonnes in 2015.
  <span class="v-src">Sources: Eurostat, 2024; World Bank, ${y}.</span></div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Electricity generation, 2024</h2><p class="panel-sub">19.1 TWh total. Hydro 70.7%, geothermal and other renewables 29.2%; wind and solar are rounding errors — so far.</p>
      ${donut}<p class="src">${srcLine('Ember / Our World in Data', 2024)}</p></div>
    <div class="panel"><h2>Primary energy, 2020</h2><p class="panel-sub">Where all energy (not just electricity) comes from. 90.0% renewable — geothermal alone is 70.4%; oil is the remaining 10.0%.</p>
      ${mixBars}<p class="src">${srcLine('Orkustofnun, primary energy supply', 2020)}</p></div>
  </div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Energy use per capita, 2015–2024</h2><p class="panel-sub">Kg of oil equivalent. High and flat — Iceland uses more energy per person than almost any country, mostly for industry.</p>
      ${energyLine}<p class="src">${srcLine('World Bank, EG.USE.PCAP.KG.OE', 2024)}</p></div>
    <div class="panel"><h2>CO₂ per capita, 2015–2024</h2><p class="panel-sub">Tonnes. Down 22% over the decade, from 11.0 to 8.5 tonnes — the clean grid is doing the work.</p>
      ${co2Line}<p class="src">${srcLine('World Bank, EN.GHG.CO2.PC.CE.AR5', 2024)}</p></div>
  </div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Electricity generation, 2024</h2>
    <div class="table-wrap"><table class="data"><thead><tr><th>Source</th><th>TWh</th><th>Share</th></tr></thead><tbody>${genRows}<tr class="total"><td>Total</td><td>19.1</td><td>100%</td></tr></tbody></table></div>
    <p class="src">${srcLine('Ember / Our World in Data', 2024)}</p></div>
    <div class="panel"><h2>Primary energy supply, 2020</h2>
    <div class="table-wrap"><table class="data"><thead><tr><th>Source</th><th>Share</th></tr></thead><tbody>${mixRows}<tr class="total"><td>Renewable total</td><td>90.0%</td></tr></tbody></table></div>
    <p class="src">${srcLine('Orkustofnun', 2020)}</p></div>
  </div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">Eurostat, 2024 · Ember, 2024 · Orkustofnun, 2020 · World Bank WDI, ${y}. Indicators: EG.ELC.RNEW.ZS, EG.USE.PCAP.KG.OE, EN.GHG.CO2.PC.CE.AR5.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>The grid is already clean: 99.98% renewable electricity.</li>
    <li>The hard part is heat and transport — oil is still 10.0% of primary energy.</li>
    <li>CO₂ per person fell every year from 2015 to 2020, then flattened near 8.5 tonnes.</li></ul></div>
  <div class="rail-card amber"><h3>Key numbers — ${y}</h3>
    <p>Renewable electricity <strong>99.98%</strong> (2024)<br>Energy use <strong>${fmtInt(ENVIRONMENT.energyUsePerCapita[i])} kg</strong> per person<br>CO₂ <strong>${fmt2(ENVIRONMENT.co2PerCapita[i])} t</strong> per person</p></div>`;

  return { html, rail, headline: `${y} · Renewable electricity <b>99.98%</b> · CO₂ <b>${fmt2(ENVIRONMENT.co2PerCapita[i])} t</b> per person · Geothermal heats <b>~90%</b> of homes` };
};

export default { render };
