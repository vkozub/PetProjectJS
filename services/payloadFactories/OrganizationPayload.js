const { faker } = require('@faker-js/faker');

const orgPayload = function(){
    return {
        displayName: 'workspace' + faker.string.alphanumeric(10), // required
        desc: 'Test Descriptions', // optional
        name: 'Test workspace name', // optional
    };
};

module.exports = { orgPayload };
