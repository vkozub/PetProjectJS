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
        await use(async (organizations, workspaceName, id = null) => {
            if (id) {
                await organizationsEndpoint.deleteOrganization(id);
            } else {
                const organization = await userBoardsPage.retrieveOrganization(organizations, workspaceName);
                await organizationsEndpoint.deleteOrganization(organization.id);
            };
        });
    },

    // remove the board from the BE via API
    removeBoardStep: async ({ boardPage, boardsEndpoint }, use) => {
        await use(async (boards, boardName) => {
            const board = await boardPage.retrieveBoard(boards, boardName);
            await boardsEndpoint.deleteBoard(board.id);
        });
    }
});
