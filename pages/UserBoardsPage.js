const BasePage = require('./BasePage.js');

module.exports = class UserBoardsPage extends BasePage {
    constructor(page, expect) {
        super(page, expect);
    }
    get navBar() { return this.page.locator("xpath=//nav[@id='header']"); }
    get yourWorkspacesLabel() { return this.page.getByText('YOUR WORKSPACES'); }
    get homeNavCreateWorkspaceButton() { return this.page.getByTestId('home-navigation-create-team-button'); }

    async tapHomeNavCreateWorkspace() { await this.homeNavCreateWorkspaceButton.click(); }
    
    async verifyNavBarVisible() { await this.expect(this.navBar).toBeVisible(); } 
    async verifyYourWorkspacesLabelVisible() { await this.expect(this.yourWorkspacesLabel).toBeVisible(); }
}
