const base = require('@playwright/test');
const LoginHomePage = require('./LoginHomePage.js');
const LoginPage = require('./LoginPage.js');
const UserBoardsPage = require('./UserBoardsPage.js');
const BoardPage = require('./BoardPage.js');
const expect = base.expect;

exports.test = base.test.extend({
    loginHomePage: async ({ page }, use) => {
        const loginHomePage = new LoginHomePage(page);
        await use(loginHomePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    userBoardsPage: async ({ page }, use) => {
        const userBoardsPage = new UserBoardsPage(page, expect);
        await use(userBoardsPage);
    },

    boardPage: async ({ page }, use) => {
        const boardPage = new BoardPage(page, expect);
        await use(boardPage);
    },
});
