// Methods and sources: every indicator the site uses, its WDI code and
// years covered, plus the consistency notes where the sources disagree by
// a little — and why. Iceland in Numbers is an independent publication;
// it is not Statistics Iceland (Hagstofa Íslands).
import { META } from '../data/meta.js';

const SOURCES = [
  { topic: 'Population, total', code: 'SP.POP.TOTL', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Population growth', code: 'SP.POP.GROW', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Age structure 0–14 / 15–64 / 65+', code: 'SP.POP.0014/1564/65UP.TO.ZS', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Urban population', code: 'SP.URB.TOTL.IN.ZS', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Births / deaths per 1,000', code: 'SP.DYN.CBRT.IN / SP.DYN.CDRT.IN', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Fertility rate', code: 'SP.DYN.TFRT.IN', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Age-sex pyramid bands', code: 'SP.POP.<band>.<FE|MA>', source: 'World Bank WDI', years: '2024' },
  { topic: 'GDP, current / constant 2015 US$', code: 'NY.GDP.MKTP.CD / NY.GDP.MKTP.KD', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Real GDP growth', code: 'NY.GDP.MKTP.KD.ZG', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'GDP per capita / PPP', code: 'NY.GDP.PCAP.CD / NY.GDP.PCAP.PP.CD', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Sector shares of GDP', code: 'NV.AGR/IND/SRV.TOTL.ZS', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Exports / imports, % GDP', code: 'NE.EXP/IMP.GNFS.ZS', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Unemployment, total / male / female', code: 'SL.UEM.TOTL.ZS / .MA / .FE', source: 'World Bank WDI (ILO estimates)', years: '2015–2024' },
  { topic: 'Youth unemployment 15–24', code: 'SL.UEM.1524.ZS', source: 'World Bank WDI (ILO estimates)', years: '2015–2024' },
  { topic: 'Labour force, age 15+', code: 'SL.TLF.TOTL.IN', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'CPI index / inflation', code: 'FP.CPI.TOTL / FP.CPI.TOTL.ZG', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Life expectancy', code: 'SP.DYN.LE00.IN', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Infant mortality', code: 'SP.DYN.IMRT.IN', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Health spending, % GDP', code: 'SH.XPD.CHEX.GD.ZS', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Enrolment, gross by level', code: 'SE.PRM/SE.SEC/SE.TER.ENRR', source: 'World Bank WDI', years: '2015–2023' },
  { topic: 'Enrolment, net', code: 'SE.PRM/SE.SEC.NENR', source: 'World Bank WDI', years: '2015–2017' },
  { topic: 'Education spending, % GDP', code: 'SE.XPD.TOTL.GD.ZS', source: 'World Bank WDI', years: '2015–2022' },
  { topic: 'Energy use per capita', code: 'EG.USE.PCAP.KG.OE', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'CO2 per capita', code: 'EN.GHG.CO2.PC.CE.AR5', source: 'World Bank WDI', years: '2015–2024' },
  { topic: 'Internet users', code: 'IT.NET.USER.ZS', source: 'World Bank WDI', years: '2024' },
  { topic: 'Renewable share of electricity', code: '—', source: 'Eurostat', years: '2024' },
  { topic: 'Electricity generation by source', code: '—', source: 'Ember / Our World in Data', years: '2024' },
  { topic: 'Primary energy supply', code: '—', source: 'Orkustofnun', years: '2020' },
  { topic: 'Foreign visitors', code: '—', source: 'Statistics Iceland (Keflavík departures)', years: '2015–2024' },
  { topic: 'Visitor origins', code: '—', source: 'Icelandic Tourist Board', years: '2024' },
  { topic: 'Tourism share of GDP', code: '—', source: 'Statistics Iceland', years: '2025' },
  { topic: 'Regions, population and area', code: '—', source: 'Statistics Iceland', years: '1 Jan 2025' },
];

const render = () => {
  const rows = SOURCES.map((s) => `<tr><td>${s.topic}</td><td>${s.code}</td><td>${s.source}</td><td>${s.years}</td></tr>`).join('');
  const html = `
  <div class="page-head"><h1>Methods &amp; sources</h1>
  <p>Every figure on this site comes from a public source, and every page names it with its year. Nothing here is invented, estimated by us, or copied from another statistics site. <strong>Iceland in Numbers is an independent publication. It is not Statistics Iceland (Hagstofa Íslands).</strong></p></div>
  <div class="panel"><h2>How the numbers were made</h2>
    <ul>
      <li><strong>Primary source:</strong> World Bank, World Development Indicators (WDI), Iceland (ISL), 2015–2024, fetched from the World Bank API in November 2026. Indicator codes are listed below so any figure can be checked.</li>
      <li><strong>Rounding:</strong> percentages to 1 decimal, populations as whole people, GDP in US$ billion to 1 decimal. The price calculator uses the full CPI index (172.7579 / 117.8474), not the rounded display values.</li>
      <li><strong>Derived figures:</strong> employment = labour force × (1 − unemployment rate); $100-then values = $100 × CPI(2024) ÷ CPI(base year). Both formulas are shown where they are used.</li>
      <li><strong>No network at run time:</strong> all data is baked into the site's own files. The site makes no requests to any server.</li>
    </ul></div>
  <div class="panel"><h2>Consistency notes — where the sources disagree a little</h2>
    <ol>
      <li><strong>Sector shares sum to 88.9% in 2024</strong> (agriculture 3.5 + industry 20.1 + services 65.3). The rest is net taxes on products, which World Bank value-added shares exclude. It is not missing data.</li>
      <li><strong>The pyramid bands sum to 386,508</strong> against the World Bank total of 386,506 — a 2-person rounding difference in the World Bank's published bands. We show the bands as published.</li>
      <li><strong>The regional table is 1 January 2025 (389,444)</strong>; the national 2024 total is the World Bank mid-year figure (386,506). Different reference dates — each table is labelled with its own.</li>
      <li><strong>Secondary gross enrolment exceeds 100%</strong> (108.9% in 2023) because it counts over-age and adult students, not only children of secondary-school age. Net enrolment, which does not, was 91.3% in 2017.</li>
      <li><strong>Cross-checks pass:</strong> constant-price GDP 23.12 → 22.82 bn = −1.28%, matching the −1.3% growth series; population growth 2024: 386,506 ÷ 385,663 − 1 = +0.22%.</li>
    </ol></div>
  <div class="panel"><h2>Every source on this site</h2><p class="panel-sub">Click a column heading to sort.</p>
  <div class="table-wrap"><table class="data sortable"><thead><tr><th data-sort="text">Topic</th><th data-sort="text">Indicator code</th><th data-sort="text">Source</th><th data-sort="text">Years</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="footnote">Sources in full: ${META.sources.map((s) => s.full).join('; ')}.</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI, 2015–2024 · Statistics Iceland, 2024–2025 · Eurostat, 2024 · Ember, 2024 · Orkustofnun, 2020 · Icelandic Tourist Board, 2024.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Check anything: every indicator code above re-fetches the same number from the World Bank.</li>
    <li>Where two sources disagree, the note above says so — we do not hide it.</li>
    <li>Figures are shown as published; only employment and the calculator's conversions are derived, and both formulas are printed.</li></ul></div>`;

  return { html, rail, headline: `Methods · <b>${SOURCES.length} indicators</b> · Every figure: <b>source + year</b>` };
};

export default { render };
