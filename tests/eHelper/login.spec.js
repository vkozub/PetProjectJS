const { test, faker } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');

test.describe('eHelper Login', () => {
  let user = {};
  let page = {};

  test.beforeAll(async ({}, testInfo) => {
    const personFile = path.resolve(`.auth/person${testInfo.parallelIndex}.json`);
    user = JSON.parse(fs.readFileSync(personFile));

    console.error(`Test is "eHelper Login", index is: `, testInfo.parallelIndex);
  });

  test.beforeEach(async ({ browser }, testInfo) => {
    const context = await browser.newContext({ baseURL: testInfo.project.use.config.baseUrl });
    page = await context.newPage();
    await page.goto('/');
    await page.getByText('Увійти').click();
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Verify user login', async ({}, testInfo) => {
    const loginBtn = page.getByRole('button', { name: 'Увійти' }).nth(1);
    await expect.soft(loginBtn).toBeDisabled();
    await page.getByPlaceholder('Електронна пошта').fill(user.email);
    await page.getByPlaceholder('Пароль').fill(user.password);
    
    await expect(loginBtn).toBeEnabled();
    await loginBtn.click();

    await expect.soft(page).toHaveURL(testInfo.project.use.config.baseUrl);
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Вітаємо, ' + user.userName + '.');
  });

  test('Verify user cannot login without email', async ({}) => {
    const loginBtn = page.getByRole('button', { name: 'Увійти' }).nth(1);
    await page.getByPlaceholder('Пароль').fill(user.password);
    
    await expect.soft(loginBtn).toBeDisabled();
    await loginBtn.click({ force: true });
    await expect(page).toHaveURL(/.*\/login/);
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Увійдіть...');
  });

  test('Verify user cannot login without password', async ({}) => {
    const loginBtn = page.getByRole('button', { name: 'Увійти' }).nth(1);
    await page.getByPlaceholder('Електронна пошта').fill(user.email);
    
    await expect.soft(loginBtn).toBeDisabled();
    await loginBtn.click({ force: true });
    await expect(page).toHaveURL(/.*\/login/);
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Увійдіть...');
  });

  test('Verify user cannot login with incorrect email', async ({}) => {
    const loginBtn = page.getByRole('button', { name: 'Увійти' }).nth(1);
    await page.getByPlaceholder('Електронна пошта').fill(faker.internet.email());
    await page.getByPlaceholder('Пароль').fill(user.password);
    
    await expect(loginBtn).toBeEnabled();
    await loginBtn.click();
    await expect.soft(page.locator("p[class*='text-xs']")).toHaveText('Дані введені некоректно. Спробуйте ще раз.');
    await expect.soft(loginBtn).toBeEnabled();
  });

  test('Verify user cannot login with incorrect password', async ({}) => {
    const loginBtn = page.getByRole('button', { name: 'Увійти' }).nth(1);
    await page.getByPlaceholder('Електронна пошта').fill(user.email);
    await page.getByPlaceholder('Пароль').fill(faker.internet.password({ length: 8 }));
    
    await expect(loginBtn).toBeEnabled();
    await loginBtn.click();
    await expect.soft(page.locator("p[class*='text-xs']")).toHaveText('Дані введені некоректно. Спробуйте ще раз.');
    await expect.soft(loginBtn).toBeEnabled();
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});