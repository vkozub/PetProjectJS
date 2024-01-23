const { faker, test } = require('../../support/env.js');
const { expect } = require('@playwright/test');

test('API test: create a workspace', async ({ request }) => {
    const workspaceName = 'workspace' + faker.string.alphanumeric(10);
    const response = await request.post('https://api.trello.com/1/organizations', {
        params: {
            displayName: workspaceName
        }
    });
    expect(response.ok()).toBeTruthy();
  });