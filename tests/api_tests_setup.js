const { test: setup } = require('../support/env.js');
const { expect } = require('@playwright/test');
const STORAGE_STATE = process.env.TRELLO_STORAGE_API_STATE_PATH;
const fs = require('fs');
const path = require('path');

setup('Trello api tests setup', async ({ request }) => {
    // login into api server and store the API context
    let response = await request.get('https://api.trello.com/1/search/members/', {
        params: {
            key: process.env.TRELLO_API_KEY,
            token: process.env.TRELLO_API_TOKEN,
            query: process.env.TRELLO_USERNAME
        },
        headers: { 'Accept': 'application/json' }
    });
    expect(response.ok()).toBeTruthy();

    // create a dir and file to store cookies
    const dirName = path.dirname(STORAGE_STATE)
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        fs.closeSync(fs.openSync(STORAGE_STATE, 'w'));
    }
    // storing cookies
    await request.storageState({ path: STORAGE_STATE });

    const resBody = await response.json();
    const memberTrello = resBody.shift();
    let workspaceName = memberTrello.fullName + "'s workspace";
    memberTrello.defaultWorkspace = workspaceName;
    process.env.TRELLO_MEMBER = JSON.stringify(memberTrello);
});
