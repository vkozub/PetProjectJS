const BaseSection = require('./BaseSection.js');

module.exports = class BuildBoardSection extends BaseSection {
    constructor(page) {
        super(page);
    }

    get createBoardButton() { return this.page.getByTestId("header-create-board-button"); }
    get boardTitleInput() { return this.page.getByTestId("create-board-title-input"); }
    get visibilityDropdown() { return this.page.locator("xpath=//div[contains(@id, 'create-board-select-visibility')]"); }
    get createBoardSubmitButton() { return this.page.getByTestId('create-board-submit-button'); }
    get yesMakePublicButton() { return this.page.getByRole('button', { name: 'Yes, make board public', exact: true }); }

    async putBoardTitle(title) { await this.boardTitleInput.fill(title); }
    async tapCreateBoard() { await this.createBoardButton.click(); }
    async tapCreateBoardSubmit() { await this.createBoardSubmitButton.click(); }
    async tapYesMakePublic() { await this.yesMakePublicButton.click(); }
    async selectVisibility(option) { 
        await this.visibilityDropdown.click();
        await this.page.getByText(option).click();
    }
}
