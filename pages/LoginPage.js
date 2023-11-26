const BasePage = require('./BasePage.js');

module.exports = class LoginPage extends BasePage {
    get usernameInput() { return $("username"); }
    get passwordInput() { return $("password"); }
    get continueButton() { return $("login-submit"); }

    putUsername(username) { this.usernameInput.fill(username); }
    putPassword(password) { this.passwordInput.fill(password); }
    async tapContinue() { await this.continueButton.click(); }
}
