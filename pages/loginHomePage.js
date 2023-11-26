const basePage = require('./basePage');

class loginHomePage extends basePage {
    constructor(page) {
        super(page);
    }
    get logInButton() { return $('div > a[data-uuid*="login"]'); }

    tapLogIn() { this.logInButton.click(); }
}

module.exports = { loginHomePage };
