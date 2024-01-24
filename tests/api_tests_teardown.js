const { test: teardown } = require('../support/env.js');
const { expect } = require('@playwright/test');
const STORAGE_API_STATE = process.env.TRELLO_STORAGE_API_STATE_PATH;
const fs = require('fs');
const path = require('path');

teardown('Trello api tests teardown', async ({}) => {
    // remove a dir and file to store cookies
    const dirName = path.dirname(STORAGE_API_STATE)
    if (fs.existsSync(dirName)) {
        fs.rmSync(dirName, { recursive: true } );
    }
});
