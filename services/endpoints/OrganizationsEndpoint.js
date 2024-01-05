const BaseClientAPI = require('./BaseClientAPI.js');

module.exports = class OrganizationsEndpoint extends BaseClientAPI {
    GET_ALL_ORGANIZATIONS_ENDPOINT = 'members/:id/organizations';

    constructor() {
        super();
    }

    async retrieveAllOrganizations(memberId) {
        const response = await this.get(this.formatPath(this.GET_ALL_ORGANIZATIONS_ENDPOINT, 'id', memberId));
        return response.data;
    }
}
