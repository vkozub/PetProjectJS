// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
if (!process.env.CI) { require('dotenv/config') }

const STORAGE_API_STATE = path.join(__dirname, '.auth/api_user.json');
process.env.TRELLO_STORAGE_API_STATE_PATH = STORAGE_API_STATE;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ process.env.CI ? ['junit', { outputFile: 'test-results/results.xml' }] : ['html'] ],
  // reporter: [ process.env.CI ? ['allure-playwright'] : ['html'] ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://trello.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
    screen: { width: 1920, height: 1080 },
    isMobile: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'initial setup',
      testMatch: 'tests/initial_setup.js',
    },
    {
      name: 'api tests setup',
      testMatch: 'tests/api_tests_setup.js',
      teardown: 'api tests teardown'
    },
    {
      name: 'api tests teardown',
      testMatch: 'tests/api_tests_teardown.js',
    },
    {
      name: 'Trello Chromium e2e tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/trello_e2e_tests/**',
      dependencies: ['initial setup'],
    },
    {
      name: 'Evernote Chromium e2e tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: 'tests/evernote_e2e_tests/**'
    },
    {
      name: 'Trello API tests',
      use: {
        extraHTTPHeaders: { 'Accept': 'application/json' },
      },
      testMatch: 'tests/trello_api_tests/**',
      dependencies: ['api tests setup'],
    },
    {
      name: 'eHelper setup',
      testMatch: 'tests/eHelperSetup.js',
      use: { 
        ...devices['Desktop Chrome'],
        config: {
          baseUrl: 'https://e-pomich.com'
        }
      }
    },
    {
      name: 'eHelper WEB application',
      use: { 
        ...devices['Desktop Chrome'],
        config: {
          baseUrl: 'https://www.e-pomich.com'
        },
        // storageState: '.auth/user0.json'
       },
      testMatch: 'tests/eHelper/**',
      dependencies: ['eHelper setup'],
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

