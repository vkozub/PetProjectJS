const base = require('@playwright/test');
const BoardGenerator = require('./BoardGenerator.js');

exports.test = base.test.extend({
    boardsGenerator: async ({}, use) => {
        const boardsGenerator = new BoardGenerator();
        await use(boardsGenerator);
    }
});
