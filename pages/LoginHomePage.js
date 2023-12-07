const BasePage = require('./BasePage.js');

module.exports = class LoginHomePage extends BasePage {
    constructor(page) {
        super(page);
    }
    get logInButton() { return this.page.locator("xpath=//a[text()='Log in' and @data-uuid]"); }

    async tapLogIn() { await this.logInButton.click(); }
}
