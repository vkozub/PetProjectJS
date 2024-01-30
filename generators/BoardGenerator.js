const OrganizationsEndpoint = require('./../services/endpoints/OrganizationsEndpoint.js');
const BoardsEndpoint = require('./../services/endpoints/BoardsEndpoint.js');
const { orgPayload } = require('./../services/payloadFactories/OrganizationPayload.js');
const { boardPayload } = require('./../services/payloadFactories/BoardPayload.js');
const { listPayload } = require('./../services/payloadFactories/ListPayload.js');

module.exports = class BoardGenerator {

    constructor() {
        this.boardEnd = new BoardsEndpoint;
        this.orgEnd = new OrganizationsEndpoint;
    }

    async generateBoard(options) {
        let org = await this.createOrganization();
        let board = await this.createBoard(org);
        let emailKey, calendarKey, viewed, list;
        if (options.calendarKey) {
            calendarKey = await this.boardEnd.createCalendarKey(board.id);
        } else if (options.emailKey) {
            emailKey = await this.boardEnd.createEmailKey(board.id);
        } else if (options.viewed) {
            viewed = await this.boardEnd.markAsViewed(board.id);
        } else if (options.list) {
            list = await this.boardEnd.createList(board.id, listPayload());
        }
        board.organization = org;
        board.emailKey = emailKey;
        board.calendarKey = calendarKey;
        board.viewed = viewed;
        board.list = list;
        return board;
    }

    async createOrganization() {
        return await this.orgEnd.createOrganization(orgPayload());
    }

    async createBoard(org) {
        let payload = boardPayload();
        payload.idOrganization = org.id;
        return await this.boardEnd.createBoard(payload);
    }
}
