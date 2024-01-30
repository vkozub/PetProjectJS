// console.log(process.env);
const { mergeTests } = require('@playwright/test');
const { test: endpointTest } = require('./../services/endpoints/endpointFixtures.js');
const { test: pageTest } = require('./../pages/pageFixtures.js');
const { test: stepDefinitionsTest } = require('./../stepDefinitions/stepDefinitionsFixtures.js');
const { test: generatorTest } = require('./../generators/generatorFixtures.js');
const test = mergeTests(endpointTest, pageTest, stepDefinitionsTest, generatorTest);
const { faker } = require('@faker-js/faker');
module.exports = { test, faker };
