const axios = require('axios');
const { getConfig, postConfig, deleteConfig } = require('./apiClientConfigs/apiClientConfigs.js');

module.exports = class BaseClientAPI {
    constructor() {
        this.MEMBER_ID = '624850f1be038a1cc2d10f31';
        this.GET_CONFIG = getConfig;
        this.POST_CONFIG = postConfig;
        this.DELETE_CONFIG = deleteConfig;
    }

    async get(endpoint, status = 200) {
        const responsePromise = axios.get(endpoint, this.GET_CONFIG);
        this.validateStatusCode(responsePromise, status);
        return responsePromise;
    }

    async delete(endpoint, status = 200) {
        const responsePromise = axios.delete(endpoint, this.DELETE_CONFIG); 
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
}
