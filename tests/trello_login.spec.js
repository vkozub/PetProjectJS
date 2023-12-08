const { faker } = require('./support/env.js');
const { test } = require('./../pages/pageFixtures.js');

test('Verify that member can do login', async ({ loginHomePage, loginPage, userBoardsPage }) => {
    await loginHomePage.visit();
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
    await userBoardsPage.verifyNavBarVisible();
    await userBoardsPage.verifyYourWorkspacesLabelVisible();
  });
