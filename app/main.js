// Boot + hash router for Iceland in Numbers. Renders the current route into
// #view and its reading notes into #rail, wires the year selector, the mobile
// menu, sortable tables and chart tooltips. All data is local ES modules;
// the site makes no network requests.
import { ROUTES, findRoute } from './router.js';
import { initTooltip } from './charts/tooltip.js';

const view = document.getElementById('view');
const rail = document.getElementById('rail');
const headline = document.getElementById('headline-stat');
const yearSelect = document.getElementById('year-select');
const navList = document.getElementById('nav-list');
const sidenav = document.getElementById('sidenav');
const menuBtn = document.getElementById('menu-btn');

export const state = { year: 2024 };

function buildNav() {
  navList.innerHTML = ROUTES.map((r) =>
    `<li><a href="#${r.path}" data-path="${r.path}">${r.label}<span class="nav-kicker">${r.kicker}</span></a></li>`
  ).join('');
}

function render() {
  const route = findRoute(location.hash);
  const out = route.page.render(state);
  view.innerHTML = out.html;
  rail.innerHTML = out.rail || '';
  headline.innerHTML = out.headline || '';
  document.title = route.label === 'Overview'
    ? 'Iceland in Numbers — population, GDP, jobs, prices, health, education, energy, 2015–2024'
    : `Iceland in Numbers — ${route.label} · 2015–2024`;
  navList.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.dataset.path === route.path);
  });
  if (route.page.mount) route.page.mount(view, state);
  sidenav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

yearSelect.addEventListener('change', () => {
  state.year = Number(yearSelect.value);
  render();
});

menuBtn.addEventListener('click', () => {
  const open = sidenav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

// Sortable tables: click a heading to sort its column (numeric where the
// cells carry data-v, otherwise text). Click again to reverse.
view.addEventListener('click', (e) => {
  const th = e.target.closest('th[data-sort]');
  if (!th) return;
  const table = th.closest('table');
  const tbody = table.querySelector('tbody');
  const idx = Array.from(th.parentNode.children).indexOf(th);
  const dir = th.classList.contains('asc') ? -1 : 1;
  table.querySelectorAll('th[data-sort]').forEach((h) => h.classList.remove('asc', 'desc'));
  th.classList.add(dir === 1 ? 'asc' : 'desc');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const val = (tr) => {
    const td = tr.children[idx];
    const v = td.dataset.v !== undefined ? td.dataset.v : td.textContent.trim();
    const n = parseFloat(String(v).replace(/,/g, ''));
    return Number.isNaN(n) ? String(v).toLowerCase() : n;
  };
  rows.sort((a, b) => {
    const va = val(a), vb = val(b);
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
  rows.forEach((r) => tbody.appendChild(r));
});

window.addEventListener('hashchange', render);

buildNav();
initTooltip();
render();
