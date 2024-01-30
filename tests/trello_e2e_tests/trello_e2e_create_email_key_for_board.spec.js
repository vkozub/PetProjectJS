const { test } = require('../../support/env.js');
const { boardFunctions } = require('../../generators/functions/BoardFunctions.js');

let board;

test('Verify that email key can be generated for a board', async ({ boardsGenerator }) => {
    let options = boardFunctions({emailKey: true});
    board = await boardsGenerator.generateBoard(options);
});

test.afterEach(async ({ context, removeBoardStep, removeOrganizationStep }) => {
    await context.close();
    // remove the board
    await removeBoardStep(null, null, board?.id);
    // remove the organization
    await removeOrganizationStep(null, null, board?.idOrganization);
});
