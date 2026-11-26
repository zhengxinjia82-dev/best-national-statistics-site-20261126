// Economy of Iceland, 2015–2024. World Bank WDI unless noted.
// GDP current US$ bn (NY.GDP.MKTP.CD); constant 2015 US$ bn (NY.GDP.MKTP.KD);
// real growth % (NY.GDP.MKTP.KD.ZG); GDP per capita US$ (NY.GDP.PCAP.CD) and
// PPP (NY.GDP.PCAP.PP.CD); sector shares % GDP (NV.AGR/IND/SRV.TOTL.ZS);
// exports/imports % GDP (NE.EXP/IMP.GNFS.ZS). Tourism: Statistics Iceland /
// Icelandic Tourist Board, Keflavík departures.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const ECONOMY = {
  gdpCurrentBn: [17.70, 21.08, 25.06, 26.68, 24.99, 22.03, 26.23, 29.18, 31.70, 33.19],
  gdpConstantBn: [17.70, 18.80, 19.46, 20.36, 20.59, 19.23, 20.22, 22.01, 23.12, 22.82],
  gdpGrowthPct: [3.8, 6.2, 3.5, 4.7, 1.1, -6.6, 5.2, 8.9, 5.0, -1.3],
  gdpPerCapita: [53506, 62854, 72976, 75634, 69296, 60128, 70425, 76377, 82201, 85863],
  gdpPerCapitaPpp: [49716, 54228, 56385, 58106, 61270, 56841, 62721, 76592, 82257, 83561],
  agriculturePct: [5.4, 4.5, 3.8, 4.2, 4.4, 4.8, 4.4, 4.2, 4.3, 3.5],
  industryPct: [19.9, 19.7, 19.4, 20.0, 19.2, 20.0, 20.3, 20.9, 19.7, 20.1],
  servicesPct: [64.5, 65.5, 65.8, 65.1, 66.3, 65.4, 65.1, 64.9, 65.5, 65.3],
  exportsPct: [51.3, 47.5, 45.7, 46.5, 44.7, 34.1, 37.4, 46.7, 44.0, 42.5],
  importsPct: [43.6, 40.3, 40.7, 42.5, 39.1, 34.5, 38.9, 46.3, 43.3, 43.7],
  // Foreign visitors, Keflavík departures (Statistics Iceland).
  visitors: [1261938, 1767726, 2195271, 2315925, 1986153, 482108, 687691, 1696785, 2214182, 2261391],
};

// Top visitor origins, 2024 (Icelandic Tourist Board).
export const TOURISM_ORIGINS_2024 = [
  { country: 'United States', visitors: 620396 },
  { country: 'United Kingdom', visitors: 266246 },
  { country: 'Germany', visitors: 141879 },
  { country: 'Canada', visitors: 77782 },
];
export const TOURISM_SHARE_GDP = { value: 8.8, year: 2025, source: 'Statistics Iceland' };
