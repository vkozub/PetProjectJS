const BasePage = require('./BasePage.js');

module.exports = class LoginHomePage extends BasePage {
    get logInButton() { return $('div > a[data-uuid*="login"]'); }

    async tapLogIn() { await this.logInButton.click(); }
}
