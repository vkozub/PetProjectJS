const BasePage = require('./BasePage');

class LoginHomePage extends BasePage {
    constructor() {
    }
    get logInButton() { return $('div > a[data-uuid*="login"]'); }

    async tapLogIn() { await this.logInButton.click(); }
}

module.exports = LoginHomePage;
