module.exports = class HomePageEvernote {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    get yourWorkspacesLabel() { return this.page.locator("xpath=//div[contains(@id, 'HOME_TITLE')]"); }
    get addNewNoteButton() { return this.page.locator("xpath=//div[contains(@id, 'qa-HOME_NOTE_WIDGET_CREATE_NOTE')]"); }
    get noteTitleTextarea() { return this.page.frameLocator('#qa-COMMON_EDITOR_IFRAME').locator("xpath=//textarea[@placeholder='Title']"); }
    get noteTitleLabel() { return this.page.frameLocator('#qa-COMMON_EDITOR_IFRAME').locator("xpath=//textarea[@placeholder='Title']//../div"); }
    get homeLink() { return this.page.locator("xpath=//a[contains(@id, 'qa-NAV_HOME')]"); }
    get accountButton() { return this.page.locator("xpath=//div[contains(@id, 'qa-NAV_USER')]"); }
    get logoutLink() { return this.page.locator("xpath=//a[contains(@id, 'qa-ACCOUNT_DROPDOWN_LOGOUT')]"); }

    async tapAddNewNote() { await this.addNewNoteButton.click(); }
    async tapHome() { await this.homeLink.click(); }
    async tapAccount() { await this.accountButton.click(); }
    async tapLogout() { 
        await this.tapAccount();
        await this.logoutLink.click();
    }
    
    async tapNote(title) { await this.page.locator(`xpath=//*[text()='${title}']`).dispatchEvent("click"); }
    async putNoteTitle(title) { 
        await this.noteTitleTextarea.click();
        await this.noteTitleTextarea.fill(title);
    }

    async verifyYourWorkspacesLabelVisible() { await this.expect(this.yourWorkspacesLabel).toHaveText('Your Workspace', { timeout: 80000 }); }
    async verifyNoteTitleVisible(title) { 
        const noteTitle = this.page.locator(`xpath=//*[text()='${title}']`);
        await noteTitle.waitFor({timeout: 10000, state: 'hidden'});
        await this.expect(noteTitle).toBeHidden();
    }
    async verifyEditorNoteTitleVisible(title) { 
        await this.expect(this.noteTitleLabel).toContainText(title, { timeout: 10000 });
    }
}