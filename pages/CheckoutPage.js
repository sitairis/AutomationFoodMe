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

    /**
     *
     * @param items
     */
    getNames(items) {
        if(!items) throw new Error(`CheckoutPage: items is incorrect`);

        return items.map((item) => item.evaluate('item.name'))
    }

}

module.exports = CheckoutPage;