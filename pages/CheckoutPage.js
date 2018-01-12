let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.root = new baseEl('root', 'table');//$(`table`);
    }

    /**
     *
     * @returns {ElementArrayFinder}
     */
    getAllItems() {
        return this.root.findElementsByRepeater(`item in cart.items`);
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