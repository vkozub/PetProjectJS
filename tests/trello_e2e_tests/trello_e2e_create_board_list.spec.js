const { test } = require('../../support/env.js');
const { boardFunctions } = require('../../generators/functions/BoardFunctions.js');

let board;

test('Verify that list can be generated for a board via BE', async ({ boardsGenerator, uiTrelloLoginSteps, boardPage, userBoardsPage }) => {
    let options = boardFunctions({list: true});
    board = await boardsGenerator.generateBoard(options);
    await uiTrelloLoginSteps;
    await userBoardsPage.tapBoard(board.name);
    await boardPage.verifyListNameVisible(board.list.name);
});

test.afterEach(async ({ context, removeBoardStep, removeOrganizationStep }) => {
    await context.close();
    // remove the board
    await removeBoardStep(null, null, board?.id);
    // remove the organization
    await removeOrganizationStep(null, null, board?.idOrganization);
});
