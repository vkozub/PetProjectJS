const { test: setup } = require('./../support/env.js');

let workspaceName;

setup('Trello setup', async ({ membersEndpoint }) => {
    const member = await membersEndpoint.searchMember();
    workspaceName = member.fullName + "'s workspace";
});

module.exports = { workspaceName };
