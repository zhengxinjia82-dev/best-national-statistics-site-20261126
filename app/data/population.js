// Population of Iceland, 2015–2024. World Bank WDI (SP.POP.TOTL and age shares),
// plus the 2024 age-sex pyramid (SP.POP.<band>.<FE|MA>) and the regional table
// (Statistics Iceland, 1 January 2025). All figures carry source + year on the page.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const POPULATION = {
  total: [330815, 335439, 343400, 352721, 360563, 366463, 372520, 382003, 385663, 386506],
  growthPct: [1.04, 1.39, 2.35, 2.68, 2.20, 1.62, 1.64, 2.51, 0.95, 0.22],
  age014: [20.2, 19.9, 19.6, 19.2, 18.9, 18.7, 18.6, 18.4, 18.1, 17.8],
  age1564: [66.1, 66.2, 66.4, 66.7, 66.8, 66.7, 66.5, 66.5, 66.6, 66.6],
  age65: [13.7, 13.9, 14.0, 14.1, 14.3, 14.6, 14.9, 15.1, 15.3, 15.6],
  urbanPct: [93.7, 93.8, 93.8, 93.9, 94.0, 94.1, 94.2, 94.2, 94.2, 94.2],
  birthRate: [12.5, 12.0, 11.9, 12.0, 12.3, 12.3, 13.1, 11.5, 11.2, 11.2],
  deathRate: [6.6, 6.9, 6.5, 6.4, 6.3, 6.3, 6.3, 7.0, 6.7, 6.8],
  fertility: [1.80, 1.74, 1.71, 1.71, 1.74, 1.72, 1.82, 1.59, 1.55, 1.56],
};

// 2024 population pyramid, persons by 5-year band. Female total 188,596;
// male total 197,912; bands sum 386,508 — a 2-person rounding difference
// against the World Bank total 386,506 (see Methods page).
export const PYRAMID_2024 = [
  { band: '0–4', female: 11092, male: 11854 },
  { band: '5–9', female: 10607, male: 11316 },
  { band: '10–14', female: 11661, male: 12127 },
  { band: '15–19', female: 11960, male: 12587 },
  { band: '20–24', female: 12647, male: 12871 },
  { band: '25–29', female: 14373, male: 15238 },
  { band: '30–34', female: 15383, male: 17512 },
  { band: '35–39', female: 13160, male: 15228 },
  { band: '40–44', female: 12608, male: 14281 },
  { band: '45–49', female: 11523, male: 12444 },
  { band: '50–54', female: 11006, male: 11772 },
  { band: '55–59', female: 10797, male: 10899 },
  { band: '60–64', female: 10617, male: 10476 },
  { band: '65–69', female: 9539, male: 9553 },
  { band: '70–74', female: 7781, male: 7801 },
  { band: '75–79', female: 6027, male: 5786 },
  { band: '80+', female: 7815, male: 6167 },
];

// Regions, Statistics Iceland, 1 January 2025. Total 389,444 — a different
// reference date from the World Bank 2024 mid-year total 386,506.
export const REGIONS = [
  { name: 'Capital Region', population: 249054, area: 1046, density: 238.1, share: 64.0, town: 'Reykjavík' },
  { name: 'Southern Peninsula', population: 29577, area: 813, density: 36.4, share: 7.6, town: 'Reykjanesbær' },
  { name: 'Western Region', population: 17761, area: 9527, density: 1.9, share: 4.6, town: 'Akranes' },
  { name: 'Westfjords', population: 7176, area: 8842, density: 0.8, share: 1.8, town: 'Ísafjörður' },
  { name: 'Northwestern Region', population: 7355, area: 13108, density: 0.6, share: 1.9, town: 'Sauðárkrókur' },
  { name: 'Northeastern Region', population: 32026, area: 22677, density: 1.4, share: 8.2, town: 'Akureyri' },
  { name: 'Eastern Region', population: 11217, area: 15706, density: 0.7, share: 2.9, town: 'Egilsstaðir' },
  { name: 'Southern Region', population: 35278, area: 30983, density: 1.1, share: 9.1, town: 'Selfoss' },
];
export const REGIONS_TOTAL = { population: 389444, area: 102702, density: 3.8, share: 100.0, town: 'Reykjavík (62 municipalities)' };
