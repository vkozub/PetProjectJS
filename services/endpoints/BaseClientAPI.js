const axios = require('axios');
const { getConfig, postConfig, deleteConfig, validateConfig } = require('./apiClientConfigs/apiClientConfigs.js');

module.exports = class BaseClientAPI {
    constructor() {
        this.MEMBER_ID = '624850f1be038a1cc2d10f31';
        this.GET_CONFIG = getConfig;
        this.POST_CONFIG = postConfig;
        this.DELETE_CONFIG = deleteConfig;
        this.validateConfig = validateConfig;
    }

    async get(endpoint, status = 200) {
        const config = this.cloneConfig(this.GET_CONFIG);
        const responsePromise = axios.get(endpoint, config);
        this.validateStatusCode(responsePromise, status);
        return responsePromise;
    }

    async getWithParams(endpoint, query, status = 200) {
        const config = this.cloneConfig(this.GET_CONFIG);
        config.params['query'] = query;
        const responsePromise = axios.get(endpoint, config);
        this.validateStatusCode(responsePromise, status);
        return responsePromise;
    }

    async delete(endpoint, status = 200) {
        const responsePromise = axios.delete(endpoint, this.DELETE_CONFIG); 
        this.validateStatusCode(responsePromise, status);
        return responsePromise;
    }

    async post(endpoint, payload, status = 201) {
        const config = this.cloneConfig(this.POST_CONFIG);
        const responsePromise = axios.post(endpoint, payload, config); 
        this.validateStatusCode(responsePromise, status);
        return responsePromise;
    }

    async postWithParams(endpoint, payload, status = 201) {
        const config = this.cloneConfig(this.POST_CONFIG);
        for (let [key, value] of Object.entries(payload)) {
            config.params[key] = value;
        }
        const responsePromise = axios.post(endpoint, null, config); 
        this.validateStatusCode(responsePromise, status);
        return responsePromise;
    }

    formatPath(endpoint, pathVarName, pathVar) {
        const pattern = new RegExp(`:${pathVarName}`);
        return endpoint.replace(pattern, pathVar);
    }

    async validateStatusCode(responsePromise, expectedStatus) {
        const response = await responsePromise;
        if (response.status !== expectedStatus) { 
            const message = `Unexpected status code: ${response.status} ${response.statusText}. Expected code is ${expectedStatus}`;
            console.log(response.headers.toString());
            throw new RangeError(message);
        }
    }

    cloneConfig(config) {
        const clonedConfig = structuredClone(config);
        return Object.assign(clonedConfig, this.validateConfig);
    }
}
