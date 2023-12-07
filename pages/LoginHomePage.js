const BasePage = require('./BasePage.js');

module.exports = class LoginHomePage extends BasePage {
    constructor(page) {
        super(page);
        this.url = 'https://trello.com';
    }
    get logInButton() { return this.page.locator("xpath=//a[text()='Log in' and @data-uuid]"); }

    async visit() { await this.page.goto(this.url); } 
    async tapLogIn() { await this.logInButton.click(); }
}
