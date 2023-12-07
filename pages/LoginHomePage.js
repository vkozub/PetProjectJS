const BasePage = require('./BasePage.js');

module.exports = class LoginHomePage extends BasePage {
    constructor(page) {
        super();
    }
    get logInButton() { return this.page.getByText('Log in'); }

    async tapLogIn() { await this.logInButton.click(); }
}
