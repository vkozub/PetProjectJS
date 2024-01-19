
const defaultConfig = {
    baseURL: 'https://api.trello.com/1/',
    timeout: 2000
};

const paramsConfig = {
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    }
};

const validateConfig = {
    validateStatus: function (status) {
        return status < 500;
    }
};

const headersConfig = {
    headers: { 'Accept': 'application/json' }
};

const getConfig = Object.assign({}, defaultConfig, paramsConfig, headersConfig);
const postConfig = Object.assign({}, defaultConfig, paramsConfig, headersConfig);
const deleteConfig = Object.assign({}, defaultConfig, paramsConfig, validateConfig);

module.exports = { getConfig, postConfig, deleteConfig, validateConfig };
