const { test } = require('../../support/env.js');

test('Verify that member can do login with correct email and password', async ({ loginPageEvernote, homePageEvernote }) => {
    test.slow();
    await loginPageEvernote.visit();
    await loginPageEvernote.putUsername(process.env.EVERNOTE_USERNAME);
    await loginPageEvernote.tapContinue();
    await loginPageEvernote.putPassword(process.env.EVERNOTE_PASSWORD);
    await loginPageEvernote.tapSignIn();
    await homePageEvernote.verifyYourWorkspacesLabelVisible();
});

test.afterEach(async ({ context }) => {
    await context.close();
});
