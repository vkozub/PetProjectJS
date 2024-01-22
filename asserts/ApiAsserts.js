const ApiAsserts = {
    async verifyBoardNameData(boards, boardExpected) { 
        const boardActual = this.retrieveBoard(boards, boardExpected);
        this.expect(boardActual).toBeTruthy();
        this.expect(boardActual.closed).toBeFalsy();
        this.expect(boardActual.name).toContain(boardExpected);
    },

    async verifyWorkspaceNameData(orgs, workspaceExpected) { 
        const workspaceActual = this.retrieveOrganization(orgs, workspaceExpected);
        this.expect(workspaceActual).toBeTruthy();
        this.expect(workspaceActual.displayName).toContain(workspaceExpected);
    }
};

module.exports = ApiAsserts;
