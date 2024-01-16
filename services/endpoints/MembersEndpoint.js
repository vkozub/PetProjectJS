const BaseClientAPI = require('./BaseClientAPI.js');

module.exports = class BoardsEndpoint extends BaseClientAPI {
    RETRIEVE_MEMBER_ENDPOINT = 'members/:id';

    constructor() {
        super();
    }

    async retrieveMember(memberId = this.MEMBER_ID) {
        const response = await this.get(this.formatPath(this.RETRIEVE_MEMBER_ENDPOINT, 'id', memberId));
        return response.data;
    }
}
