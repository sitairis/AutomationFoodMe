class Page {

    constructor(title) {
        this._title = title;
    }

    open(url, logInf) {
        browser.ignoreSynchronization = true;

        return browser.get(url)
            .catch((errorMessage) => Promise.reject(`${logInf.className} : Error --- open : ${errorMessage}`));
    }
}

module.exports = Page;