const { faker } = require('./support/env.js');
const { test, expect } = require('./pages/pageFixtures.js');

test('log in Trello', async ({ loginHomePage, loginPage, page }) => {
    await page.goto(process.env.UI_ENV);
    await loginHomePage.tapLogIn();
    await loginPage.putUsername('username');
    await loginPage.putPassword('password');
    await loginPage.tapLogIn();
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Trello/);
  });