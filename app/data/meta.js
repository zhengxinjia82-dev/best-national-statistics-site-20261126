// Site metadata for Iceland in Numbers: country, years covered and the source
// index every figure on the site cites. No network references anywhere in app/:
// sources are plain text ("World Bank, 2024"), never URLs.
export const META = {
  siteName: 'Iceland in Numbers',
  country: 'Iceland',
  countryCode: 'ISL',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  lastYear: 2024,
  sources: [
    { short: 'World Bank', full: 'World Bank, World Development Indicators (WDI), Iceland (ISL), 2015–2024' },
    { short: 'Statistics Iceland', full: 'Statistics Iceland — Population by regions, sex and age, 1 January 2025; foreign visitors, Keflavík departures' },
    { short: 'Icelandic Tourist Board', full: 'Icelandic Tourist Board — foreign visitors by country of origin, 2024' },
    { short: 'Eurostat', full: 'Eurostat — renewable share of electricity, 2024' },
    { short: 'Ember', full: 'Ember / Our World in Data — electricity generation by source, 2024' },
    { short: 'Orkustofnun', full: 'Orkustofnun (National Energy Authority) — primary energy supply, 2020; geothermal heating share' },
  ],
};

// Format helpers shared by every page and chart.
export function fmtInt(n) {
  return Math.round(n).toLocaleString('en-US');
}
export function fmt1(n) {
  return (Math.round(n * 10) / 10).toFixed(1);
}
export function fmt2(n) {
  return (Math.round(n * 100) / 100).toFixed(2);
}
export function fmtSigned(n, decimals = 1) {
  const v = decimals === 1 ? fmt1(n) : fmt2(n);
  return (n > 0 ? '+' : '') + v;
}
export function srcLine(source, year) {
  return 'Source: ' + source + ', ' + year;
}
