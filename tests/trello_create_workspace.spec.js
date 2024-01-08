const { faker } = require('./support/env.js');
const { test } = require('./../pages/pageFixtures.js');
const OrganizationsEndpoint = require('./../services/endpoints/OrganizationsEndpoint');

test.describe('Trello Create Workspace', () => {
  test.beforeEach(async ({ loginHomePage, loginPage }) => {
    await loginHomePage.visit();
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
  });

  test('Verify that member can create a new workspace via UI using "Create a Workspace" button', async ({ userBoardsPage }) => {
    await userBoardsPage.tapHomeNavCreateWorkspace();
    const workspaceName = faker.string.alphanumeric(10);
    await userBoardsPage.buildWorkspaceSection.putWorkspaceName(workspaceName);
    await userBoardsPage.buildWorkspaceSection.selectWorkspaceType('Engineering-IT');
    await userBoardsPage.buildWorkspaceSection.tapContinue();
    await userBoardsPage.verifyHomeTeamWorkspaceNameVisible(workspaceName);

    let orgEnd = new OrganizationsEndpoint();
    let orgs = await orgEnd.retrieveAllOrganizations(orgEnd.MEMBER_ID);
    await userBoardsPage.verifyWorkspaceNameData(orgs, workspaceName);
  });

  test.afterEach(async ({ context, userBoardsPage }) => {
    await context.close();
    const organization = await userBoardsPage.retrieveOrganization(orgs, workspaceName);
    await orgEnd.deleteOrganization(organization.id);
  });
});