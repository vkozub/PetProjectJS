const BasePage = require('./BaseSection.js');

module.exports = class BuildWorkspaceSection extends BaseSection {
    constructor(page) {
        super(page);
    }
    
    get workspaceNameInput() { return this.page.getByTestId("header-create-team-name-input"); }
    get workspaceTypeDropdown() { return this.page.getByTestId("header-create-team-type-input"); }
    get continueButton() { return this.page.getByTestId('header-create-team-submit-button'); }

    async putWorkspaceName(name) { await this.workspaceNameInput.fill(name); }
    async selectWorkspaceType(type) { 
        await this.workspaceTypeDropdown.click();
        await this.page.getByText(type).click();
    }
    async tapContinue() { await this.continueButton.click(); }
}
