const { axios } = require('./../../tests/support/env.js');
const { defaultConfig, postConfig, deleteConfig } = require('./apiClientConfigs/apiClientConfigs.js');

module.exports = class BaseClientAPI {
    constructor() {
        this.MEMBER_ID = process.env.TRELLO_MEMBER_ID;
        this.GET_CONFIG = defaultConfig;
        this.POST_CONFIG = postConfig;
        this.DELETE_CONFIG = deleteConfig;
    }

    async get(endpoint) {
        return axios.get(endpoint, this.GET_CONFIG); 
    }

    async delete(endpoint) {
        return axios.delete(endpoint, this.DELETE_CONFIG); 
    }

    formatPath(endpoint, pathVarName, pathVar) {
        const pattern = new RegExp(`:${pathVarName}`);
        return endpoint.replace(pattern, pathVar);
    }
}
