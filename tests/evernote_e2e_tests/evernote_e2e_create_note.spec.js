const { test, faker } = require('../../support/env.js');

let note = faker.lorem.words();

test.describe('Create a note', () => {
  test.beforeEach(async ({ loginPageEvernote, homePageEvernote }) => {
    test.slow();
    await loginPageEvernote.visit();
    await loginPageEvernote.putUsername(process.env.EVERNOTE_USERNAME);
    await loginPageEvernote.tapContinue();
    await loginPageEvernote.putPassword(process.env.EVERNOTE_PASSWORD);
    await loginPageEvernote.tapSignIn();
    await homePageEvernote.verifyYourWorkspacesLabelVisible();
  });

  test('Verify that user can create a note', async ({ homePageEvernote, page }) => {
    await homePageEvernote.tapAddNewNote();
    await homePageEvernote.putNoteTitle(note);
    await homePageEvernote.tapHome();
    await homePageEvernote.verifyNoteTitleVisible(note);
  });

  test('Verify that user can open the created note', async ({ homePageEvernote }) => {
    await homePageEvernote.verifyNoteTitleVisible('Bob1');
    await homePageEvernote.tapNote('Bob1');
    await homePageEvernote.verifyEditorNoteTitleVisible('Bob1');
  });

  test.afterEach(async ({ homePageEvernote, loginPageEvernote, context }) => {
    await homePageEvernote.tapLogout();
    await loginPageEvernote.verifyLoginPageUrl();
    await context.close();
  });
});