const { faker, test } = require('./../support/env.js');

test.describe('Trello Create a Board', () => {
  test.use({ boardName: 'board' + faker.string.alphanumeric(6) });
  let boards, orgs;

  test.beforeEach(async ({ uiTrelloLoginSteps }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await uiTrelloLoginSteps;
  });

  test('Verify that member can create a new board via UI using "Create" button without having any workspace', async ({ userBoardsPage, boardName, boardPage }) => {
    await userBoardsPage.tapCreate();
    await userBoardsPage.buildBoardSection.tapCreateBoard();
    await userBoardsPage.buildBoardSection.putBoardTitle(boardName);
    await userBoardsPage.buildBoardSection.selectVisibility('Public');
    await userBoardsPage.buildBoardSection.tapYesMakePublic();
    await userBoardsPage.buildBoardSection.tapCreateBoardSubmit();
    await boardPage.verifyBoardNameVisible(boardName);
  });

  test.afterEach(async ({ context }) => {
    await context.close();
  });
});
