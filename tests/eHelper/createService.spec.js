const { test, faker } = require('../../support/env.js');
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

  test('Verify that service can be created via UI', async ({}) => {
    await page.goto('/profile');

    // Create a new service
    const payload = { 
      userId: user.email,
      userName: user.userName,
      countPosts: 1,
      region: "Івано-Франківська область",
      city: "Івано-Франківськ",
      category: "Послуги масажу",
      service: "Надаю послугу",
      text: faker.lorem.sentence({ min: 6, max: 8 })
    };

    await page.locator('select.rounded-md').first().selectOption(payload.region);
    await page.locator('select.rounded-md').nth(1).selectOption(payload.city);
    await page.locator('select.rounded-md').nth(2).selectOption(payload.category);
    await page.locator('select.rounded-md').last().selectOption(payload.service);
    await page.locator('#areaId').fill(payload.text);
    await expect(page.getByRole('button', { name: 'Опублікувати' })).toBeEnabled();
    await page.getByRole('button', { name: 'Опублікувати' }).click();

    await expect(page.locator("div[class='flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl']")).toContainText(payload.text);
  });

  test('Verify that service can be created via API', async ({}, testInfo) => {
    // Create a new service
    const payload = { 
      userId: user.email,
      userName: user.userName,
      countPosts: 1,
      region: "Івано-Франківська область",
      city: "Івано-Франківськ",
      category: "Послуги масажу",
      service: "Надаю послугу",
      text: faker.lorem.sentence()
    };

    const response = await page.request.post(testInfo.project.use.config.baseUrl + '/api/users/post', {
        data: payload
    });

    await page.goto('/');
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Вітаємо, ' + user.userName + '.');
    await page.locator('select.rounded-md').first().selectOption(payload.region);
    await page.locator('select.rounded-md').nth(1).selectOption(payload.city);
    await page.locator('select.rounded-md').nth(2).selectOption(payload.category);
    await page.locator('select.rounded-md').last().selectOption(payload.service);
    await page.getByRole('button', { name: 'Пошук' }).click();

    await expect(page.locator("div[class='flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl']")).toContainText(payload.text);
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});
