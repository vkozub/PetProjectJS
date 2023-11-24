class loginPage extends basePage {
    constructor(page) {
        super(page);
    }
    get usernameInput() { return $("username"); }
    get passwordInput() { return $("password"); }
    get continueButton() { return $("login-submit"); }
}
