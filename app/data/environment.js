// Environment and energy in Iceland. Renewable share of electricity 99.98%
// (2024, Eurostat); electricity generation 2024 by source (Ember / Our World
// in Data, 19.1 TWh total); primary energy 2020 (Orkustofnun, 90.0% renewable);
// energy use per capita, kg of oil equivalent (World Bank EG.USE.PCAP.KG.OE);
// CO2 emissions per capita, tonnes (World Bank EN.GHG.CO2.PC.CE.AR5);
// geothermal heats about 90% of homes (Orkustofnun, 2017); internet users
// 98.2% of population (World Bank IT.NET.USER.ZS, 2024).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const ENVIRONMENT = {
  renewableElectricityPct: 99.98,
  renewableElectricityYear: 2024,
  renewableElectricitySource: 'Eurostat',
  generation2024: [
    { source: 'Hydro', twh: 13.46, share: 70.7 },
    { source: 'Geothermal and other renewables', twh: 5.57, share: 29.2 },
    { source: 'Wind', twh: 0.01, share: 0.1 },
    { source: 'Solar', twh: 0.01, share: 0.1 },
  ],
  generationTotalTwh: 19.1,
  primaryEnergy2020: [
    { source: 'Geothermal', share: 70.4 },
    { source: 'Hydro', share: 19.3 },
    { source: 'Oil', share: 10.0 },
    { source: 'Other renewables', share: 0.3 },
  ],
  primaryRenewablePct: 90.0,
  energyUsePerCapita: [16911, 15701, 16235, 17347, 16701, 16084, 15780, 15807, 15686, 16248],
  co2PerCapita: [10.97, 9.48, 9.70, 9.34, 8.81, 8.38, 8.49, 8.48, 8.35, 8.52],
  geothermalHomesPct: 90,
  internetUsersPct: 98.2,
};
