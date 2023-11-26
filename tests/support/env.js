// import 'dotenv/config'
require('dotenv/config')

process.env.UI_ENV = `https://${process.env.NAMESPACE}.${process.env.CLUSTER}/`;
console.log(process.env);
// const { test, expect } = require('@playwright/test');
// export const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
// export const { faker: FakerObject } = require('@faker-js/faker');
// module.exports = { test, expect, faker };
module.exports = { faker };
