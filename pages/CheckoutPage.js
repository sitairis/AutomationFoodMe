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
    getProperties(items) {
        if(!items) throw new Error(`CheckoutPage: items is incorrect`);

        return items.map((item) => {

            return {
                value: item.evaluate('item.price'),
                name: item.evaluate('item.name')
            }
        });
    }

}

module.exports = CheckoutPage;