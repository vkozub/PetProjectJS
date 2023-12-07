const { faker } = require('./support/env.js');
const { test, expect } = require('./../pages/pageFixtures.js');

test('log in Trello', async ({ loginHomePage, loginPage, page }) => {
    await page.goto(process.env.UI_ENV);
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
    await expect(page).toHaveTitle(/Trello/);
  });