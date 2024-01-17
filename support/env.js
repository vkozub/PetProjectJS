if (!process.env.CI) { require('dotenv/config') };

console.log(process.env);
const { mergeTests } = require('@playwright/test');
const { test: endpointTest } = require('./../services/endpoints/endpointFixtures.js');
const { test: pageTest } = require('./../pages/pageFixtures.js');
const { test: stepDefinitionsTest } = require('./../stepDefinitions/stepDefinitionsFixtures.js');
const test = mergeTests(endpointTest, pageTest, stepDefinitionsTest);
const { faker } = require('@faker-js/faker');
module.exports = { test, faker };
