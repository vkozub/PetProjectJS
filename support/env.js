require('dotenv/config')

process.env.UI_ENV = `https://${process.env.NAMESPACE}.${process.env.CLUSTER}/`;
console.log(process.env);
const { mergeTests } = require('@playwright/test');
const { test: endpointTest } = require('./../services/endpoints/endpointFixtures.js');
const { test: pageTest } = require('./../pages/pageFixtures.js');
const test = mergeTests(endpointTest, pageTest);
const { faker } = require('@faker-js/faker');
module.exports = { test, faker };
