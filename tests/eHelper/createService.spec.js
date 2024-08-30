const { test, faker } = require('../../support/env.js');
const base = require('@playwright/test');
const expect = base.expect;
const fs = require("fs");
const path = require('node:path');
const { PostBuilder } = require('../../generators/eHelperBuilders/postBuilder.js');

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

  test('Verify that service can be created via UI', async ({}, testInfo) => {
    await page.goto('/profile');

    const postBuilder = new PostBuilder(page, testInfo);
    const postParams = postBuilder.getPostParams();

    await page.locator('select.rounded-md').first().selectOption(postParams.region);
    await page.locator('select.rounded-md').nth(1).selectOption(postParams.city);
    await page.locator('select.rounded-md').nth(2).selectOption(postParams.category);
    await page.locator('select.rounded-md').last().selectOption(postParams.service);
    await page.locator('#areaId').fill(postParams.text);
    await expect(page.getByRole('button', { name: 'Опублікувати' })).toBeEnabled();
    await page.getByRole('button', { name: 'Опублікувати' }).click();
    // Verify existing of the post on UI
    await expect(page.locator("div[class='flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl']")).toContainText(postParams.text);

    // Verify existing of the post in DB
    const getPostsresponse = await page.request.post(testInfo.project.use.config.baseUrl + '/api/users/getposts', {
      data: postBuilder.getSearchParams()
    });

    const responseJson = await getPostsresponse.json();
    const posts = responseJson?.data;
    const post = posts.find(post => post?.text === postParams.text);
    expect(post).toBeTruthy();
  });

  test('Verify that service can be created via API', async ({}, testInfo) => {
    // Create a new service
    const postBuilder = new PostBuilder(page, testInfo);
    const post = postBuilder.build();
    const postParams = await post.generatePost(user);

    await page.goto('/');
    await expect.soft(page.locator("p[class*='text-sm']")).toContainText('Вітаємо, ' + user.userName + '.');
    await page.locator('select.rounded-md').first().selectOption(postParams.region);
    await page.locator('select.rounded-md').nth(1).selectOption(postParams.city);
    await page.locator('select.rounded-md').nth(2).selectOption(postParams.category);
    await page.locator('select.rounded-md').last().selectOption(postParams.service);
    await page.getByRole('button', { name: 'Пошук' }).click();

    await expect(page.locator("div[class='flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl']")).toContainText(postParams.text);
  });

  test.afterEach(async ({}) => {
    await page.close();
  });
});
