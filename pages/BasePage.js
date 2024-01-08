module.exports = class BasePage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    retrieveOrganization(orgs, workspaceExpected) {
        const pattern = new RegExp(`^${workspaceExpected}$`);
        return orgs.find(el => pattern.test(el.displayName));
    }
}
