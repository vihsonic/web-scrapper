// Citation
/*
Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, 
Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". 
Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/coronavirus' [Online Resource]
*/

const puppeteer = require('puppeteer');
const fs = require('fs');

const createGroups = (arr, numGroups) => {
    const perGroup = Math.ceil(arr.length / numGroups);
    const finalArr = new Array(numGroups)
      .fill('')
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
    return finalArr;
}

const _TOTAL_CASES = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Confirmed+cases&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND"
}

const _TOTAL_DEATHS = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Confirmed+deaths&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND"
}

const _CURRENT_HOSPITALIZED = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Hospital+patients&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND"
}

const _CURRENT_ICU = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=ICU+patients&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND"
}
// New cases per day every country
const _NEW_CASES = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&pickerSort=asc&pickerMetric=location&Metric=Confirmed+cases&Interval=New+per+day&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

// New deaths per day every country.
const _NEW_DEATHS = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&pickerSort=asc&pickerMetric=location&Metric=Confirmed+deaths&Interval=New+per+day&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

// Fatality rate per country, start date, current date
const _FATALITY_RATE_7_DAY_AVG = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Case+fatality+rate&Interval=7-day+rolling+average&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

// Cumalitive
const _CUMULATIVE_FATALITY_RATE = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Case+fatality+rate&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_START: "dimension dimension-start",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

// New tests per day every country
const _NEW_TESTS = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Tests&Interval=New+per+day&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_RECENT_UPDATE: "closest-time-notice-icon",
    RECENT_UPDATE_TYPE: "span",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

// Total vaccine doses administered
const _VACCINES_ADMINISTERED = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=Vaccine+doses&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_RECENT_UPDATE: "closest-time-notice-icon",
    RECENT_UPDATE_TYPE: "span",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

// Vaccines aquired per country
const _PEOPLE_FULLY_VACCINATED = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&zoomToSelection=true&time=2020-03-01..latest&facet=none&uniformYAxis=0&pickerSort=asc&pickerMetric=location&Metric=People+fully+vaccinated&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=USA~GBR~CAN~DEU~ITA~IND",
    CLASS_NAME: "dimension dimension-end",
    CLASS_NAME_TYPE: "td",
    CLASS_NAME_RECENT_UPDATE: "closest-time-notice-icon",
    RECENT_UPDATE_TYPE: "span",
    CLASS_NAME_COUNTRY_NAME: "entity sorted",
    COUNTRY_NAME_TYPE: "td"
}

const getData = async (total_cases, total_deaths, current_hospitalized, current_icu, cases, deaths, death_rate_7, cumulative_death_rate, new_tests, vaccines_administered, people_fully_vaccinated) => {
    let final = [];

    const browser_total_cases = await puppeteer.launch({headless:true})
    const page_total_cases = await browser_total_cases.newPage()
    await page_total_cases.goto(total_cases.URL, { waitUntil: 'networkidle2' });
    const options_total_cases = await page_total_cases.$$eval('table[class="data-table"] > tbody > tr > td', (options_total_cases) =>
        options_total_cases.map((option_total_cases) => option_total_cases.textContent)
    );
    await browser_total_cases.close();
    // console.log(options_total_cases.length);
    const finalData_total_cases = createGroups(options_total_cases, 228);
    // console.log(finalData_total_cases);
    const finalObj_total_cases = finalData_total_cases.map(item => {
        let total_cases = item[2];
        // console.log(total_cases);
        if (!total_cases) {
            total_cases = 0;
        } else if (total_cases.includes(", 2022") || total_cases.includes(", 2021") || total_cases.includes(", 2020")) {
            let last_update = [];
            let last_update_total_cases = [];
            last_update.push(total_cases.substring(0, 12));
            last_update_total_cases.push(total_cases.substring(13));
            // console.log('last_update', last_update, 'last_update_total_cases', last_update_total_cases);
            total_cases = [last_update[0], last_update_total_cases[0]];
        }
        const dataV = {
            country: item[0],
            total_cases: total_cases,
        }
        return dataV
    })
    // console.log(finalObj_total_cases);

    const browser_total_deaths = await puppeteer.launch({headless:true})
    const page_total_deaths = await browser_total_deaths.newPage()
    await page_total_deaths.goto(total_deaths.URL, { waitUntil: 'networkidle2' });
    const options_total_deaths = await page_total_deaths.$$eval('table[class="data-table"] > tbody > tr > td', (options_total_deaths) =>
        options_total_deaths.map((option_total_deaths) => option_total_deaths.textContent)
    );
    await browser_total_deaths.close();
    // console.log(options_total_deaths.length);
    const finalData_total_deaths = createGroups(options_total_deaths, 228);
    // console.log(finalData_total_deaths);
    const finalObj_total_deaths = finalData_total_deaths.map(item => {
        let total_deaths = item[2];
        // console.log(total_deaths);
        if (!total_deaths) {
            total_deaths = 0;
        } else if (total_deaths.includes(", 2022") || total_deaths.includes(", 2021") || total_deaths.includes(", 2020")) {
            let last_update = [];
            let last_update_total_deaths = [];
            last_update.push(total_deaths.substring(0, 12));
            last_update_total_deaths.push(total_deaths.substring(13));
            // console.log('last_update', last_update, 'last_update_total_deaths', last_update_total_deaths);
            total_deaths = [last_update[0], last_update_total_deaths[0]];
        }
        const dataV = {
            country: item[0],
            total_deaths: total_deaths,
        }
        return dataV
    })
    // console.log(finalObj_total_deaths);

    const browser_current_hospitalized = await puppeteer.launch({headless:true})
    const page_current_hospitalized = await browser_current_hospitalized.newPage()
    await page_current_hospitalized.goto(current_hospitalized.URL, { waitUntil: 'networkidle2' });
    const options_current_hospitalized = await page_current_hospitalized.$$eval('table[class="data-table"] > tbody > tr > td', (options_current_hospitalized) =>
        options_current_hospitalized.map((option_current_hospitalized) => option_current_hospitalized.textContent)
    );
    await browser_current_hospitalized.close();
    // console.log(options_current_hospitalized.length);
    const finalData_current_hospitalized = createGroups(options_current_hospitalized, 36);
    // console.log(finalData_current_hospitalized);
    const finalObj_current_hospitalized = finalData_current_hospitalized.map(item => {
        let current_hospitalized = item[2];
        // console.log(current_hospitalized);
        if (!current_hospitalized) {
            current_hospitalized = 0;
        } else if (current_hospitalized.includes(", 2022") || current_hospitalized.includes(", 2021") || current_hospitalized.includes(", 2020")) {
            let last_update = [];
            let last_update_current_hospitalized = [];
            last_update.push(current_hospitalized.substring(0, 12));
            last_update_current_hospitalized.push(current_hospitalized.substring(13));
            // console.log('last_update', last_update, 'last_update_current_hospitalized', last_update_current_hospitalized);
            current_hospitalized = [last_update[0], last_update_current_hospitalized[0]];
        }
        const dataV = {
            country: item[0],
            current_hospitalized: current_hospitalized,
        }
        return dataV
    })
    // console.log(finalObj_current_hospitalized);

    const browser_current_icu = await puppeteer.launch({headless:true})
    const page_current_icu = await browser_current_icu.newPage()
    await page_current_icu.goto(current_icu.URL, { waitUntil: 'networkidle2' });
    const options_current_icu = await page_current_icu.$$eval('table[class="data-table"] > tbody > tr > td', (options_current_icu) =>
        options_current_icu.map((option_current_icu) => option_current_icu.textContent)
    );
    await browser_current_icu.close();
    // console.log(options_current_icu.length);
    const finalData_current_icu = createGroups(options_current_icu, 35);
    // console.log(finalData_current_icu);
    const finalObj_current_icu = finalData_current_icu.map(item => {
        let current_icu = item[2];
        // console.log(current_icu);
        if (!current_icu) {
            current_icu = 0;
        } else if (current_icu.includes(", 2022") || current_icu.includes(", 2021") || current_icu.includes(", 2020")) {
            let last_update = [];
            let last_update_current_icu = [];
            last_update.push(current_icu.substring(0, 12));
            last_update_current_icu.push(current_icu.substring(13));
            // console.log('last_update', last_update, 'last_update_current_icu', last_update_current_icu);
            current_icu = [last_update[0], last_update_current_icu[0]];
        }
        const dataV = {
            country: item[0],
            current_icu: current_icu,
        }
        return dataV
    })
    // console.log(finalObj_current_icu);

    const browser_cases = await puppeteer.launch({headless:true})
    const page_cases = await browser_cases.newPage()
    await page_cases.goto(cases.URL, { waitUntil: 'networkidle2' });
    const options_cases = await page_cases.$$eval('table[class="data-table"] > tbody > tr > td', (options_cases) =>
        options_cases.map((option_cases) => option_cases.textContent)
    );
    await browser_cases.close();
    const finalData_cases = createGroups(options_cases, 228);
    const finalObj_cases = finalData_cases.map(item => {
        let cases = item[2];
        if (!cases) {
            cases = 0;
        } else if (cases.includes(", 2022") || cases.includes(", 2021") || cases.includes(", 2020")) {
            let last_update = [];
            let last_update_cases = [];
            last_update.push(cases.substring(0, 12));
            last_update_cases.push(cases.substring(13));
            // console.log('last_update', last_update, 'last_update_cases', last_update_cases);
            cases = [last_update[0], last_update_cases[0]];
        }
        const dataV = {
            country: item[0],
            new_cases: cases,
        }
        return dataV
    });
    // console.log(finalObj_cases);
    
    const browser_deaths = await puppeteer.launch({headless:true})
    const page_deaths = await browser_deaths.newPage()
    await page_deaths.goto(deaths.URL, { waitUntil: 'networkidle2' });
    const options_deaths = await page_deaths.$$eval('table[class="data-table"] > tbody > tr > td', (options_deaths) =>
        options_deaths.map((option_deaths) => option_deaths.textContent)
    );
    await browser_deaths.close();
    const finalData_deaths = createGroups(options_deaths, 228);
    const finalObj_deaths = finalData_deaths.map(item => {
        let deaths = item[2];
        if (!deaths) {
            deaths = 0;
        } else if (deaths.includes(", 2022") || deaths.includes(", 2021") || deaths.includes(", 2020")) {
            let last_update = [];
            let last_update_deaths = [];
            last_update.push(deaths.substring(0, 12));
            last_update_deaths.push(deaths.substring(13));
            // console.log('last_update', last_update, 'last_update_deaths', last_update_deaths);
            deaths = [last_update[0], last_update_deaths[0]];
        }
        const dataV = {
            country: item[0],
            new_deaths: deaths,
        }
        return dataV
    })
    //console.log(finalObj_deaths);

    const browser_death_rate_7 = await puppeteer.launch({headless:true})
    const page_death_rate_7 = await browser_death_rate_7.newPage()
    await page_death_rate_7.goto(death_rate_7.URL, { waitUntil: 'networkidle2' });
    const options_death_rate_7 = await page_death_rate_7.$$eval('table[class="data-table"] > tbody > tr > td', (options_death_rate_7) =>
        options_death_rate_7.map((option_death_rate_7) => option_death_rate_7.textContent)
    );
    await browser_death_rate_7.close();
    const finalData_death_rate_7 = createGroups(options_death_rate_7, 228);
    const finalObj_death_rate_7 = finalData_death_rate_7.map(item => {
        let death_rate_7 = item[2];
        if (!death_rate_7) {
            death_rate_7 = 0;
        } else if (death_rate_7.includes(", 2022") || death_rate_7.includes(", 2021") || death_rate_7.includes(", 2020")) {
            let last_update = [];
            let last_update_death_rate_7 = [];
            last_update.push(death_rate_7.substring(0, 12));
            last_update_death_rate_7.push(death_rate_7.substring(13));
            death_rate_7 = [last_update[0], last_update_death_rate_7[0]];
            // console.log('last_update', last_update, 'last_update_death_rate_7', last_update_death_rate_7);
        }
        const dataV = {
            country: item[0],
            death_rate_7: death_rate_7,
        }
        return dataV
    })
    // console.log(finalObj_death_rate_7);

    const browser_cumulative_death_rate = await puppeteer.launch({headless:true})
    const page_cumulative_death_rate = await browser_cumulative_death_rate.newPage()
    await page_cumulative_death_rate.goto(cumulative_death_rate.URL, { waitUntil: 'networkidle2' });
    const options_cumulative_death_rate = await page_cumulative_death_rate.$$eval('table[class="data-table"] > tbody > tr > td', (options_cumulative_death_rate) =>
        options_cumulative_death_rate.map((option_cumulative_death_rate) => option_cumulative_death_rate.textContent)
    );
    await browser_cumulative_death_rate.close();
    const finalData_cumulative_death_rate = createGroups(options_cumulative_death_rate, 228);
    const finalObj_cumulative_death_rate = finalData_cumulative_death_rate.map(item => {
        let cumulative_death_rate = item[2];
        if (!cumulative_death_rate) {
            cumulative_death_rate = 0;
        } else if (cumulative_death_rate.includes(", 2022") || cumulative_death_rate.includes(", 2021") || cumulative_death_rate.includes(", 2020")) {
            let last_update = [];
            let last_update_cumulative_death_rate = [];
            last_update.push(cumulative_death_rate.substring(0, 12));
            last_update_cumulative_death_rate.push(cumulative_death_rate.substring(13));
            // console.log('last_update', last_update, 'last_update_cumulative_death_rate', last_update_cumulative_death_rate);
            cumulative_death_rate = [last_update[0], last_update_cumulative_death_rate[0]];
        }
        const dataV = {
            country: item[0],
            cumulative_death_rate: cumulative_death_rate,
        }
        return dataV
    })
    // console.log(finalObj_cumulative_death_rate);

    const browser_new_tests = await puppeteer.launch({headless:true})
    const page_new_tests = await browser_new_tests.newPage()
    await page_new_tests.goto(new_tests.URL, { waitUntil: 'networkidle2' });
    const options_new_tests = await page_new_tests.$$eval('table[class="data-table"] > tbody > tr > td', (options_new_tests) =>
        options_new_tests.map((option_new_tests) => option_new_tests.textContent)
    );
    await browser_new_tests.close();
    // console.log(options_new_tests.length);
    const finalData_new_tests = createGroups(options_new_tests, 135);
    // console.log(finalData_new_tests);
    const finalObj_new_tests = finalData_new_tests.map(item => {
        let new_tests = item[2];
        // console.log(new_tests);
        if (!new_tests) {
            new_tests = 0;
        } else if (new_tests.includes(", 2022") || new_tests.includes(", 2021") || new_tests.includes(", 2020")) {
            let last_update = [];
            let last_update_new_tests = [];
            last_update.push(new_tests.substring(0, 12));
            last_update_new_tests.push(new_tests.substring(13));
            // console.log('last_update', last_update, 'last_update_new_tests', last_update_new_tests);
            new_tests = [last_update[0], last_update_new_tests[0]];
        }
        const dataV = {
            country: item[0],
            new_tests: new_tests,
        }
        return dataV
    })
    // console.log(finalObj_new_tests);

    const browser_vaccines_administered = await puppeteer.launch({headless:true})
    const page_vaccines_administered = await browser_vaccines_administered.newPage()
    await page_vaccines_administered.goto(vaccines_administered.URL, { waitUntil: 'networkidle2' });
    const options_vaccines_administered = await page_vaccines_administered.$$eval('table[class="data-table"] > tbody > tr > td', (options_vaccines_administered) =>
        options_vaccines_administered.map((option_vaccines_administered) => option_vaccines_administered.textContent)
    );
    await browser_vaccines_administered.close();
    // console.log(options_vaccines_administered.length);
    const finalData_vaccines_administered = createGroups(options_vaccines_administered, 231);
    // console.log(finalData_vaccines_administered);
    const finalObj_vaccines_administered = finalData_vaccines_administered.map(item => {
        let vaccines_administered = item[2];
        // console.log(vaccines_administered);
        if (!vaccines_administered) {
            vaccines_administered = 0;
        } else if (vaccines_administered.includes(", 2022") || vaccines_administered.includes(", 2021") || vaccines_administered.includes(", 2020")) {
            let last_update = [];
            let last_update_vaccines_administered = [];
            last_update.push(vaccines_administered.substring(0, 12));
            last_update_vaccines_administered.push(vaccines_administered.substring(13));
            // console.log('last_update', last_update, 'last_update_vaccines_administered', last_update_vaccines_administered);
            vaccines_administered = [last_update[0], last_update_vaccines_administered[0]];
        }
        const dataV = {
            country: item[0],
            vaccines_administered: vaccines_administered,
        }
        return dataV
    })
    // console.log(finalObj_vaccines_administered);

    const browser_people_fully_vaccinated = await puppeteer.launch({headless:true})
    const page_people_fully_vaccinated = await browser_people_fully_vaccinated.newPage()
    await page_people_fully_vaccinated.goto(people_fully_vaccinated.URL, { waitUntil: 'networkidle2' });
    const options_people_fully_vaccinated = await page_people_fully_vaccinated.$$eval('table[class="data-table"] > tbody > tr > td', (options_people_fully_vaccinated) =>
        options_people_fully_vaccinated.map((option_people_fully_vaccinated) => option_people_fully_vaccinated.textContent)
    );
    await browser_people_fully_vaccinated.close();
    // console.log(options_people_fully_vaccinated.length);
    const finalData_people_fully_vaccinated = createGroups(options_people_fully_vaccinated, 231);
    // console.log(finalData_people_fully_vaccinated);
    const finalObj_people_fully_vaccinated = finalData_people_fully_vaccinated.map(item => {
        let people_fully_vaccinated = item[2];
        // console.log(people_fully_vaccinated);
        if (!people_fully_vaccinated) {
            people_fully_vaccinated = 0;
        } else if (people_fully_vaccinated.includes(", 2022") || people_fully_vaccinated.includes(", 2021") || people_fully_vaccinated.includes(", 2020")) {
            let last_update = [];
            let last_update_people_fully_vaccinated = [];
            last_update.push(people_fully_vaccinated.substring(0, 12));
            last_update_people_fully_vaccinated.push(people_fully_vaccinated.substring(13));
            // console.log('last_update', last_update, 'last_update_people_fully_vaccinated', last_update_people_fully_vaccinated);
            people_fully_vaccinated = [last_update[0], last_update_people_fully_vaccinated[0]];
        }
        const dataV = {
            country: item[0],
            people_fully_vaccinated: people_fully_vaccinated,
        }
        return dataV
    })
    // console.log(finalObj_people_fully_vaccinated);


    final.push({ "total_cases": finalObj_total_cases }, { "total_deaths": finalObj_total_deaths }, { "total_hospitalized": finalObj_current_hospitalized }, { "total_icu": finalObj_current_icu }, { "daily_cases": finalObj_cases }, { "daily_deaths": finalObj_deaths }, { "fatality_rate_7_day_avg": finalObj_death_rate_7 }, { "cumulative_fatality_rate": finalObj_cumulative_death_rate }, { "daily_tests": finalObj_new_tests }, { "vaccines_administered": finalObj_vaccines_administered }, { "fully_vaccinated_people": finalObj_people_fully_vaccinated });
    fs.writeFile('./data.json', JSON.stringify(final), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    console.log(final);
}


getData(_TOTAL_CASES, _TOTAL_DEATHS, _CURRENT_HOSPITALIZED, _CURRENT_ICU, _NEW_CASES, _NEW_DEATHS, _FATALITY_RATE_7_DAY_AVG, _CUMULATIVE_FATALITY_RATE, _NEW_TESTS, _VACCINES_ADMINISTERED, _PEOPLE_FULLY_VACCINATED);