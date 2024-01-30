const { faker } = require('@faker-js/faker');

const boardPayload = function(){
    return {
        name: 'board' + faker.string.alphanumeric(10), // required
    };
};

module.exports = { boardPayload };
