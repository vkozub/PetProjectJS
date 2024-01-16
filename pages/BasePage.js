module.exports = class BasePage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    retrieveOrganization(orgs, workspaceExpected) {
        const pattern = new RegExp(`^${workspaceExpected}$`);
        return orgs.find(el => pattern.test(el.displayName));
    }
    retrieveBoard(boards, boardExpected) {
        const pattern = new RegExp(`^${boardExpected}$`);
        return boards.find(el => pattern.test(el.name));
    }
}
