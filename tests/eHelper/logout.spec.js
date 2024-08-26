const { test } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');

test.describe('eHelper login', () => {
  let user = {};
  let storageState = {};
  let page = {};

  test.beforeAll(async ({}, testInfo) => {
    const personFile = path.resolve(`.auth/person${testInfo.parallelIndex}.json`);
    user = JSON.parse(fs.readFileSync(personFile));
    const userFile = path.resolve(`.auth/user${testInfo.parallelIndex}.json`);
    storageState = JSON.parse(fs.readFileSync(userFile));

    console.error(`Test is "eHelper login", index is: `, testInfo.parallelIndex);
  });

  test.beforeEach(async ({ browser }, testInfo) => {
    const context = await browser.newContext({ storageState });
    page = await context.newPage();
    await page.goto(testInfo.project.use.config.baseUrl);
  });

  test('Verify that member can do logout', async ({}) => {
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Вітаємо, ' + user.userName + '.');
    await page.getByText('Вийти').click();
    await expect.soft(page).toHaveURL(/.*\/login/);
    await expect.soft(page.locator("p[class*='text-sm']")).toHaveText('Увійдіть...');
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});
