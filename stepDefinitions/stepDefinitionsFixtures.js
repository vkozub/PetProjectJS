const base = require('@playwright/test');

exports.test = base.test.extend({
    uiTrelloLoginSteps: async ( { loginHomePage, loginPage }, use ) => {
        await loginHomePage.visit();
        await loginHomePage.tapLogIn();
        await loginPage.putUsername(process.env.TRELLO_USERNAME);
        await loginPage.tapContinue();
        await loginPage.putPassword(process.env.TRELLO_PASSWORD);
        await loginPage.tapLogIn();
        await use();
    },

    // remove the organization from the BE via API
    removeOrganizationStep: async ({ userBoardsPage, organizationsEndpoint }, use) => {
        await use(async (organizations, workspaceName) => {
            const organization = await userBoardsPage.retrieveOrganization(organizations, workspaceName);
            await organizationsEndpoint.deleteOrganization(organization.id);
        });
    }
});
