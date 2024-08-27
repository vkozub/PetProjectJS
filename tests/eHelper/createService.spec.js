const { test } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');

test.describe('eHelper Create a service', () => {
  let user = {};
  let storageState = {};
  let page = {};

  test.beforeAll(async ({}, testInfo) => {
    const personFile = path.resolve(`.auth/person${testInfo.parallelIndex}.json`);
    user = JSON.parse(fs.readFileSync(personFile));
    const userFile = path.resolve(`.auth/user${testInfo.parallelIndex}.json`);
    storageState = JSON.parse(fs.readFileSync(userFile));

    console.error(`Test is "eHelper Create a service", index is: `, testInfo.parallelIndex);
  });

  test.beforeEach(async ({ browser }, testInfo) => {
    const context = await browser.newContext({ storageState, baseURL: testInfo.project.use.config.baseUrl });
    page = await context.newPage();
  });

  test.skip('Verify that service can be created via UI', async ({}) => {
    await page.goto('/profile');
  });

  test.skip('Verify that service can be created via API', async ({}) => {
    await page.goto('/');
    await expect(page.locator("p[class*='text-gray']")).toHaveText(aboutUsText);
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});
