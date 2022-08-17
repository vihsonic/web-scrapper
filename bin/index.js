// Citation
/*
Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino, Esteban Ortiz-Ospina, Joe Hasell, 
Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". 
Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/coronavirus' [Online Resource]
*/

const puppeteer = require('puppeteer');
const fs = require('fs');
const { deepStrictEqual } = require('assert');

const createGroups = (arr, numGroups) => {
    const perGroup = Math.ceil(arr.length / numGroups);
    const finalArr = new Array(numGroups)
      .fill('')
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
    return finalArr;
}
const countryList = [{"iso":"CHN","name":"China"},{"iso":"TWN","name":"Taipei and environs"},{"iso":"USA","name":"US"},{"iso":"JPN","name":"Japan"},{"iso":"THA","name":"Thailand"},{"iso":"KOR","name":"Korea, South"},{"iso":"SGP","name":"Singapore"},{"iso":"PHL","name":"Philippines"},{"iso":"MYS","name":"Malaysia"},{"iso":"VNM","name":"Vietnam"},{"iso":"AUS","name":"Australia"},{"iso":"MEX","name":"Mexico"},{"iso":"BRA","name":"Brazil"},{"iso":"COL","name":"Colombia"},{"iso":"FRA","name":"France"},{"iso":"NPL","name":"Nepal"},{"iso":"CAN","name":"Canada"},{"iso":"KHM","name":"Cambodia"},{"iso":"LKA","name":"Sri Lanka"},{"iso":"CIV","name":"Cote d'Ivoire"},{"iso":"DEU","name":"Germany"},{"iso":"FIN","name":"Finland"},{"iso":"ARE","name":"United Arab Emirates"},{"iso":"IND","name":"India"},{"iso":"ITA","name":"Italy"},{"iso":"GBR","name":"United Kingdom"},{"iso":"RUS","name":"Russia"},{"iso":"SWE","name":"Sweden"},{"iso":"ESP","name":"Spain"},{"iso":"BEL","name":"Belgium"},{"iso":"Others","name":"Others"},{"iso":"EGY","name":"Egypt"},{"iso":"IRN","name":"Iran"},{"iso":"ISR","name":"Israel"},{"iso":"LBN","name":"Lebanon"},{"iso":"IRQ","name":"Iraq"},{"iso":"OMN","name":"Oman"},{"iso":"AFG","name":"Afghanistan"},{"iso":"BHR","name":"Bahrain"},{"iso":"KWT","name":"Kuwait"},{"iso":"AUT","name":"Austria"},{"iso":"DZA","name":"Algeria"},{"iso":"HRV","name":"Croatia"},{"iso":"CHE","name":"Switzerland"},{"iso":"PAK","name":"Pakistan"},{"iso":"GEO","name":"Georgia"},{"iso":"GRC","name":"Greece"},{"iso":"MKD","name":"North Macedonia"},{"iso":"NOR","name":"Norway"},{"iso":"ROU","name":"Romania"},{"iso":"DNK","name":"Denmark"},{"iso":"EST","name":"Estonia"},{"iso":"NLD","name":"Netherlands"},{"iso":"SMR","name":"San Marino"},{"iso":"AZE","name":"Azerbaijan"},{"iso":"BLR","name":"Belarus"},{"iso":"ISL","name":"Iceland"},{"iso":"LTU","name":"Lithuania"},{"iso":"NZL","name":"New Zealand"},{"iso":"NGA","name":"Nigeria"},{"iso":"IRL","name":"Ireland"},{"iso":"LUX","name":"Luxembourg"},{"iso":"MCO","name":"Monaco"},{"iso":"QAT","name":"Qatar"},{"iso":"ECU","name":"Ecuador"},{"iso":"CZE","name":"Czechia"},{"iso":"ARM","name":"Armenia"},{"iso":"DOM","name":"Dominican Republic"},{"iso":"IDN","name":"Indonesia"},{"iso":"PRT","name":"Portugal"},{"iso":"AND","name":"Andorra"},{"iso":"LVA","name":"Latvia"},{"iso":"MAR","name":"Morocco"},{"iso":"SAU","name":"Saudi Arabia"},{"iso":"SEN","name":"Senegal"},{"iso":"ARG","name":"Argentina"},{"iso":"CHL","name":"Chile"},{"iso":"JOR","name":"Jordan"},{"iso":"UKR","name":"Ukraine"},{"iso":"BLM","name":"Saint Barthelemy"},{"iso":"HUN","name":"Hungary"},{"iso":"FRO","name":"Faroe Islands"},{"iso":"GIB","name":"Gibraltar"},{"iso":"LIE","name":"Liechtenstein"},{"iso":"POL","name":"Poland"},{"iso":"TUN","name":"Tunisia"},{"iso":"PSE","name":"West Bank and Gaza"},{"iso":"BIH","name":"Bosnia and Herzegovina"},{"iso":"SVN","name":"Slovenia"},{"iso":"ZAF","name":"South Africa"},{"iso":"BTN","name":"Bhutan"},{"iso":"CMR","name":"Cameroon"},{"iso":"CRI","name":"Costa Rica"},{"iso":"PER","name":"Peru"},{"iso":"SRB","name":"Serbia"},{"iso":"SVK","name":"Slovakia"},{"iso":"TGO","name":"Togo"},{"iso":"VAT","name":"Holy See"},{"iso":"GUF","name":"French Guiana"},{"iso":"MLT","name":"Malta"},{"iso":"MTQ","name":"Martinique"},{"iso":"BGR","name":"Bulgaria"},{"iso":"MDV","name":"Maldives"},{"iso":"BGD","name":"Bangladesh"},{"iso":"MDA","name":"Moldova"},{"iso":"PRY","name":"Paraguay"},{"iso":"ALB","name":"Albania"},{"iso":"CYP","name":"Cyprus"},{"iso":"BRN","name":"Brunei"},{"iso":"MAC","name":"Macao SAR"},{"iso":"MAF","name":"Saint Martin"},{"iso":"BFA","name":"Burkina Faso"},{"iso":"GGY-JEY","name":"Channel Islands"},{"iso":"MNG","name":"Mongolia"},{"iso":"PAN","name":"Panama"},{"iso":"cruise","name":"Cruise Ship"},{"iso":"TWN","name":"Taiwan*"},{"iso":"BOL","name":"Bolivia"},{"iso":"HND","name":"Honduras"},{"iso":"COD","name":"Congo"},{"iso":"JAM","name":"Jamaica"},{"iso":"REU","name":"Reunion"},{"iso":"TUR","name":"Turkey"},{"iso":"CUB","name":"Cuba"},{"iso":"GUY","name":"Guyana"},{"iso":"KAZ","name":"Kazakhstan"},{"iso":"CYM","name":"Cayman Islands"},{"iso":"GLP","name":"Guadeloupe"},{"iso":"ETH","name":"Ethiopia"},{"iso":"SDN","name":"Sudan"},{"iso":"GIN","name":"Guinea"},{"iso":"ATG","name":"Antigua and Barbuda"},{"iso":"ABW","name":"Aruba"},{"iso":"KEN","name":"Kenya"},{"iso":"URY","name":"Uruguay"},{"iso":"GHA","name":"Ghana"},{"iso":"JEY","name":"Jersey"},{"iso":"NAM","name":"Namibia"},{"iso":"SYC","name":"Seychelles"},{"iso":"TTO","name":"Trinidad and Tobago"},{"iso":"VEN","name":"Venezuela"},{"iso":"CUW","name":"Curacao"},{"iso":"SWZ","name":"Eswatini"},{"iso":"GAB","name":"Gabon"},{"iso":"GTM","name":"Guatemala"},{"iso":"GGY","name":"Guernsey"},{"iso":"MRT","name":"Mauritania"},{"iso":"RWA","name":"Rwanda"},{"iso":"LCA","name":"Saint Lucia"},{"iso":"VCT","name":"Saint Vincent and the Grenadines"},{"iso":"SUR","name":"Suriname"},{"iso":"RKS","name":"Kosovo"},{"iso":"CAF","name":"Central African Republic"},{"iso":"COG","name":"Congo (Brazzaville)"},{"iso":"GNQ","name":"Equatorial Guinea"},{"iso":"UZB","name":"Uzbekistan"},{"iso":"GUM","name":"Guam"},{"iso":"PRI","name":"Puerto Rico"},{"iso":"BEN","name":"Benin"},{"iso":"GRL","name":"Greenland"},{"iso":"LBR","name":"Liberia"},{"iso":"MYT","name":"Mayotte"},{"iso":"SOM","name":"Somalia"},{"iso":"TZA","name":"Tanzania"},{"iso":"BHS","name":"Bahamas"},{"iso":"BRB","name":"Barbados"},{"iso":"MNE","name":"Montenegro"},{"iso":"GMB","name":"Gambia"},{"iso":"KGZ","name":"Kyrgyzstan"},{"iso":"MUS","name":"Mauritius"},{"iso":"ZMB","name":"Zambia"},{"iso":"DJI","name":"Djibouti"},{"iso":"TCD","name":"Chad"},{"iso":"SLV","name":"El Salvador"},{"iso":"FJI","name":"Fiji"},{"iso":"NIC","name":"Nicaragua"},{"iso":"MDG","name":"Madagascar"},{"iso":"HTI","name":"Haiti"},{"iso":"AGO","name":"Angola"},{"iso":"CPV","name":"Cabo Verde"},{"iso":"NER","name":"Niger"},{"iso":"PNG","name":"Papua New Guinea"},{"iso":"ZWE","name":"Zimbabwe"},{"iso":"TLS","name":"Timor-Leste"},{"iso":"ERI","name":"Eritrea"},{"iso":"UGA","name":"Uganda"},{"iso":"DMA","name":"Dominica"},{"iso":"GRD","name":"Grenada"},{"iso":"MOZ","name":"Mozambique"},{"iso":"SYR","name":"Syria"},{"iso":"BLZ","name":"Belize"},{"iso":"LAO","name":"Laos"},{"iso":"LBY","name":"Libya"},{"iso":"NA-SHIP-DP","name":"Diamond Princess"},{"iso":"GNB","name":"Guinea-Bissau"},{"iso":"MLI","name":"Mali"},{"iso":"KNA","name":"Saint Kitts and Nevis"},{"iso":"BWA","name":"Botswana"},{"iso":"BDI","name":"Burundi"},{"iso":"SLE","name":"Sierra Leone"},{"iso":"MMR","name":"Burma"},{"iso":"MWI","name":"Malawi"},{"iso":"SSD","name":"South Sudan"},{"iso":"ESH","name":"Western Sahara"},{"iso":"STP","name":"Sao Tome and Principe"},{"iso":"NA-SHIP-MSZ","name":"MS Zaandam"},{"iso":"YEM","name":"Yemen"},{"iso":"COM","name":"Comoros"},{"iso":"TJK","name":"Tajikistan"},{"iso":"LSO","name":"Lesotho"},{"iso":"SLB","name":"Solomon Islands"},{"iso":"MHL","name":"Marshall Islands"},{"iso":"VUT","name":"Vanuatu"},{"iso":"WSM","name":"Samoa"},{"iso":"KIR","name":"Kiribati"},{"iso":"PLW","name":"Palau"},{"iso":"TON","name":"Tonga"}]

const weirdIsoList  = [
    {iso: "OWID_AFR", country: "Africa"},
    {iso: "AIA", country: "Anguilla"},
    {iso: "OWID_ASI", country: "Asia"},
    {iso: "BMU", country: "Bermuda"},
    {iso: "BES", country: "Bonaire Sint Eustatius and Saba"},
    {iso: "VGB", country: "British Virgin Islands"},
    {iso: "CPV", country: "Cape Verde"},
    {iso: "COK", country: "Cook Islands"},
    {iso: "COD", country: "Democratic Republic of Congo"},
    {iso: "OWID_EUR", country: "Europe"},
    {iso: "OWID_EUN", country: "European Union"},
    {iso: "FRO", country: "Faeroe Islands"},
    {iso: "FLK", country: "Falkland Islands"},
    {iso: "PYF", country: "French Polynesia"},
    {iso: "OWID_HIC", country: "High income"},
    {iso: "HKG", country: "Hong Kong"},
    {iso: "IMN", country: "Isle of Man"},
    {iso: "OWID_LIC", country: "Low income"},
    {iso: "OWID_LMC", country: "Lower middle income"},
    {iso: "MAC", country: "Macao"},
    {iso: "MSR", country: "Montserrat"},
    {iso: "MMR", country: "Myanmar"},
    {iso: "NRU", country: "Nauru"},
    {iso: "NCL", country: "New Caledonia"},
    {iso: "NIU", country: "Niue"},
    {iso: "OWID_NAM", country: "North America"},
    {iso: "OWID_CYN", country: "Northern Cyprus"},
    {iso: "OWID_OCE", country: "Oceania"},
    {iso: "PSE", country: "Palestine"},
    {iso: "PCN", country: "Pitcairn"},
    {iso: "SHN", country: "Saint Helena"},
    {iso: "SXM", country: "Sint Maarten (Dutch part)"},
    {iso: "OWID_SAM", country: "South America"},
    {iso: "KOR", country: "South Korea"},
    {iso: "TWN", country: "Taiwan"},
    {iso: "TLS", country: "Timor"},
    {iso: "TKL", country: "Tokelau"},
    {iso: "TKM", country: "Turkmenistan"},
    {iso: "TCA", country: "Turks and Caicos Islands"},
    {iso: "TUV", country: "Tuvalu"},
    {iso: "USA", country: "United States"},
    {iso: "OWID_UMC", country: "Upper middle income"},
    {iso: "WLF", country: "Wallis and Futuna"},
    {iso: "OWID_WRL", country: "World"}
]

const _GET_DATE = {
    URL: "https://ourworldindata.org/explorers/coronavirus-data-explorer?tab=table&facet=none&Metric=Confirmed+cases&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false"
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

const getData = async (get_date, total_cases, total_deaths, current_hospitalized, current_icu, cases, deaths, death_rate_7, cumulative_fatality_rate, new_tests, vaccines_administered, people_fully_vaccinated) => {
    let final = [];
    let date;

    const browser_get_date = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox']
    });
    const page_get_date = await browser_get_date.newPage()
    await page_get_date.goto(get_date.URL, { waitUntil: 'networkidle2' });
    const options_get_date = await page_get_date.$$eval('th[class="subdimension sortable endSubdimension"] > div', (options_get_date) =>
        options_get_date.map((option_get_date) => option_get_date.textContent)
    );
    date = options_get_date[0];
    await browser_get_date.close();
    

    const browser_total_cases = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox']
    })
    const page_total_cases = await browser_total_cases.newPage()
    await page_total_cases.goto(total_cases.URL, { waitUntil: 'networkidle2' });
    const options_total_cases = await page_total_cases.$$eval('table[class="data-table"] > tbody > tr > td', (options_total_cases) =>
        options_total_cases.map((option_total_cases) => option_total_cases.textContent)
    );
    await browser_total_cases.close();
    const finalData_total_cases = createGroups(options_total_cases, 228);
    const finalObj_total_cases = finalData_total_cases.map(item => {
        let total_cases = item[2];
        if (!total_cases) {
            total_cases = 0;
        } else if (total_cases.includes(", 2022") || total_cases.includes(", 2021") || total_cases.includes(", 2020")) {
            let last_update = [];
            let last_update_total_cases = [];
            last_update.push(total_cases.substring(0, 12));
            last_update_total_cases.push(total_cases.substring(13));
            total_cases = [last_update[0], last_update_total_cases[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            total_cases: total_cases,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_total_cases.map(item => {
        if (!item.iso) {
            finalObj_total_cases.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const total_cases_to_write = { 
        "total_cases": finalObj_total_cases,
        "recent_update": new Date()
    };
    fs.writeFile('../data/total_cases.json', JSON.stringify(total_cases_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'total_cases');
    });

    const browser_total_deaths = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_total_deaths = await browser_total_deaths.newPage()
    await page_total_deaths.goto(total_deaths.URL, { waitUntil: 'networkidle2' });
    const options_total_deaths = await page_total_deaths.$$eval('table[class="data-table"] > tbody > tr > td', (options_total_deaths) =>
        options_total_deaths.map((option_total_deaths) => option_total_deaths.textContent)
    );
    await browser_total_deaths.close();
    const finalData_total_deaths = createGroups(options_total_deaths, 228);
    const finalObj_total_deaths = finalData_total_deaths.map(item => {
        let total_deaths = item[2];
        if (!total_deaths) {
            total_deaths = 0;
        } else if (total_deaths.includes(", 2022") || total_deaths.includes(", 2021") || total_deaths.includes(", 2020")) {
            let last_update = [];
            let last_update_total_deaths = [];
            last_update.push(total_deaths.substring(0, 12));
            last_update_total_deaths.push(total_deaths.substring(13));
            total_deaths = [last_update[0], last_update_total_deaths[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            total_deaths: total_deaths,
            iso: iso,
            date: date
        }
        return dataV
    }) 
    finalObj_total_deaths.map(item => {
        if (!item.iso) {
            finalObj_total_deaths.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    }) 
    const total_deaths_to_write = { 
        "total_deaths": finalObj_total_deaths,
        "recent_update": new Date()
    };
    fs.writeFile('../data/total_deaths.json', JSON.stringify(total_deaths_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'total_deaths');
    });

    const browser_current_hospitalized = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_current_hospitalized = await browser_current_hospitalized.newPage()
    await page_current_hospitalized.goto(current_hospitalized.URL, { waitUntil: 'networkidle2' });
    const options_current_hospitalized = await page_current_hospitalized.$$eval('table[class="data-table"] > tbody > tr > td', (options_current_hospitalized) =>
        options_current_hospitalized.map((option_current_hospitalized) => option_current_hospitalized.textContent)
    );
    await browser_current_hospitalized.close();
    const finalData_current_hospitalized = createGroups(options_current_hospitalized, 36);
    const finalObj_current_hospitalized = finalData_current_hospitalized.map(item => {
        let current_hospitalized = item[2];
        if (!current_hospitalized) {
            current_hospitalized = 0;
        } else if (current_hospitalized.includes(", 2022") || current_hospitalized.includes(", 2021") || current_hospitalized.includes(", 2020")) {
            let last_update = [];
            let last_update_current_hospitalized = [];
            last_update.push(current_hospitalized.substring(0, 12));
            last_update_current_hospitalized.push(current_hospitalized.substring(13));
            current_hospitalized = [last_update[0], last_update_current_hospitalized[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            current_hospitalized: current_hospitalized,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_current_hospitalized.map(item => {
        if (!item.iso) {
            finalObj_current_hospitalized.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const current_hospitalized_to_write = { 
        "current_hospitalized": finalObj_current_hospitalized,
        "recent_update": new Date()
    };
    fs.writeFile('../data/current_hospitalized.json', JSON.stringify(current_hospitalized_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'current_hospitalized');
    });

    const browser_current_icu = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_current_icu = await browser_current_icu.newPage()
    await page_current_icu.goto(current_icu.URL, { waitUntil: 'networkidle2' });
    const options_current_icu = await page_current_icu.$$eval('table[class="data-table"] > tbody > tr > td', (options_current_icu) =>
        options_current_icu.map((option_current_icu) => option_current_icu.textContent)
    );
    await browser_current_icu.close();
    const finalData_current_icu = createGroups(options_current_icu, 35);
    const finalObj_current_icu = finalData_current_icu.map(item => {
        let current_icu = item[2];
        if (!current_icu) {
            current_icu = 0;
        } else if (current_icu.includes(", 2022") || current_icu.includes(", 2021") || current_icu.includes(", 2020")) {
            let last_update = [];
            let last_update_current_icu = [];
            last_update.push(current_icu.substring(0, 12));
            last_update_current_icu.push(current_icu.substring(13));
            current_icu = [last_update[0], last_update_current_icu[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            current_icu: current_icu,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_current_icu.map(item => {
        if (!item.iso) {
            finalObj_current_icu.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const current_icu_to_write = { 
        "current_icu": finalObj_current_icu,
        "recent_update": new Date()
    };
    fs.writeFile('../data/current_icu.json', JSON.stringify(current_icu_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'current_icu');
    });

    const browser_cases = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
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
            cases = [last_update[0], last_update_cases[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            cases: cases,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_cases.map(item => {
        if (!item.iso) {
            finalObj_cases.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const cases_to_write = { 
        "cases": finalObj_cases,
        "recent_update": new Date()
    };
    fs.writeFile('../data/cases.json', JSON.stringify(cases_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'cases');
    });
    
    const browser_deaths = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
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
            deaths = [last_update[0], last_update_deaths[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            deaths: deaths,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_deaths.map(item => {
        if (!item.iso) {
            finalObj_deaths.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const deaths_to_write = { 
        "deaths": finalObj_deaths,
        "recent_update": new Date()
    };
    fs.writeFile('../data/deaths.json', JSON.stringify(deaths_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'deaths');
    });

    const browser_death_rate_7 = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
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
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            death_rate_7: death_rate_7,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_death_rate_7.map(item => {
        if (!item.iso) {
            finalObj_death_rate_7.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const death_rate_7_to_write = { 
        "death_rate_7": finalObj_death_rate_7,
        "recent_update": new Date()
    };
    fs.writeFile('../data/death_rate_7.json', JSON.stringify(death_rate_7_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'death_rate_7');
    });

    const browser_cumulative_fatality_rate = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_cumulative_fatality_rate = await browser_cumulative_fatality_rate.newPage()
    await page_cumulative_fatality_rate.goto(cumulative_fatality_rate.URL, { waitUntil: 'networkidle2' });
    const options_cumulative_fatality_rate = await page_cumulative_fatality_rate.$$eval('table[class="data-table"] > tbody > tr > td', (options_cumulative_fatality_rate) =>
        options_cumulative_fatality_rate.map((option_cumulative_fatality_rate) => option_cumulative_fatality_rate.textContent)
    );
    await browser_cumulative_fatality_rate.close();
    const finalData_cumulative_fatality_rate = createGroups(options_cumulative_fatality_rate, 228);
    const finalObj_cumulative_fatality_rate = finalData_cumulative_fatality_rate.map(item => {
        let cumulative_fatality_rate = item[2];
        if (!cumulative_fatality_rate) {
            cumulative_fatality_rate = 0;
        } else if (cumulative_fatality_rate.includes(", 2022") || cumulative_fatality_rate.includes(", 2021") || cumulative_fatality_rate.includes(", 2020")) {
            let last_update = [];
            let last_update_cumulative_fatality_rate = [];
            last_update.push(cumulative_fatality_rate.substring(0, 12));
            last_update_cumulative_fatality_rate.push(cumulative_fatality_rate.substring(13));
            cumulative_fatality_rate = [last_update[0], last_update_cumulative_fatality_rate[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })


        const dataV = {
            country: item[0],
            cumulative_fatality_rate: cumulative_fatality_rate,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_cumulative_fatality_rate.map(item => {
        if (!item.iso) {
            finalObj_cumulative_fatality_rate.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const cumulative_fatality_rate_to_write = { 
        "cumulative_fatality_rate": finalObj_cumulative_fatality_rate,
        "recent_update": new Date()
    };
    fs.writeFile('../data/cumulative_fatality_rate.json', JSON.stringify(cumulative_fatality_rate_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'cumulative_fatality_rate');
    });

    const browser_new_tests = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_new_tests = await browser_new_tests.newPage()
    await page_new_tests.goto(new_tests.URL, { waitUntil: 'networkidle2' });
    const options_new_tests = await page_new_tests.$$eval('table[class="data-table"] > tbody > tr > td', (options_new_tests) =>
        options_new_tests.map((option_new_tests) => option_new_tests.textContent)
    );
    await browser_new_tests.close();
    const finalData_new_tests = createGroups(options_new_tests, 135);
    const finalObj_new_tests = finalData_new_tests.map(item => {
        let new_tests = item[2];
        if (!new_tests) {
            new_tests = 0;
        } else if (new_tests.includes(", 2022") || new_tests.includes(", 2021") || new_tests.includes(", 2020")) {
            let last_update = [];
            let last_update_new_tests = [];
            last_update.push(new_tests.substring(0, 12));
            last_update_new_tests.push(new_tests.substring(13));
            new_tests = [last_update[0], last_update_new_tests[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })

        const dataV = {
            country: item[0],
            new_tests: new_tests,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_new_tests.map(item => {
        if (!item.iso) {
            finalObj_new_tests.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const new_tests_to_write = { 
        "new_tests": finalObj_new_tests,
        "recent_update": new Date()
};
    fs.writeFile('../data/new_tests.json', JSON.stringify(new_tests_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'new_tests');
    });

    const browser_vaccines_administered = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_vaccines_administered = await browser_vaccines_administered.newPage()
    await page_vaccines_administered.goto(vaccines_administered.URL, { waitUntil: 'networkidle2' });
    const options_vaccines_administered = await page_vaccines_administered.$$eval('table[class="data-table"] > tbody > tr > td', (options_vaccines_administered) =>
        options_vaccines_administered.map((option_vaccines_administered) => option_vaccines_administered.textContent)
    );
    await browser_vaccines_administered.close();
    const finalData_vaccines_administered = createGroups(options_vaccines_administered, 231);
    const finalObj_vaccines_administered = finalData_vaccines_administered.map(item => {
        let vaccines_administered = item[2];
        if (!vaccines_administered) {
            vaccines_administered = 0;
        } else if (vaccines_administered.includes(", 2022") || vaccines_administered.includes(", 2021") || vaccines_administered.includes(", 2020")) {
            let last_update = [];
            let last_update_vaccines_administered = [];
            last_update.push(vaccines_administered.substring(0, 12));
            last_update_vaccines_administered.push(vaccines_administered.substring(13));
            vaccines_administered = [last_update[0], last_update_vaccines_administered[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })


        const dataV = {
            country: item[0],
            vaccines_administered: vaccines_administered,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_vaccines_administered.map(item => {
        if (!item.iso) {
            finalObj_vaccines_administered.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const vaccines_administered_to_write = { 
        "vaccines_administered": finalObj_vaccines_administered,
        "recent_update": new Date()
    };
    fs.writeFile('../data/vaccines_administered.json', JSON.stringify(vaccines_administered_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'vaccines_administered');
    });

    const browser_people_fully_vaccinated = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page_people_fully_vaccinated = await browser_people_fully_vaccinated.newPage()
    await page_people_fully_vaccinated.goto(people_fully_vaccinated.URL, { waitUntil: 'networkidle2' });
    const options_people_fully_vaccinated = await page_people_fully_vaccinated.$$eval('table[class="data-table"] > tbody > tr > td', (options_people_fully_vaccinated) =>
        options_people_fully_vaccinated.map((option_people_fully_vaccinated) => option_people_fully_vaccinated.textContent)
    );
    await browser_people_fully_vaccinated.close();
    const finalData_people_fully_vaccinated = createGroups(options_people_fully_vaccinated, 231);
    const finalObj_people_fully_vaccinated = finalData_people_fully_vaccinated.map(item => {
        let people_fully_vaccinated = item[2];
        if (!people_fully_vaccinated) {
            people_fully_vaccinated = 0;
        } else if (people_fully_vaccinated.includes(", 2022") || people_fully_vaccinated.includes(", 2021") || people_fully_vaccinated.includes(", 2020")) {
            let last_update = [];
            let last_update_people_fully_vaccinated = [];
            last_update.push(people_fully_vaccinated.substring(0, 12));
            last_update_people_fully_vaccinated.push(people_fully_vaccinated.substring(13));
            people_fully_vaccinated = [last_update[0], last_update_people_fully_vaccinated[0]];
        }
        let iso;
        countryList.filter(country => {
            if (country.name === item[0]) {
                iso = country.iso;
            } else return;
        })


        const dataV = {
            country: item[0],
            people_fully_vaccinated: people_fully_vaccinated,
            iso: iso,
            date: date
        }
        return dataV
    })
    finalObj_people_fully_vaccinated.map(item => {
        if (!item.iso) {
            finalObj_people_fully_vaccinated.filter(country => {
                if (!country.country) return;
                if (country.country === item.country) {
                    let new_iso;
                    weirdIsoList.map(weirdIso => {
                        if (weirdIso.country == item.country) {
                            new_iso = weirdIso.iso;
                        } else return;
                    })
                    item.iso = new_iso;
                } else return;
            })
        }
    })
    const people_fully_vaccinated_to_write = { 
        "people_fully_vaccinated": finalObj_people_fully_vaccinated,
        "recent_update": new Date()
    };
    fs.writeFile('../data/people_fully_vaccinated.json', JSON.stringify(people_fully_vaccinated_to_write), (err) => {
        if (err) throw err;
        console.log('The file has been saved!', 'people_fully_vaccinated');
    });


    final.push({ "total_cases": finalObj_total_cases }, { "total_deaths": finalObj_total_deaths }, { "total_hospitalized": finalObj_current_hospitalized }, { "total_icu": finalObj_current_icu }, { "daily_cases": finalObj_cases }, { "daily_deaths": finalObj_deaths }, { "fatality_rate_7_day_avg": finalObj_death_rate_7 }, { "cumulative_fatality_rate": finalObj_cumulative_fatality_rate }, { "daily_tests": finalObj_new_tests }, { "vaccines_administered": finalObj_vaccines_administered }, { "fully_vaccinated_people": finalObj_people_fully_vaccinated });
    fs.writeFile('../data/data.json', JSON.stringify(final), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}


getData(_GET_DATE, _TOTAL_CASES, _TOTAL_DEATHS, _CURRENT_HOSPITALIZED, _CURRENT_ICU, _NEW_CASES, _NEW_DEATHS, _FATALITY_RATE_7_DAY_AVG, _CUMULATIVE_FATALITY_RATE, _NEW_TESTS, _VACCINES_ADMINISTERED, _PEOPLE_FULLY_VACCINATED);