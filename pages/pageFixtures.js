const base = require('@playwright/test');
const { LoginHomePage } = require('./LoginHomePage');
const { LoginPage } = require('./LoginPage');

exports.test = base.test.extend({
    loginHomePage: async ({ page }, use) => {
        const loginHomePage = new LoginHomePage();
        await use(loginHomePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage();
        await use(loginPage);
    },
});

exports.expect = base.expect;