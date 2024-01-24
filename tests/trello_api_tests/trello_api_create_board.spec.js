const { faker, test } = require('../../support/env.js');
const { expect } = require('@playwright/test');

const boardName = 'board' + faker.string.alphanumeric(6);
let board;

test('API test: create a board', async ({ apiTestRequestContext }) => {
    const response = await apiTestRequestContext.post('boards/', {
        params: {
            name: boardName,
            key: process.env.TRELLO_API_KEY,
            token: process.env.TRELLO_API_TOKEN
        }
    });
    expect(response.ok()).toBeTruthy();
    board = await response.json();
    expect(board).toEqual(expect.objectContaining({ name: boardName }));
  });

test.afterEach(async ({ removeBoardStep, removeOrganizationStep, organizationsEndpoint, memberTrello, context }) => {
    // remove the board
    await removeBoardStep(null, null, board?.id);
    // remove the organization
    let orgs = await organizationsEndpoint.retrieveAllOrganizations(memberTrello.id);
    await removeOrganizationStep(orgs, memberTrello.defaultWorkspace);
    await context.close();
});
