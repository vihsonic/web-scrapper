const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const data = require('./data/data.json');
const total_cases = require('./data/total_cases.json');
const total_deaths = require('./data/total_deaths.json');
const current_hospitalized = require('./data/current_hospitalized.json');
const current_icu = require('./data/current_icu.json');
const cases = require('./data/cases.json');
const deaths = require('./data/deaths.json');
const death_rate_7 = require('./data/death_rate_7.json');
const cumulative_death_rate = require('./data/cumulative_death_rate.json');
const new_tests = require('./data/new_tests.json');
const vaccines_administered = require('./data/vaccines_administered.json');
const people_fully_vaccinated = require('./data/people_fully_vaccinated.json');


app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost${port}`);
})

app.get('/data', (req, res) => {
    res.send(data)
});

app.get('/total_cases', (req, res) => {
    res.send(total_cases)
});

app.get('/total_deaths', (req, res) => {
    res.send(total_deaths)
});

app.get('/current_hospitalized', (req, res) => {
    res.send(current_hospitalized)
});

app.get('/current_icu', (req, res) => {
    res.send(current_icu)
});

app.get('/cases', (req, res) => {
    res.send(cases)
});

app.get('/deaths', (req, res) => {
    res.send(deaths)
});

app.get('/death_rate_7', (req, res) => {
    res.send(death_rate_7)
});

app.get('/cumulative_death_rate', (req, res) => {
    res.send(cumulative_death_rate)
});

app.get('/new_tests', (req, res) => {
    res.send(new_tests)
});

app.get('/vaccines_administered', (req, res) => {
    res.send(vaccines_administered)
});

app.get('/people_fully_vaccinated', (req, res) => {
    res.send(people_fully_vaccinated)
});