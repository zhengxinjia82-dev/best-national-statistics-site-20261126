// Jobs in Iceland, 2015–2024. World Bank WDI, ILO modelled estimates:
// unemployment total / male / female (SL.UEM.TOTL.ZS, .MA, .FE), youth 15–24
// (SL.UEM.1524.ZS), labour force age 15+ (SL.TLF.TOTL.IN). Employed is derived
// in the page code as labour force x (1 - unemployment rate).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const JOBS = {
  unemployment: [3.98, 2.98, 2.74, 2.70, 3.51, 5.48, 6.03, 3.79, 3.52, 3.60],
  unemploymentMale: [3.91, 2.92, 2.76, 2.85, 3.85, 5.64, 5.74, 4.14, 3.87, 3.83],
  unemploymentFemale: [4.05, 3.05, 2.72, 2.54, 3.11, 5.29, 6.36, 3.39, 3.10, 3.33],
  unemploymentYouth: [8.58, 6.32, 7.54, 5.90, 8.45, 9.87, 11.83, 8.42, 8.49, 8.78],
  labourForce: [202438, 208038, 212416, 216594, 221428, 219071, 222546, 232189, 236225, 238873],
};

export function employed(yearIndex) {
  return Math.round(JOBS.labourForce[yearIndex] * (1 - JOBS.unemployment[yearIndex] / 100));
}
