// import { test, expect, FakerObject } from './support/env.js'
const { test, expect, faker } = require('./support/env.js');
// import { faker } from '@faker-js/faker';

test('has title 2', async ({ page }) => {
    await page.goto(process.env.UI_ENV);
  console.log(faker.internet.email());
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
