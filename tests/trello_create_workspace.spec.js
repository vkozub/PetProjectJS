const { faker, test } = require('./../support/env.js');

test.describe('Trello Create Workspace', () => {
  const workspaceName = faker.string.alphanumeric(10);
  let orgs;

  test.beforeEach(async ({ loginHomePage, loginPage }) => {
    await loginHomePage.visit();
    await loginHomePage.tapLogIn();
    await loginPage.putUsername(process.env.TRELLO_USERNAME);
    await loginPage.tapContinue();
    await loginPage.putPassword(process.env.TRELLO_PASSWORD);
    await loginPage.tapLogIn();
  });

  test('Verify that member can create a new workspace via UI using "Create a Workspace" button', async ({ userBoardsPage, organizationsEndpoint }) => {
    await userBoardsPage.tapHomeNavCreateWorkspace();
    await userBoardsPage.buildWorkspaceSection.putWorkspaceName(workspaceName);
    await userBoardsPage.buildWorkspaceSection.selectWorkspaceType('Engineering-IT');
    await userBoardsPage.buildWorkspaceSection.tapContinue();
    await userBoardsPage.verifyHomeTeamWorkspaceNameVisible(workspaceName);
    orgs = await organizationsEndpoint.retrieveAllOrganizations(organizationsEndpoint.MEMBER_ID);
    await userBoardsPage.verifyWorkspaceNameData(orgs, workspaceName);
  });

  test.afterEach(async ({ context, userBoardsPage, organizationsEndpoint }) => {
    await context.close();
    // remove the organization from the BE via API
    const organization = await userBoardsPage.retrieveOrganization(orgs, workspaceName);
    await organizationsEndpoint.deleteOrganization(organization.id);
  });
});