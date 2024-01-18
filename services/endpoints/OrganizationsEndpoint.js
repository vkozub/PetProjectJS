const BaseClientAPI = require('./BaseClientAPI.js');

module.exports = class OrganizationsEndpoint extends BaseClientAPI {
    GET_ALL_ORGANIZATIONS_ENDPOINT = 'members/:id/organizations';
    RETRIEVE_ORGANIZATION_ENDPOINT = 'organizations/:id';
    CREATE_ORGANIZATION_ENDPOINT = 'organizations';

    constructor() {
        super();
    }

    async retrieveAllOrganizations(memberId) {
        const response = await this.get(this.formatPath(this.GET_ALL_ORGANIZATIONS_ENDPOINT, 'id', memberId));
        return response.data;
    }

    async deleteOrganization(organizationId) {
        const response = await this.delete(this.formatPath(this.RETRIEVE_ORGANIZATION_ENDPOINT, 'id', organizationId));
        console.log(`Response code of deleting of organization with id:${organizationId} is ${response.status}`);
        return response.status;
    }

    async createOrganization(payload) {
        const response = await this.postWithParams(this.CREATE_ORGANIZATION_ENDPOINT, payload, 200);
        console.log(`Response code of creating of organization with name:${payload.displayName} is ${response.status}`);
        payload.id = response.data.id;
        return payload;
    }
}
