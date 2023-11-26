class loginPage extends basePage {
    constructor(page) {
        super(page);
    }
    get usernameInput() { return $("username"); }
    get passwordInput() { return $("password"); }
    get continueButton() { return $("login-submit"); }

    putUsername(username) { this.usernameInput.fill(username); }
    putPassword(password) { this.passwordInput.fill(password); }
    clickContinue() { this.continueButton.click(); }
}
