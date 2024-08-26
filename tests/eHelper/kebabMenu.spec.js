const { test } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');

test.describe('eHelper Kebab Menu', () => {
  let user = {};
  let storageState = {};
  let page = {};

  test.beforeAll(async ({}, testInfo) => {
    const personFile = path.resolve(`.auth/person${testInfo.parallelIndex}.json`);
    user = JSON.parse(fs.readFileSync(personFile));
    const userFile = path.resolve(`.auth/user${testInfo.parallelIndex}.json`);
    storageState = JSON.parse(fs.readFileSync(userFile));

    console.error(`Test is "eHelper Kebab Menu", index is: `, testInfo.parallelIndex);
  });

  test.beforeEach(async ({ browser }, testInfo) => {
    const context = await browser.newContext({ storageState, baseURL: testInfo.project.use.config.baseUrl });
    page = await context.newPage();
    await page.goto('/');
  });

  test('Verify that kebab menu button list', async ({}) => {
    await page.locator('button#dropdownRightEndButton').click();
    await expect.soft(page.locator('div#dropdownRightEnd').locator('a[href="/userposts"]')).toHaveText('Мої оголошення');
    await expect.soft(page.locator('div#dropdownRightEnd').locator('a[href="/about"]')).toHaveText('Про нас');
    await page.locator('button#dropdownRightEndButton').click();
    await expect.soft(page.locator('div#dropdownRightEnd').getByText('Мої оголошення')).not.toBeVisible();
    await expect.soft(page.locator('div#dropdownRightEnd').getByText('Про нас')).not.toBeVisible();
  });

  test('Verify that kebab menu button "Мої оголошення"', async ({}) => {
    await page.locator('button#dropdownRightEndButton').click();
    await page.locator('div#dropdownRightEnd').getByText('Мої оголошення').click();
    await expect.soft(page).toHaveURL(/.*\/userposts/);
  });

  test('Verify that kebab menu button "Про нас"', async ({}) => {
    await page.locator('button#dropdownRightEndButton').click();
    await page.locator('div#dropdownRightEnd').getByText('Про нас').click();
    await expect.soft(page).toHaveURL(/.*\/about/);
  });

  test('Verify text on "Про нас" page', async ({}) => {
    await page.locator('button#dropdownRightEndButton').click();
    await page.locator('div#dropdownRightEnd').getByText('Про нас').click();
    await expect.soft(page).toHaveURL(/.*\/about/);
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});