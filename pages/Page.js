class Page {

    constructor(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }
}

module.exports = Page;