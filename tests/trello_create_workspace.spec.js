const { faker, test } = require('./../support/env.js');
const { orgPayload } = require('./../services/payloadFactories/OrganizationPayload.js');

test.describe('Trello Create Workspace', () => {
  test.use({ workspaceName: faker.string.alphanumeric(10) });
  let orgs;

  test.beforeEach(async ({ uiTrelloLoginSteps }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await uiTrelloLoginSteps;
  });

  test('Verify that member can create a new workspace via UI using "Create a Workspace" button', async ({ userBoardsPage, organizationsEndpoint, workspaceName }) => {
    await userBoardsPage.tapHomeNavCreateWorkspace();
    await userBoardsPage.buildWorkspaceSection.putWorkspaceName(workspaceName);
    await userBoardsPage.buildWorkspaceSection.selectWorkspaceType('Engineering-IT');
    await userBoardsPage.buildWorkspaceSection.tapContinue();
    await userBoardsPage.verifyHomeTeamWorkspaceNameVisible(workspaceName);
    orgs = await organizationsEndpoint.retrieveAllOrganizations(organizationsEndpoint.MEMBER_ID);
    await userBoardsPage.verifyWorkspaceNameData(orgs, workspaceName);
  });

  test('Verify that member can create a new workspace via BE', async ({ userBoardsPage, organizationsEndpoint, page }) => {
    await organizationsEndpoint.createOrganization(orgPayload);
    await page.reload();
    await userBoardsPage.verifyHomeTeamWorkspaceNameVisible(orgPayload.displayName);
  });

  test.afterEach(async ({ context, removeOrganizationStep, workspaceName }) => {
    await context.close();
    await removeOrganizationStep(orgs, workspaceName, orgPayload.id);
  });
});
