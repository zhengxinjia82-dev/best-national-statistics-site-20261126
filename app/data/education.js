// Education in Iceland. World Bank WDI: gross enrolment ratios by level
// (SE.PRM/SE.SEC/SE.TER.ENRR), net enrolment 2015–2017 only
// (SE.PRM/SE.SEC.NENR), government expenditure on education % of GDP
// (SE.XPD.TOTL.GD.ZS, 2015–2022). Gross secondary enrolment exceeds 100%
// because it counts over-age and adult students (see Methods page).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

export const EDUCATION = {
  primaryGross: [98.7, 99.0, 98.9, 98.9, 98.8, 98.6, 98.6, 98.5, 98.2],
  secondaryGross: [119.8, 117.1, 115.7, 114.6, 112.0, 110.5, 115.2, 112.6, 108.9],
  tertiaryGross: [75.6, 74.7, 71.3, 69.3, 70.6, 74.6, 86.5, 85.0, 76.5],
  primaryNet: [98.6, 99.5, 99.8],
  secondaryNet: [89.7, 90.0, 91.3],
  spendingPct: [7.46, 7.43, 7.58, 7.56, 7.60, 8.58, 8.23, 7.31],
  spendingYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
};
