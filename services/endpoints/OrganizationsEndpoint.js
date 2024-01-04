const { BaseClientAPI } = require('./BaseClientAPI.js');

module.exports = class OrganizationsEndpoint extends BaseClientAPI {
    GET_ALL_ORGANIZATIONS_ENDPOINT = 'members/:id/organizations';

    constructor() {
        super();
    }

    retrieveAllOrganizations() {
        return this.get(GET_ALL_ORGANIZATIONS_ENDPOINT).data;
    }
}
