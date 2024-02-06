const BaseClientAPI = require('./BaseClientAPI.js');

module.exports = class BoardsEndpoint extends BaseClientAPI {
    GET_ALL_BOARDS_ENDPOINT = 'members/:id/boards';
    RETRIEVE_BOARD_ENDPOINT = 'boards/:id';
    CREATE_BOARD_ENDPOINT = 'boards';
    CREATE_BOARD_CALENDAR_KEY_ENDPOINT = 'boards/:id/calendarKey/generate';
    CREATE_BOARD_EMAIL_KEY_ENDPOINT = 'boards/:id/emailKey/generate';
    CREATE_BOARD_LIST_ENDPOINT = 'boards/:id/lists';
    MARK_BOARD_AS_VIEWED_ENDPOINT = 'boards/:id/markedAsViewed';

    constructor() {
        super();
    }

    async retrieveAllBoards(memberId) {
        const response = await this.get(this.formatPath(this.GET_ALL_BOARDS_ENDPOINT, 'id', memberId));
        this.logger.info(`Retrieved all boards for the member with status code ${response.status}`);
        return response.data;
    }

    async deleteBoard(boardId) {
        const response = await this.delete(this.formatPath(this.RETRIEVE_BOARD_ENDPOINT, 'id', boardId));
        this.logger.info(`Board with id ${boardId} deleted with status code ${response.status}`);
        return response.status;
    }

    async createBoard(payload) {
        const response = await this.postWithParams(this.CREATE_BOARD_ENDPOINT, payload, 200);
        payload.id = response.data.id;
        payload.idOrganization = response.data.idOrganization;
        this.logger.info(`Board ${JSON.stringify(payload)} created with status code ${response.status}`);
        return payload;
    }

    async createCalendarKey(boardId) {
        const response = await this.postWithParams(this.formatPath(this.CREATE_BOARD_CALENDAR_KEY_ENDPOINT, 'id', boardId), {}, 200);
        this.logger.info(`Board with id ${boardId} got calendar Key with status code ${response.status}`);
    }

    async createEmailKey(boardId) {
        const response = await this.postWithParams(this.formatPath(this.CREATE_BOARD_EMAIL_KEY_ENDPOINT, 'id', boardId), {}, 200);
        this.logger.info(`Board with id ${boardId} got email Key with status code ${response.status}`);
        return response.data;
    }

    async markAsViewed(boardId) {
        const response = await this.postWithParams(this.formatPath(this.MARK_BOARD_AS_VIEWED_ENDPOINT, 'id', boardId), {}, 200);
        this.logger.info(`Board with id ${boardId} marked as viewed with status code ${response.status}`);
    }

    async createList(boardId, payload) {
        const response = await this.postWithParams(this.formatPath(this.CREATE_BOARD_LIST_ENDPOINT, 'id', boardId), payload, 200);
        this.logger.info(`List ${JSON.stringify(payload)} for the board with id ${boardId} created with status code ${response.status}`);
        return response.data;
    }
}
