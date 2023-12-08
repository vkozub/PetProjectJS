const { faker } = require('./support/env.js');
const { test } = require('./../pages/pageFixtures.js');

test.describe('trello login', () => {
  test.beforeEach(async ({ loginHomePage, loginPage }) => {
    await loginHomePage.visit();
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
  });

  test('Verify that member can do login', async ({ userBoardsPage }) => {
    await userBoardsPage.verifyNavBarVisible();
    await userBoardsPage.verifyYourWorkspacesLabelVisible();
  });

  test.afterEach(async ({ context }) => {
    await context.close();
  });
});
