
const defaultConfig = {
    baseURL: process.env.TRELLO_API_URL,
    params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_API_TOKEN
    },
    timeout: 2000
};

const getConfig = Object.assign({}, defaultConfig, { headers: { 'Accept': 'application/json' } });
const postConfig = Object.assign({}, defaultConfig, { headers: { 'Accept': 'application/json' } });
const deleteConfig = Object.assign({}, defaultConfig );

module.exports = { getConfig, postConfig, deleteConfig };
