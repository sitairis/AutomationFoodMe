class Page {

    constructor(title) {
        this._title = title;
    }

    open(path) {
        browser.get(path);
    }


    get title() {
        return this._title;
    }
}

module.exports = Page;