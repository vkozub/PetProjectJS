const BaseSection = require('./BaseSection.js');

module.exports = class BuildWorkspaceSection extends BaseSection {
    constructor(page) {
        super(page);
    }

    get workspaceNameInput() { return this.page.getByLabel("Workspace name"); }
    get workspaceTypeDropdown() { return this.page.getByTestId("header-create-team-type-input"); }
    get continueButton() { return this.page.getByRole('button', { name: /continue/i, disabled: false }); }

    async putWorkspaceName(name) { await this.workspaceNameInput.fill(name); }
    async selectWorkspaceType(type) { 
        await this.workspaceTypeDropdown.click();
        await this.page.getByText(type).click();
    }
    async tapContinue() { await this.continueButton.click(); }
}
