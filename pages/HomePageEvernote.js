module.exports = class HomePageEvernote {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    get yourWorkspacesLabel() { return this.page.locator("xpath=//div[contains(@id, 'HOME_TITLE')]"); }

    async verifyYourWorkspacesLabelVisible() { await this.expect(this.yourWorkspacesLabel).toHaveText('Your Workspace', { timeout: 60000 }); }
}