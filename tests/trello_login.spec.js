const { faker } = require('./support/env.js');
const { test, expect } = require('./../pages/pageFixtures.js');

test('Verify that member can do login', async ({ loginHomePage, loginPage, page }) => {
    await loginHomePage.visit();
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
    await expect(page).toHaveTitle(/Trello/);
  });
  