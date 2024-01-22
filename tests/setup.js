const { test: setup } = require('./../support/env.js');

setup('Trello setup', async ({ membersEndpoint }) => {
    // retrieve Trello member information
    if (!process.env.TRELLO_MEMBER) {
    const memberTrello = await membersEndpoint.searchMember();
    let workspaceName = memberTrello.fullName + "'s workspace";
    memberTrello.defaultWorkspace = workspaceName;
    process.env.TRELLO_MEMBER = JSON.stringify(memberTrello);
    };
});
