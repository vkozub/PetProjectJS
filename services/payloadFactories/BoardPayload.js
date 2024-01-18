const { faker } = require('./../../support/env.js');

const boardPayload = function(){
    return {
        name: 'board' + faker.string.alphanumeric(10), // required
    };
};

module.exports = { boardPayload };
