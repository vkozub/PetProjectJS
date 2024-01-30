const { faker } = require('@faker-js/faker');

const listPayload = function(){
    return {
        name: 'list_' + faker.string.alphanumeric(6), // required
    };
};

module.exports = { listPayload };
