let BaseElement = require('./BaseElement');

class Button extends BaseElement {

    constructor(name, locator) {
        super(name, locator);
    }

    click() {
        return this.selector.click();

    }
}

module.exports = Button;