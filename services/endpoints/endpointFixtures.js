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
});
