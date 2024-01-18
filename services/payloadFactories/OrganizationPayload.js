const { faker } = require('./../../support/env.js');

const orgPayload = function(){
    return {
        displayName: 'workspace' + faker.string.alphanumeric(10), // required
        desc: 'Test Descriptions', // optional
        name: 'Test workspace name', // optional
    };
};

module.exports = { orgPayload };
