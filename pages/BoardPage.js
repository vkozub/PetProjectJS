const BasePage = require('./BasePage.js');

module.exports = class BoardPage extends BasePage {
    constructor(page, expect) {
        super(page, expect);
    }

    get boardNameLabel() { return this.page.getByTestId('board-name-display'); }

    async verifyBoardNameUrl(boardNameExpected) { 
        this.expect(this.page.url()).toContain(boardNameExpected.toLowerCase());
    }

    async verifyBoardNameVisible(boardNameExpected) { await this.expect(this.boardNameLabel).toHaveText(boardNameExpected); }
    async verifyBoardNameData(boards, boardExpected) { 
        const boardActual = this.retrieveBoard(boards, boardExpected);
        this.expect(boardActual).toBeTruthy();
        this.expect(boardActual.closed).toBeFalsy();
        this.expect(boardActual.name).toContain(boardExpected);
    }
}
