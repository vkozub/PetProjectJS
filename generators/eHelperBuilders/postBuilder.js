const { faker } = require('../../support/env.js');
const { PostGenerator } = require('./postGenerator.js');

exports.PostBuilder = class PostBuilder {
    REGIONS = [
        "Івано-Франківська область",
        "Вінницька область",
        "Волинська область",
        "Дніпропетровська область",
        "Львівська область",
        "Тернопільська область"
    ]

    CATEGORIES = [
        "Послуги масажу",
        "Обслуговування котлів",
        "Будівельні роботи",
        "Клінінгові послуги"
    ]

    SERVICES = [
        "Надаю послугу",
        "Пропоную роботу"
    ]

    constructor(page, testInfo, options = {}) {
        this.options = options;
        this.page = page;
        this.testInfo = testInfo;
        this.postParams = this._setPostParams(options);
        this.searchParams = this._setSearchParams();
    }

    _setPostParams(options) {
        const randomPost = this._getRandomPostParams();
        return Object.assign(randomPost, options);
    }

    _getRandomPostParams() {
        return {
            region: this.REGIONS[0],
            city: "Івано-Франківськ",
            category: this.CATEGORIES[Math.round(Math.random() * (this.CATEGORIES.length - 1))],
            service: this.SERVICES[Math.round(Math.random() * (this.SERVICES.length - 1))],
            text: faker.lorem.sentence({ min: 6, max: 8 })
        };
    }

    getPostParams() {
        return this.postParams;
    }

    _setSearchParams() {
        const searchParams = Object.assign({}, this.getPostParams());
        delete searchParams.text;
        return searchParams;
    }

    getSearchParams() {
        return this.searchParams;
    }

    build() {
        return new PostGenerator(this.postParams, this.page, this.testInfo);
    }
}
