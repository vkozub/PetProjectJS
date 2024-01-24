const base = require('@playwright/test');
const OrganizationsEndpoint = require('./OrganizationsEndpoint.js');
const BoardsEndpoint = require('./BoardsEndpoint.js');
const MembersEndpoint = require('./MembersEndpoint.js');

exports.test = base.test.extend({
    organizationsEndpoint: async ({}, use) => {
        const organizationsEndpoint = new OrganizationsEndpoint();
        await use(organizationsEndpoint);
    },

    boardsEndpoint: async ({}, use) => {
        const boardsEndpoint = new BoardsEndpoint();
        await use(boardsEndpoint);
    },

    membersEndpoint: async ({}, use) => {
        const membersEndpoint = new MembersEndpoint();
        await use(membersEndpoint);
    },

    apiTestRequestContext: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({
            baseURL: 'https://api.trello.com/1/',
            extraHTTPHeaders: { 'Accept': 'application/json' },
            storageState: process.env.TRELLO_STORAGE_API_STATE_PATH,
            timeout: 5000
        });
        await use(apiContext);
        // Dispose all responses.
        await apiContext.dispose();
    }
});
