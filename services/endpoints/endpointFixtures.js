const base = require('@playwright/test');
const OrganizationsEndpoint = require('./OrganizationsEndpoint.js');

exports.test = base.test.extend({
    organizationsEndpoint: async ({}, use) => {
        const organizationsEndpoint = new OrganizationsEndpoint();
        await use(organizationsEndpoint);
    }
});
