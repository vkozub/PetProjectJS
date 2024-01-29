const { test: setup } = require('../support/env.js');
const { expect } = require('@playwright/test');
const STORAGE_API_STATE = process.env.TRELLO_STORAGE_API_STATE_PATH;
const fs = require('fs');
const path = require('path');

setup('Trello api tests setup', async ({ request }) => {
    // login into api server and store the API context
    console.log(process.env.TRELLO_API_KEY);
    console.log(process.env.TRELLO_API_TOKEN);
    console.log(process.env.TRELLO_USERNAME);

let st = JSON.stringify({
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_API_TOKEN,
    query: process.env.TRELLO_USERNAME
});
console.log(st);

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
    const dirName = path.dirname(STORAGE_API_STATE)
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        fs.closeSync(fs.openSync(STORAGE_API_STATE, 'w'));
    }
    // storing cookies for APIRequestContext
    await request.storageState({ path: STORAGE_API_STATE });

    const resBody = await response.json();
    const memberTrello = resBody.shift();
    let workspaceName = memberTrello.fullName + "'s workspace";
    memberTrello.defaultWorkspace = workspaceName;
    process.env.TRELLO_MEMBER = JSON.stringify(memberTrello);
});
