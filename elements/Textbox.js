let BaseElement = require('./BaseElement');

class Textbox extends BaseElement {

    constructor(name, locator) {
        super(name, locator);
    }

    /**
     * returns {promise.Promise}
     */
    click() {
        return this.selector.click()
            .catch((err) => {
                throw new Error(err.message);
            });
    }

    /**
     *
     * @param value
     * @returns {promise.Promise<void>}
     */
    type(value) {
        return this.selector.sendKeys(value);
    }


}

module.exports = Textbox;