class BaseElement {

    constructor(name, locator) {
        if (!name) throw new Error('BaseElement: name');
        if (!locator) throw new Error('BaseElement: locator');

        this.name = name;
        this.selector = $(locator);
    }

    /**
     *
     * @param locator
     * @returns {ElementFinder}
     */
    findElementByCSS(locator) {
        return this.selector.$(locator);
    }

    /**
     *
     * @param locator
     * @returns {ElementArrayFinder}
     */
    findElementsByCSS(locator) {
        return this.selector.$$(locator);
    }

    /**
     *
     * @param locator
     * @returns {ElementFinder}
     */
    findElementByModel(locator) {
        return this.selector.element(by.model(locator));
    }

    /**
     *
     * @param locator
     * @returns {ElementArrayFinder}
     */
    findElementsByModel(locator) {
        return this.selector.all(by.model(locator));
    }

    /**
     *
     * @param locator
     * @returns {ElementFinder}
     */
    findElementByRepeater(locator) {
        return this.selector.element(by.repeater(locator));
    }

    /**
     *
     * @param locator
     * @returns {ElementArrayFinder}
     */
    findElementsByRepeater(locator) {
        return this.selector.all(by.repeater(locator));
    }

    click() {
        return this.selector.click();
    }
}

module.exports = BaseElement;