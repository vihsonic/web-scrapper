# Overview

## Technoglies
- [Express](https://www.npmjs.com/package/express) API
- [Puppeteer](https://www.npmjs.com/package/puppeteer) for web scraping


## Usage
To use the app, run the following commands:

```mkdir covid-web-scraper-and-api```
```cd covid-web-scraper-and-api```
```git init```
```git clone https://github.com/bracesproul/Web-scraper-and-API.git```
```npm install express --save```
`````npm install puppeteer --save```
```node index.js``` *(wait until this finishes)*
```node api.js```

You should then see the output ```Listening on port http://localhost3000```
Naviage to [http://localhost3000/data](http://localhost3000/data) to request all data


## API Routes
*URL*/data - Returns all data
*URL*/cases - Returns total cases
*URL*/deaths - Returns total deaths
*URL*/new_cases - Returns new cases from previous day
*URL*/new_deaths - Returns new deaths from previous day
*URL*/cumulative_death_rate - Returns cumulative death rate
*URL*/death_rate_7 - Returns averge death rate for the last 7 days
*URL*/new_tests - Returns new tests from previous day
*URL*/vaccines_administered - Returns total vaccines administered
*URL*/people_fully_vaccinated - Returns total people fully vaccinated
*URL*/current_hospitalized - Returns total amount of people currently hospitalized
*URL*/current_icu - Returns total amount of people currently in the ICU


## Citation
Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/coronavirus' [Online Resource] [Our World in Data](https://ourworldindata.org/)