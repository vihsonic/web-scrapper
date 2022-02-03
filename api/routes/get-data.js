const express = require('express');
const router = express.Router();

const data = require('../../data/data.json');
const total_cases = require('../../data/total_cases.json');
const total_deaths = require('../../data/total_deaths.json');
const current_hospitalized = require('../../data/current_hospitalized.json');
const current_icu = require('../../data/current_icu.json');
const cases = require('../../data/cases.json');
const deaths = require('../../data/deaths.json');
const death_rate_7 = require('../../data/death_rate_7.json'); // BROKEN
const cumulative_fatality_rate = require('../../data/cumulative_fatality_rate.json');
const new_tests = require('../../data/new_tests.json'); // BROKEN
const vaccines_administered = require('../../data/vaccines_administered.json');
const people_fully_vaccinated = require('../../data/people_fully_vaccinated.json');

const default_response = {
    request: "GET",
    status: 200,
    message: "Success",
    urls: {
        all_data: "https://covid-data-and-api.herokuapp.com/get-data/data",
        total_cases: "https://covid-data-and-api.herokuapp.com/get-data/total_cases",
        total_deaths: "https://covid-data-and-api.herokuapp.com/get-data/total_deaths",
        current_hospitalized: "https://covid-data-and-api.herokuapp.com/get-data/current_hospitalized",
        current_icu: "https://covid-data-and-api.herokuapp.com/get-data/current_icu",
        daily_cases: "https://covid-data-and-api.herokuapp.com/get-data/cases",
        daily_deaths: "https://covid-data-and-api.herokuapp.com/get-data/deaths",
        death_rate_7: "https://covid-data-and-api.herokuapp.com/get-data/death_rate_7",
        cumulative_fatality_rate: "https://covid-data-and-api.herokuapp.com/get-data/cumulative_fatality_rate",
        new_tests: "https://covid-data-and-api.herokuapp.com/get-data/new_tests",
        vaccines_administered: "https://covid-data-and-api.herokuapp.com/get-data/vaccines_administered",
        people_fully_vaccinated: "https://covid-data-and-api.herokuapp.com/get-data/people_fully_vaccinated"
    },
    request_date: new Date().toLocaleString()
}

router.get('/', (req, res) => {
    res.send(default_response);
    console.log(req);
})



router.get('/data', (req, res) => {
    res.send(data)
});

router.get('/total_cases', (req, res) => {
    res.send(total_cases)
});

router.get('/total_deaths', (req, res) => {
    res.send(total_deaths)
});

router.get('/current_hospitalized', (req, res) => {
    res.send(current_hospitalized)
});

router.get('/current_icu', (req, res) => {
    res.send(current_icu)
});

router.get('/cases', (req, res) => {
    res.send(cases)
});

router.get('/deaths', (req, res) => {
    res.send(deaths)
});

router.get('/death_rate_7', (req, res) => {
    res.send(death_rate_7)
});

router.get('/cumulative_fatality_rate', (req, res) => {
    res.send(cumulative_fatality_rate)
});

router.get('/new_tests', (req, res) => {
    res.send(new_tests)
});

router.get('/vaccines_administered', (req, res) => {
    res.send(vaccines_administered)
});

router.get('/people_fully_vaccinated', (req, res) => {
    res.send(people_fully_vaccinated)
});

module.exports = router;