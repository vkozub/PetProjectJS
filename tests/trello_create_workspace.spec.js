const { faker, test } = require('./../support/env.js');

test.describe('Trello Create Workspace', () => {
  const workspaceName = faker.string.alphanumeric(10);
  let orgs;

  test.beforeEach(async ({ uiTrelloLoginSteps }) => {
     await uiTrelloLoginSteps;
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

  test.afterEach(async ({ context, removeOrganizationStep }) => {
    await context.close();
    await removeOrganizationStep(orgs, workspaceName);
  });
});
