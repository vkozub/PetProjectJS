
const defaultConfig = {
    baseURL: 'https://api.trello.com/1/',
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000,
    validateStatus: function (status) {
        return status < 500;
    },
};

const getConfig = Object.assign({}, defaultConfig, { headers: { 'Accept': 'application/json' } });
const postConfig = Object.assign({}, defaultConfig, { headers: { 'Accept': 'application/json' } });
const deleteConfig = Object.assign({}, defaultConfig );

module.exports = { getConfig, postConfig, deleteConfig };
