const { test } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');

test.describe('eHelper About Us page', () => {
  let user = {};
  let storageState = {};
  let page = {};

  test.beforeAll(async ({}, testInfo) => {
    const personFile = path.resolve(`.auth/person${testInfo.parallelIndex}.json`);
    user = JSON.parse(fs.readFileSync(personFile));
    const userFile = path.resolve(`.auth/user${testInfo.parallelIndex}.json`);
    storageState = JSON.parse(fs.readFileSync(userFile));

    console.error(`Test is "eHelper About Us page", index is: `, testInfo.parallelIndex);
  });

  test.beforeEach(async ({ browser }, testInfo) => {
    const context = await browser.newContext({ storageState, baseURL: testInfo.project.use.config.baseUrl });
    page = await context.newPage();
    await page.goto('/about');
  });

  test('Verify text on "Про нас" page', async ({}) => {
    const aboutUsText = 'ЄПомічник - це сервіс, який легко допомагає користувачу знайти послугу, яку він потребує. Це можуть бути різні послуги по дому, переміщенню вантажів, ремонту помешкання, обслуговуванню побутової техніки, обслуговуванню котлів як газових, так і електричних, вигулу та перетримці домашніх улюбленців, та багато інших. Необхідну послугу Ви зможете знайти без реєстрації на сайті. Щоб створити своє оголошення, необхідно спочатку зареєструватися. Після входу Ви матимете можливість створити та опублікувати своє власне оголошення. Це може бути оголошення з категорії надаю послугу або пропоную роботу. Ви зможете створити не більше трьох оголошень. Все це безкоштовно.';
    await expect(page.locator("p[class*='text-gray']")).toHaveText(aboutUsText);
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});