const BasePage = require('./BasePage.js');
const BuildWorkspaceSection = require('../sections/BuildWorkspaceSection.js');
const BuildBoardSection = require('../sections/BuildBoardSection.js');
const ApiAsserts = require('./../asserts/ApiAsserts.js');

module.exports = class UserBoardsPage extends BasePage {
    constructor(page, expect) {
        super(page, expect);
        Object.assign(this, ApiAsserts);
    }

    get navBar() { return this.page.locator("xpath=//nav[@id='header']"); }
    get yourWorkspacesLabel() { return this.page.getByText('YOUR WORKSPACES'); }
    get homeNavCreateWorkspaceButton() { return this.page.getByTestId('home-navigation-create-team-button'); }
    get buildWorkspaceSection() { return new BuildWorkspaceSection(this.page); }
    get homeTeamWorkspaceNames() { return this.page.getByTestId('home-team-tab-name'); }
    get createButton() { return this.page.getByTestId('header-create-menu-button'); }
    get buildBoardSection() { return new BuildBoardSection(this.page); }
    get boardsList() { return this.page.locator("xpath=//ul[@class='boards-page-board-section-list']/li"); }

    async tapHomeNavCreateWorkspace() { await this.homeNavCreateWorkspaceButton.click(); }
    async tapCreate() { await this.createButton.click(); }

    async verifyNavBarVisible() { await this.expect(this.navBar).toBeVisible(); } 
    async verifyYourWorkspacesLabelVisible() { await this.expect(this.yourWorkspacesLabel).toBeVisible(); }
    async verifyHomeTeamWorkspaceNameVisible(name) { await this.expect(this.homeTeamWorkspaceNames).toContainText(name); } 
    async verifyHomeTeamBoardNameVisible(name) { await this.expect(this.boardsList.filter({ hasText: name })).toHaveText(name); }
}
