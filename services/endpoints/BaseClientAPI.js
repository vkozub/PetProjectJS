const { axios } = require('./support/env.js');

module.exports = class BaseClientAPI {
    constructor() {
        this.URL = process.env.TRELLO_API_URL;
        this.KEY = process.env.TRELLO_API_KEY;
        this.TOKEN = process.env.TRELLO_API_TOKEN;
        this.MEMBER_ID = process.env.TRELLO_MEMBER_ID;
    }

    async get(endpoint) {
        const url = this.URL + endpoint;
        const config = {
            params: {
                key: this.KEY,
                token: this.TOKEN
            },
            timeout: 2000
        };
        return await axios.get(url, config); 
    }
}
