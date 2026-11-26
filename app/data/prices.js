// Prices in Iceland, 2015–2024. World Bank WDI: CPI index 2010=100
// (FP.CPI.TOTL) and annual inflation % (FP.CPI.TOTL.ZG). Prices rose 46.6%
// from 2015 to 2024 (172.76 / 117.85). Calculator check: $100 in 2015
// = $146.59 in 2024 prices (100 x 172.7579 / 117.8474).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const PRICES = {
  cpi: [117.85, 119.85, 121.96, 125.23, 129.00, 132.68, 138.57, 150.09, 163.20, 172.76],
  inflation: [1.63, 1.70, 1.76, 2.68, 3.01, 2.85, 4.44, 8.31, 8.74, 5.86],
};

// Convert an amount from baseYear prices to 2024 prices using the CPI index.
export function inflate(amount, baseYear) {
  const i = YEARS.indexOf(baseYear);
  if (i < 0 || !(amount > 0)) return null;
  return amount * PRICES.cpi[9] / PRICES.cpi[i];
}
