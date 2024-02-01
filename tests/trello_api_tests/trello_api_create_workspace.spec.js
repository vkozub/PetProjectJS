const { faker, test } = require('../../support/env.js');
const { expect } = require('@playwright/test');

const workspaceName = 'workspace' + faker.string.alphanumeric(10);
let org;

test('API test: create a workspace', async ({ apiTestRequestContext }) => {
    const response = await apiTestRequestContext.post('organizations', {
        params: {
            displayName: workspaceName,
            key: process.env.TRELLO_API_KEY,
            token: process.env.TRELLO_API_TOKEN
        }
    });
    expect(response.ok()).toBeTruthy();
    org = await response.json();
    expect(org).toEqual(expect.objectContaining({ displayName: workspaceName }));
  });

test.afterEach(async ({ removeOrganizationStep, context }) => {
  await removeOrganizationStep(null, null, org?.id);
  await context.close();
});
  