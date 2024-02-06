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
        this.logger.info(`Organization with id ${organizationId} deleted with status code ${response.status}`);
        return response.status;
    }

    async createOrganization(payload) {
        const response = await this.postWithParams(this.CREATE_ORGANIZATION_ENDPOINT, payload, 200);
        payload.id = response.data.id;
        this.logger.info(`Organization ${JSON.stringify(payload)} created with status code ${response.status}`);
        return payload;
    }
}
