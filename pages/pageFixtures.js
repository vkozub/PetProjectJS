const base = require('@playwright/test');
const LoginHomePage = require('./LoginHomePage.js');
const LoginPage = require('./LoginPage.js');
const LoginPageEvernote = require('./LoginPageEvernote.js');
const HomePageEvernote = require('./HomePageEvernote.js');
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

    loginPageEvernote: async ({ page }, use) => {
        const loginPage = new LoginPageEvernote(page, expect);
        await use(loginPage);
    },

    homePageEvernote: async ({ page }, use) => {
        const homePage = new HomePageEvernote(page, expect);
        await use(homePage);
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
