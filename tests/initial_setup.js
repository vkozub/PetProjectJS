const { test: setup } = require('../support/env.js');

setup('Trello initial setup', async ({ membersEndpoint }) => {
    // retrieve Trello member information
    const memberTrello = await membersEndpoint.searchMember();
    let workspaceName = memberTrello.fullName + "'s workspace";
    memberTrello.defaultWorkspace = workspaceName;
    process.env.TRELLO_MEMBER = JSON.stringify(memberTrello);
});
