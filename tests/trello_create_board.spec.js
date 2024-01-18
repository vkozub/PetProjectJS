const { faker, test } = require('./../support/env.js');
const { boardPayload } = require('./../services/payloadFactories/BoardPayload.js');

test.describe('Trello Create a Board', () => {
  test.use({ boardName: 'board' + faker.string.alphanumeric(6) });
  let boards, board, member, workspaceName;

  test.beforeAll(async ({ membersEndpoint }) => {
    member = await membersEndpoint.retrieveMember();
    workspaceName = member.fullName + "'s workspace";
  });

  test.beforeEach(async ({ uiTrelloLoginSteps }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await uiTrelloLoginSteps;
  });

  test('Verify that member can create a new board via UI using "Create" button without having any workspace', async ({ userBoardsPage, boardName, boardPage, boardsEndpoint }) => {
    await userBoardsPage.tapCreate();
    await userBoardsPage.buildBoardSection.tapCreateBoard();
    await userBoardsPage.buildBoardSection.putBoardTitle(boardName);
    await userBoardsPage.buildBoardSection.selectVisibility('Public');
    await userBoardsPage.buildBoardSection.tapYesMakePublic();
    await userBoardsPage.buildBoardSection.tapCreateBoardSubmit();
    await boardPage.verifyBoardNameVisible(boardName);
    boards = await boardsEndpoint.retrieveAllBoards(boardsEndpoint.MEMBER_ID);
    await boardPage.verifyBoardNameData(boards, boardName);
  });

  test('Verify that member can create a new board via BE without having any workspace', async ({ userBoardsPage, boardsEndpoint }) => {
    board = boardPayload();
    await boardsEndpoint.createBoard(board);
    await userBoardsPage.verifyHomeTeamBoardNameVisible(board.name);
  });

  test.afterEach(async ({ context, removeBoardStep, boardName, organizationsEndpoint, removeOrganizationStep }) => {
    await context.close();
    // remove the board
    await removeBoardStep(boards, boardName, board?.id);
    // remove the organization
    let orgs = await organizationsEndpoint.retrieveAllOrganizations(organizationsEndpoint.MEMBER_ID);
    await removeOrganizationStep(orgs, workspaceName);
  });
});
