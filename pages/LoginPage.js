const BasePage = require('./BasePage.js');

module.exports = class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }
    get usernameInput() { return this.page.locator("xpath=//input[@id='username']"); }
    get passwordInput() { return this.page.locator("xpath=//input[@id='password']"); }
    get continueButton() { return this.page.getByRole('button', { name: 'Continue'}); }

    async putUsername(username) { await this.usernameInput.fill(username); }
    async putPassword(password) { await this.passwordInput.fill(password); }
    async tapContinue() { await this.continueButton.click(); }
}
