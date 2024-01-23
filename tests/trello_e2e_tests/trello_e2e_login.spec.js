const { test } = require('../../support/env.js');

test.describe('Trello login', () => {
  test.beforeEach(async ({ loginHomePage, loginPage }) => {
    await loginHomePage.visit();
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
  });

  test('Verify that member can do login', async ({ userBoardsPage }) => {
    await test.step('Verify that NavBar is visible', async () => {
      await userBoardsPage.verifyNavBarVisible();
    });
    await test.step('Verify that WorkSpace label is visible', async () => {
      await userBoardsPage.verifyYourWorkspacesLabelVisible();
    });
  });

  test.afterEach(async ({ context }) => {
    await context.close();
  });
});
