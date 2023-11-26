const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }
    get usernameInput() { return $("username"); }
    get passwordInput() { return $("password"); }
    get continueButton() { return $("login-submit"); }

    putUsername(username) { this.usernameInput.fill(username); }
    putPassword(password) { this.passwordInput.fill(password); }
    async clickContinue() { await this.continueButton.click(); }
}

module.exports = { loginPage: new LoginPage() };
