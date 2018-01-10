let utils = require(`../utils/utils`);
let Page = require('./Page');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.root = $(`table`);
    }

    /**
     *
     * @returns {ElementArrayFinder}
     */
    getAllItems() {
        return this.root.all(by.repeater(`item in cart.items`));
    }

getNames(items) {
        return items.map((item) => item.evaluate('item.name'))
}

}

module.exports = CheckoutPage;