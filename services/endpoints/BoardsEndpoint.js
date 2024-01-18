const BaseClientAPI = require('./BaseClientAPI.js');

module.exports = class BoardsEndpoint extends BaseClientAPI {
    GET_ALL_BOARDS_ENDPOINT = 'members/:id/boards';
    RETRIEVE_BOARD_ENDPOINT = 'boards/:id';
    CREATE_BOARD_ENDPOINT = 'boards';

    constructor() {
        super();
    }

    async retrieveAllBoards(memberId) {
        const response = await this.get(this.formatPath(this.GET_ALL_BOARDS_ENDPOINT, 'id', memberId));
        return response.data;
    }

    async deleteBoard(boardId) {
        const response = await this.delete(this.formatPath(this.RETRIEVE_BOARD_ENDPOINT, 'id', boardId));
        console.log(`Response code of deleting of board with id:${boardId} is ${response.status}`);
        return response.status;
    }

    async createBoard(payload) {
        const response = await this.postWithParams(this.CREATE_BOARD_ENDPOINT, payload, 200);
        console.log(`Response code of creating of a board with name:${payload.name} is ${response.status}`);
        payload.id = response.data.id;
        payload.idOrganization = response.data.idOrganization;
        return payload;
    }
}
