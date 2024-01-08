const BasePage = require('./BasePage.js');
const BuildWorkspaceSection = require('../sections/BuildWorkspaceSection.js');

module.exports = class UserBoardsPage extends BasePage {
    constructor(page, expect) {
        super(page, expect);
    }

    get navBar() { return this.page.locator("xpath=//nav[@id='header']"); }
    get yourWorkspacesLabel() { return this.page.getByText('YOUR WORKSPACES'); }
    get homeNavCreateWorkspaceButton() { return this.page.getByTestId('home-navigation-create-team-button'); }
    get buildWorkspaceSection() { return new BuildWorkspaceSection(this.page); }
    get homeTeamWorkspaceNames() { return this.page.getByTestId('home-team-tab-name'); }

    async tapHomeNavCreateWorkspace() { await this.homeNavCreateWorkspaceButton.click(); }

    async verifyNavBarVisible() { await this.expect(this.navBar).toBeVisible(); } 
    async verifyYourWorkspacesLabelVisible() { await this.expect(this.yourWorkspacesLabel).toBeVisible(); }
    async verifyHomeTeamWorkspaceNameVisible(name) { await this.expect(this.homeTeamWorkspaceNames).toContainText(name); } 

    async verifyWorkspaceNameData(orgs, workspaceExpected) { 
        const workspaceActual = this.retrieveOrganization(orgs, workspaceExpected);
        this.expect(workspaceActual).toBeTruthy();
        this.expect(workspaceActual.displayName).toContain(workspaceExpected);
    }
}
