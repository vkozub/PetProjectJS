const defaultConfig = {
    baseURL: process.env.TRELLO_API_URL,
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000,
    headers: {
        'Accept': 'application/json'
    }
};

const postConfig = {
    baseURL: process.env.TRELLO_API_URL,
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000,
    headers: {
        'Accept': 'application/json'
    }
};

const deleteConfig = {
    baseURL: process.env.TRELLO_API_URL,
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000
};

module.exports = { defaultConfig, postConfig, deleteConfig };
