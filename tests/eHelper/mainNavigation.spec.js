const { test } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');

test.describe('eHelper Main Navigation', () => {
  let user = {};
  let storageState = {};
  let page = {};

  test.beforeAll(async ({}, testInfo) => {
    const personFile = path.resolve(`.auth/person${testInfo.parallelIndex}.json`);
    user = JSON.parse(fs.readFileSync(personFile));
    const userFile = path.resolve(`.auth/user${testInfo.parallelIndex}.json`);
    storageState = JSON.parse(fs.readFileSync(userFile));

    console.error(`Test is "eHelper Main Navigation", index is: `, testInfo.parallelIndex);
  });

  test.beforeEach(async ({ browser }, testInfo) => {
    const context = await browser.newContext({ storageState, baseURL: testInfo.project.use.config.baseUrl });
    page = await context.newPage();
    await page.goto('/');
  });

  test('Verify presence of main navigation buttons', async ({}) => {
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Вітаємо, ' + user.userName + '.');
    await expect.soft(page.getByText('Вийти')).toBeVisible();
    await expect.soft(page.getByText('Надати послугу')).toBeVisible();
    await expect.soft(page.getByText('Головна')).toBeVisible();
  });

  test('Verify "Надати послугу" button', async ({}) => {
    await page.getByText('Надати послугу').click();
    await expect.soft(page).toHaveURL(/.*\/profile/);
  });

  test('Verify "Головна" button', async ({}, testInfo) => {
    await page.goto('/profile');
    await page.getByText('Головна').click();
    await expect.soft(page).toHaveURL(testInfo.project.use.config.baseUrl);
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});