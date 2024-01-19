const BaseClientAPI = require('./BaseClientAPI.js');

module.exports = class BoardsEndpoint extends BaseClientAPI {
    RETRIEVE_MEMBER_ENDPOINT = 'members/:id';
    SEARCH_FOR_MEMBERS_ENDPOINT = 'search/members/';

    constructor() {
        super();
    }

    async retrieveMember(memberId = this.MEMBER_ID) {
        const response = await this.get(this.formatPath(this.RETRIEVE_MEMBER_ENDPOINT, 'id', memberId));
        return response.data;
    }

    async searchMember(query = process.env.TRELLO_USERNAME) {
        const response = await this.getWithParams(this.SEARCH_FOR_MEMBERS_ENDPOINT, query);
        return response.data.shift();
    }
}
