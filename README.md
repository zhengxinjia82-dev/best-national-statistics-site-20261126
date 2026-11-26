[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/zhengxinjia82-dev/best-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/zhengxinjia82-dev/best-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Iceland in Numbers

An independent statistics site for Iceland, 2015–2024: population, GDP, jobs, prices, health, education, energy and regions. Every figure carries its source and its year.

## What is inside

- **10 sections** — Overview dashboard + Population, Economy, Jobs, Prices, Health, Education, Environment, Regions, Methods & sources. Every section is a full page with at least one chart and one table; nothing is empty or placeholder.
- **23 charts, 12 tables** — hand-drawn inline SVG: line, bar (grouped/stacked/horizontal), donut and a 17-band population pyramid. No chart library, no framework, no webfonts, no network requests.
- **Real data** — World Bank World Development Indicators (Iceland, 2015–2024) as the primary source, plus Statistics Iceland, Eurostat, Ember / Our World in Data, Orkustofnun and the Icelandic Tourist Board. Indicator codes are listed on the Methods page so any figure can be re-fetched and checked.
- **Working tools** — year selector 2015–2024 (every card, chart and table follows it), sortable tables, a region selector with detail card, and a price calculator that converts any amount to 2024 prices using the CPI index ($100 in 2015 = $146.59 in 2024). Chart hover shows the exact value, year and source.

## Headline numbers (2024)

| Indicator | 2024 | Source |
|---|---|---|
| Population | 386,506 | World Bank |
| GDP | $33.2bn | World Bank |
| GDP per capita | $85,863 | World Bank |
| Unemployment | 3.6% | World Bank, ILO |
| Inflation | 5.9% | World Bank |
| Life expectancy | 82.8 years | World Bank |
| Renewable electricity | 99.98% | Eurostat |
| Foreign visitors | 2,261,391 | Statistics Iceland |

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Open `http://localhost:8080` in a desktop or phone browser. No build step, no install.

## Build the entry dossier

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Independence

Iceland in Numbers is an independent publication. It is not Statistics Iceland (Hagstofa Íslands). Statistics Iceland is cited as a data source, as are the World Bank, Eurostat, Ember, Orkustofnun and the Icelandic Tourist Board.

## License

MIT — see [LICENSE](LICENSE).
