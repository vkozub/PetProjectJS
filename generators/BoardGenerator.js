const OrganizationsEndpoint = require('./../services/endpoints/OrganizationsEndpoint.js');
const BoardsEndpoint = require('./../services/endpoints/BoardsEndpoint.js');
const { orgPayload } = require('./../services/payloadFactories/OrganizationPayload.js');
const { boardPayload } = require('./../services/payloadFactories/BoardPayload.js');

module.exports = class BoardGenerator {

    constructor() {
        this.boardEnd = new BoardsEndpoint;
        this.orgEnd = new OrganizationsEndpoint;
    }

    async generateBoard(options) {
        let org = await this.createOrganization();
        let board = await this.createBoard(org);
        if (options.calendarKey) {
            this.boardEnd.createCalendarKey(board.id);
        } else if (options.emailKey) {
            this.boardEnd.createEmailKey(board.id);
        } else if (options.viewed) {
            this.boardEnd.markAsViewed(board.id);
        }
        board.organization = org;
        return Object.assign(board, options);
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
