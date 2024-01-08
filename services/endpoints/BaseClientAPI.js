const { axios } = require('./../../tests/support/env.js');
const { defaultConfig, postConfig } = require('./apiClientConfigs/apiClientConfigs.js');

module.exports = class BaseClientAPI {
    constructor() {
        this.MEMBER_ID = process.env.TRELLO_MEMBER_ID;
        this.GET_CONFIG = defaultConfig;
        this.POST_CONFIG = postConfig;
    }

    async get(endpoint) {
        return axios.get(endpoint, this.GET_CONFIG); 
    }

    formatPath(endpoint, pathVarName, pathVar) {
        const pattern = new RegExp(`:${pathVarName}`);
        return endpoint.replace(pattern, pathVar);
    }
}
