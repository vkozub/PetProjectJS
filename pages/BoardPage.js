const BasePage = require('./BasePage.js');
const ApiAsserts = require('./../asserts/ApiAsserts.js');

module.exports = class BoardPage extends BasePage {
    constructor(page, expect) {
        super(page, expect);
        Object.assign(this, ApiAsserts);
    }

    get boardNameLabel() { return this.page.getByTestId('board-name-display'); }

    async verifyBoardNameUrl(boardNameExpected) { 
        this.expect(this.page.url()).toContain(boardNameExpected.toLowerCase());
    }

    async verifyBoardNameVisible(boardNameExpected) { await this.expect(this.boardNameLabel).toHaveText(boardNameExpected); }
}
