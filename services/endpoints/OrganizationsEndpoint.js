const { BaseClientAPI } = require('./BaseClientAPI.js');

module.exports = class OrganizationsEndpoint extends BaseClientAPI {
    GET_ALL_ORGANIZATIONS_ENDPOINT = 'members/:id/organizations';

    constructor() {
        super();
    }

    retrieveAllOrganizations(memberId) {
        return this.get(this.formatPath(GET_ALL_ORGANIZATIONS_ENDPOINT, 'id', memberId)).data;
    }
}
