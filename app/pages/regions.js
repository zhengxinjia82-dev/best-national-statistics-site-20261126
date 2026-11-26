// Regions: population bar chart, a sortable comparison table and a region
// selector with a detail card. Data: Statistics Iceland, 1 January 2025.
import { REGIONS, REGIONS_TOTAL } from '../data/population.js';
import { fmtInt, fmt1, srcLine } from '../data/meta.js';
import { barChart } from '../charts/bar.js';

const TEAL = '#2a9d8f';

const render = () => {
  const sorted = [...REGIONS].sort((a, b) => b.population - a.population);
  const bars = barChart({ title: 'Population by region, 1 January 2025', height: 300,
    labels: sorted.map((r) => r.name.replace(' Region', '')),
    series: [{ label: 'Population', color: TEAL, values: sorted.map((r) => r.population) }],
    horizontal: true, yFmt: (v) => fmtInt(v), pointFmt: (v) => fmtInt(v) + ' people', highlightIndex: 0 });

  const rows = REGIONS.map((r) => `<tr data-region="${r.name}"><td>${r.name}</td><td data-v="${r.population}">${fmtInt(r.population)}</td><td data-v="${r.area}">${fmtInt(r.area)}</td><td data-v="${r.density}">${fmt1(r.density)}</td><td data-v="${r.share}">${fmt1(r.share)}%</td><td>${r.town}</td></tr>`).join('');
  const options = REGIONS.map((r) => `<option value="${r.name}">${r.name}</option>`).join('');

  const html = `
  <div class="page-head"><h1>Regions</h1>
  <p>Iceland's <strong>389,444 people (1 January 2025)</strong> live in 8 regions and 62 municipalities. The Capital Region holds 64.0% of the country on 1.0% of its land; the other seven regions share the rest across 101,656 km².</p></div>
  <div class="verdict">The Capital Region has <strong>249,054 people</strong> at <strong>238.1 per km²</strong>. The Northwestern Region has 7,355 people at <strong>0.6 per km²</strong> — a 400-fold density gap inside one country.
  <span class="v-src">Source: Statistics Iceland, 1 January 2025.</span></div>
  <div class="panel"><h2>Population by region, 1 January 2025</h2><p class="panel-sub">Horizontal bars, largest first. The Capital Region bar is nearly eight times the next region.</p>
    ${bars}<p class="src">${srcLine('Statistics Iceland, Population by regions', 2025)}</p></div>
  <div class="panel"><h2>Compare the regions</h2><p class="panel-sub">Click a column heading to sort. Pick a region below for its detail card.</p>
  <div class="table-wrap"><table class="data sortable" id="region-table"><thead><tr><th data-sort="text">Region</th><th data-sort="num">Population</th><th data-sort="num">Area km²</th><th data-sort="num">Density /km²</th><th data-sort="num">Share</th><th data-sort="text">Largest town</th></tr></thead><tbody>${rows}</tbody><tfoot><tr class="total"><td>Iceland</td><td>${fmtInt(REGIONS_TOTAL.population)}</td><td>${fmtInt(REGIONS_TOTAL.area)}</td><td>${fmt1(REGIONS_TOTAL.density)}</td><td>${fmt1(REGIONS_TOTAL.share)}%</td><td>${REGIONS_TOTAL.town}</td></tr></tfoot></table></div>
  <p class="footnote">Regions sum exactly to 389,444. This table is 1 January 2025; the national 2024 total elsewhere on this site is the World Bank mid-year figure 386,506 — different reference dates, see Methods.</p>
  <p class="src">${srcLine('Statistics Iceland, Population by regions', 2025)}</p></div>
  <div class="panel"><h2>Region detail</h2><p class="panel-sub">Choose a region to see its numbers in one place.</p>
    <select id="region-select" aria-label="Choose a region">${options}</select>
    <div class="detail-card" id="region-detail" aria-live="polite"></div></div>`;

  const rail = `
  <div class="rail-card teal"><h3>Sources &amp; year</h3>
    <p class="src">Statistics Iceland, Population by regions, sex and age, 1 January 2025. Areas and densities computed from the same release.</p></div>
  <div class="rail-card"><h3>What this means</h3>
    <ul><li>Iceland is a city-state in practice: 64.0% in the Capital Region.</li>
    <li>Outside the capital, the biggest region (Northeastern, 32,026) is smaller than many towns.</li>
    <li>Density spans 238.1 down to 0.6 per km² — the emptiest inhabited land in Europe.</li></ul></div>
  <div class="rail-card amber"><h3>Try it</h3>
    <p>Sort the table by density, then pick the Westfjords in the selector — 7,176 people across 8,842 km².</p></div>`;

  return { html, rail, headline: `1 Jan 2025 · Iceland <b>${fmtInt(REGIONS_TOTAL.population)}</b> · Capital Region <b>64.0%</b> · Density <b>238.1</b> to <b>0.6</b> per km²` };
};

function detail(r) {
  const landShare = ((r.area / REGIONS_TOTAL.area) * 100).toFixed(1);
  return `<h3>${r.name}</h3>
  <p><strong>${fmtInt(r.population)}</strong> people — <strong>${fmt1(r.share)}%</strong> of Iceland — on <strong>${fmtInt(r.area)} km²</strong> (${landShare}% of the land).</p>
  <p>Density <strong>${fmt1(r.density)} people per km²</strong>. Largest town: <strong>${r.town}</strong>.</p>
  <p>${r.name === 'Capital Region' ? 'Home to Reykjavík and two in three Icelanders.' : r.density < 2 ? 'One of the emptiest inhabited regions in Europe.' : 'A regional centre anchors this part of the country.'}</p>`;
}

const mount = (view) => {
  const select = view.querySelector('#region-select');
  const card = view.querySelector('#region-detail');
  const table = view.querySelector('#region-table');
  const show = () => {
    const r = REGIONS.find((x) => x.name === select.value) || REGIONS[0];
    card.innerHTML = detail(r);
    table.querySelectorAll('tbody tr').forEach((tr) => tr.classList.toggle('hl', tr.dataset.region === r.name));
  };
  select.addEventListener('change', show);
  show();
};

export default { render, mount };
