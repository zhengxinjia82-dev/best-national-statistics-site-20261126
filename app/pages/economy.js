// Economy: GDP level and real growth, GDP per capita, sector shares, trade
// openness and tourism — five charts and a sortable origins table.
import { ECONOMY, TOURISM_ORIGINS_2024, TOURISM_SHARE_GDP, YEARS } from '../data/economy.js';
import { fmtInt, fmt1, fmt2, fmtSigned, srcLine } from '../data/meta.js';
import { lineChart } from '../charts/line.js';
import { barChart } from '../charts/bar.js';

const NAVY = '#0b2545', TEAL = '#2a9d8f', AMBER = '#e9a13b', GLACIER = '#48cae4';

const render = (state) => {
  const y = state.year, i = YEARS.indexOf(y);
  const gdpLine = lineChart({ years: YEARS, title: 'GDP, current and constant 2015 US$ billion',
    series: [
      { label: 'Current US$', color: NAVY, values: ECONOMY.gdpCurrentBn },
      { label: 'Constant 2015 US$', color: TEAL, values: ECONOMY.gdpConstantBn, dashed: true },
    ], yFmt: (v) => '$' + fmt1(v) + 'bn', pointFmt: (v) => '$' + fmt2(v) + 'bn', highlightIndex: i });
  const pcLine = lineChart({ years: YEARS, title: 'GDP per capita, US$ and PPP',
    series: [
      { label: 'US$', color: NAVY, values: ECONOMY.gdpPerCapita },
      { label: 'PPP', color: AMBER, values: ECONOMY.gdpPerCapitaPpp, dashed: true },
    ], yFmt: (v) => '$' + fmtInt(v), pointFmt: (v) => '$' + fmtInt(v), highlightIndex: i });
  const sectorBars = barChart({ title: 'Sector shares of GDP, %',
    labels: YEARS.map(String),
    series: [
      { label: 'Services', color: TEAL, values: ECONOMY.servicesPct },
      { label: 'Industry', color: NAVY, values: ECONOMY.industryPct },
      { label: 'Agriculture', color: AMBER, values: ECONOMY.agriculturePct },
    ], stacked: true, yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '%' });
  const tradeLine = lineChart({ years: YEARS, title: 'Exports and imports, % of GDP',
    series: [
      { label: 'Exports', color: TEAL, values: ECONOMY.exportsPct },
      { label: 'Imports', color: AMBER, values: ECONOMY.importsPct },
    ], yFmt: (v) => fmt1(v) + '%', pointFmt: (v) => fmt1(v) + '% of GDP', highlightIndex: i });
  const tourismBars = barChart({ title: 'Foreign visitors, Keflavík departures',
    labels: YEARS.map(String),
    series: [{ label: 'Visitors', color: GLACIER, values: ECONOMY.visitors }],
    yFmt: (v) => fmtInt(v), pointFmt: (v) => fmtInt(v) + ' visitors', highlightIndex: i });

  const originRows = TOURISM_ORIGINS_2024.map((o) => {
    const share = (o.visitors / ECONOMY.visitors[9]) * 100;
    return `<tr><td>${o.country}</td><td data-v="${o.visitors}">${fmtInt(o.visitors)}</td><td data-v="${share.toFixed(1)}">${fmt1(share)}%</td></tr>`;
  }).join('');

  const html = `
  <div class="page-head"><h1>Economy</h1>
  <p>Iceland's GDP reached <strong>$${fmt1(ECONOMY.gdpCurrentBn[9])}bn in 2024</strong> — $85,863 per person, one of the highest levels in the world. Real growth was −1.3% in 2024 after +5.0% in 2023: a small, open economy that swings with tourism and fish.</p></div>
  <div class="verdict">In ${y}: GDP <strong>$${fmt1(ECONOMY.gdpCurrentBn[i])}bn</strong>, real growth <strong>${fmtSigned(ECONOMY.gdpGrowthPct[i])}%</strong>, GDP per capita <strong>$${fmtInt(ECONOMY.gdpPerCapita[i])}</strong>. Services are ${fmt1(ECONOMY.servicesPct[i])}% of the economy.
  <span class="v-src">Source: World Bank, ${y}.</span></div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>GDP, 2015–2024</h2><p class="panel-sub">Current US$ vs constant 2015 US$ billion. The gap between the lines is price and exchange-rate movement.</p>
      ${gdpLine}<p class="src">${srcLine('World Bank, NY.GDP.MKTP.CD / NY.GDP.MKTP.KD', 2024)}</p></div>
    <div class="panel"><h2>GDP per capita, 2015–2024</h2><p class="panel-sub">US$ and purchasing-power parity. Per-capita output rose 60% in nominal terms over the decade.</p>
      ${pcLine}<p class="src">${srcLine('World Bank, NY.GDP.PCAP.CD / NY.GDP.PCAP.PP.CD', 2024)}</p></div>
  </div>
  <div class="panel"><h2>What Iceland makes — sector shares of GDP</h2><p class="panel-sub">Services dominate at 65.3% in 2024; industry 20.1% (aluminium smelting, fish processing); agriculture 3.5%. Shares sum to 88.9% — the rest is net taxes on products (see Methods).</p>
    ${sectorBars}<p class="src">${srcLine('World Bank, NV.AGR/IND/SRV.TOTL.ZS', 2024)}</p></div>
  <div class="grid-2-wrap">
    <div class="panel"><h2>Trade openness, 2015–2024</h2><p class="panel-sub">Exports and imports as % of GDP. Exports fell to 34.1% in the pandemic year 2020, then recovered.</p>
      ${tradeLine}<p class="src">${srcLine('World Bank, NE.EXP/IMP.GNFS.ZS', 2024)}</p></div>
    <div class="panel"><h2>Tourism, 2015–2024</h2><p class="panel-sub">Foreign visitors (Keflavík departures). Collapsed to 482,108 in 2020, back to a record 2,261,391 in 2024 — nearly six visitors per resident.</p>
      ${tourismBars}<p class="src">${srcLine('Statistics Iceland, foreign visitors', 2024)}</p></div>
  </div>
  <div class="panel"><h2>Where visitors come from, 2024</h2><p class="panel-sub">Click a column heading to sort. Tourism was ${TOURISM_SHARE_GDP.value}% of GDP in ${TOURISM_SHARE_GDP.year} (Statistics Iceland).</p>
  <div class="table-wrap"><table class="data sortable"><thead><tr><th data-sort="text">Country of origin</th><th data-sort="num">Visitors</th><th data-sort="num">Share of all visitors</th></tr></thead><tbody>${originRows}</tbody></table></div>
  <p class="src">${srcLine('Icelandic Tourist Board', 2024)}</p></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">World Bank WDI, ${y} · Statistics Iceland, ${y} · Icelandic Tourist Board, 2024. Indicators: NY.GDP.MKTP.CD, NY.GDP.MKTP.KD.ZG, NY.GDP.PCAP.CD, NV.*.TOTL.ZS, NE.EXP/IMP.GNFS.ZS.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>2024 was a down year in real terms (−1.3%), but nominal GDP still hit a record $33.2bn.</li>
    <li>Tourism is back above its pre-pandemic peak — and bigger than ever.</li>
    <li>Trade is ~43% of GDP on each side: Iceland lives by selling fish, aluminium and experiences.</li></ul></div>
  <div class="rail-card amber"><h3>Key numbers — ${y}</h3>
    <p>GDP <strong>$${fmt1(ECONOMY.gdpCurrentBn[i])}bn</strong><br>Real growth <strong>${fmtSigned(ECONOMY.gdpGrowthPct[i])}%</strong><br>Visitors <strong>${fmtInt(ECONOMY.visitors[i])}</strong></p></div>`;

  return { html, rail, headline: `${y} · GDP <b>$${fmt1(ECONOMY.gdpCurrentBn[i])}bn</b> · Growth <b>${fmtSigned(ECONOMY.gdpGrowthPct[i])}%</b> · GDP per capita <b>$${fmtInt(ECONOMY.gdpPerCapita[i])}</b>` };
};

export default { render };
