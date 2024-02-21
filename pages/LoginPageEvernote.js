
module.exports = class LoginPageEvernote {
    INLINE_ERROR_INCORRECT_EMAIL = 'There is no account for the username or email you entered.';
    INLINE_ERROR_INCORRECT_PASSWORD = 'Incorrect password.';

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }
    get usernameInput() { return this.page.locator("xpath=//input[@id='username']"); }
    get passwordInput() { return this.page.locator("xpath=//input[@id='password']"); }
    get continueButton() { return this.page.locator("xpath=//input[@value='Continue']"); }
    get signInButton() { return this.page.locator("xpath=//input[@value='Sign in']"); }
    get inlineErrorEmail() { return this.page.locator("xpath=//div[@id='responseMessage']"); }
    get inlineErrorPassword() { return this.page.locator("xpath=//div[contains(@class, 'error-message')]"); }

    async visit() { await this.page.goto('https://evernote.com/Login.action'); } 
    async putUsername(username) { await this.usernameInput.fill(username); }
    async putPassword(password) { await this.passwordInput.fill(password); }
    async tapContinue() { await this.continueButton.click(); }
    async tapSignIn() { await this.signInButton.click(); }

    async verifyIncorrectEmailMessage() { await this.expect(this.inlineErrorEmail).toHaveText(this.INLINE_ERROR_INCORRECT_EMAIL); }
    async verifyIncorrectPasswordMessage() { await this.expect(this.inlineErrorPassword).toContainText(this.INLINE_ERROR_INCORRECT_PASSWORD); }
}
