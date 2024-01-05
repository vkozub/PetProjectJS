const { axios } = require('./../../tests/support/env.js');

module.exports = class BaseClientAPI {
    constructor() {
        this.URL = process.env.TRELLO_API_URL;
        this.KEY = process.env.TRELLO_API_KEY;
        this.TOKEN = process.env.TRELLO_API_TOKEN;
        this.MEMBER_ID = process.env.TRELLO_MEMBER_ID;
    }

    async get(endpoint) {
        const config = {
            baseURL: this.URL,
            params: {
                key: this.KEY,
                token: this.TOKEN
            },
            timeout: 2000
            // headers: {
            //     'Host': 'api.trello.com',
            //     'Accept': '*/*',
            //     'Accept-Encoding': 'gzip, deflate, br',
            //     'Connection': 'keep-alive'
            // }
        };
        return axios.get(endpoint, config); 
    }

    formatPath(endpoint, pathVarName, pathVar) {
        const pattern = new RegExp(`:${pathVarName}`);
        return endpoint.replace(pattern, pathVar);
    }
}
