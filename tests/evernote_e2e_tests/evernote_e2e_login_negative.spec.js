const { test, faker } = require('../../support/env.js');

test.describe('Evernote unsuccessfull login', () => {
  test.beforeEach(async ({ loginPageEvernote }) => {
    await loginPageEvernote.visit();
  });

  test('Verify that member cannot do login with incorrect email', async ({ loginPageEvernote }) => {
    await loginPageEvernote.putUsername(faker.internet.email());
    await loginPageEvernote.tapContinue();
    await loginPageEvernote.verifyIncorrectEmailMessage();
  });

  test('Verify that member cannot do login with incorrect password', async ({ loginPageEvernote }) => {
    await loginPageEvernote.putUsername(process.env.EVERNOTE_USERNAME);
    await loginPageEvernote.tapContinue();
    await loginPageEvernote.putPassword(faker.internet.password());
    await loginPageEvernote.tapSignIn();
    await loginPageEvernote.verifyIncorrectPasswordMessage();
  });

  test.afterEach(async ({ context }) => {
    await context.close();
  });
});