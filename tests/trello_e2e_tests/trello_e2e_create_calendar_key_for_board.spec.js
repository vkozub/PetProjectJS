const { test } = require('../../support/env.js');
const BoardGenerator = require('./../../generators/BoardGenerator.js');
const { boardFunctions } = require('./../../generators/functions/BoardFunctions.js');

let board;

test('Verify that calendar key can be created for a board', async ({  }) => {
    let options = boardFunctions({calendarKey: true});
    board = new BoardGenerator.generateBoard(options);
    
});

test.afterEach(async ({ context, removeBoardStep, organizationsEndpoint, removeOrganizationStep, memberTrello }) => {
    await context.close();
    // remove the board
    await removeBoardStep(null, null, board?.id);
    // remove the organization
    let orgs = await organizationsEndpoint.retrieveAllOrganizations(memberTrello.id);
    await removeOrganizationStep(orgs, memberTrello.defaultWorkspace);
});
