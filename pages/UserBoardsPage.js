const BasePage = require('./BasePage.js');

module.exports = class UserBoardsPage extends BasePage {
    constructor(page) {
        super(page);
    }
    get navBar() { return this.page.locator("xpath=//nav[@id='header']"); }
    get yourWorkspacesLabel() { return this.page.getByText('YOUR WORKSPACES'); }

    async verifyNavBarVisible() { await expect(this.navBar).toBeVisible(); } 
    async verifyYourWorkspacesLabelVisible() { await expect(this.yourWorkspacesLabel).toBeVisible(); }
}
