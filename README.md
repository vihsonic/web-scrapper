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

```npm install puppeteer --save```

```node index.js``` 

*(wait until this finishes)*

```node server.js```

You should then see the output ```Listening on port http://localhost:3001/```
Naviage to [http://localhost:3001/get-data/data](http://localhost:3001/get-data/data) to request all data


## API Routes
*URL*/get-data/data - Returns all data

*URL*/get-data/cases - Returns total cases

*URL*/get-data/deaths - Returns total deaths

*URL*/get-data/new_cases - Returns new cases from previous day

*URL*/get-data/new_deaths - Returns new deaths from previous day

*URL*/get-data/cumulative_fatality_rate - Returns cumulative death rate

*URL*/get-data/death_rate_7 - Returns averge death rate for the last 7 days

*URL*/get-data/new_tests - Returns new tests from previous day

*URL*/get-data/vaccines_administered - Returns total vaccines administered

*URL*/get-data/people_fully_vaccinated - Returns total people fully vaccinated

*URL*/get-data/current_hospitalized - Returns total amount of people currently hospitalized

*URL*/get-data/current_icu - Returns total amount of people currently in the ICU


## Citation
Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". Published online at OurWorldInData.org. Retrieved from: https://ourworldindata.org/coronavirus [Online Resource] 

[Our World in Data](https://ourworldindata.org/)