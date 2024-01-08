const defaultConfig = {
    baseURL: process.env.TRELLO_API_URL,
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000
};

const postConfig = {
    baseURL: process.env.TRELLO_API_URL,
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000,
    headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json'
    }
};

module.exports = { defaultConfig, postConfig };
