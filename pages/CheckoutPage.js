let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.root = new baseEl('root', 'table');//$(`table`);
        this.cmbCardType = element(by.model('cart.payment.type'));
        this.txbNumderCard = element(by.model('cart.payment.number'));
        this.txbExpire = element(by.model('cart.payment.expire'));
        this.txbCVC = element(by.model('cart.payment.cvc'));
        this.btnPurchase = $('[ng-click="purchase()"]');
    }

    clickBtnPurchase() {
        this.btnPurchase.isEnabled()
            .then(() => this.btnPurchase.click());
    }

    /**
     *
     * @param cvc
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeCVC(cvc) {
        return this.txbCVC.sendKeys(cvc);
    }

    /**
     *
     * @param dd
     * @param yyyy
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        return this.txbExpire.sendKeys(`${dd}/${yyyy}`);
    }

    /**
     *
     * @param number
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeNumberCard(number) {
        return this.txbNumderCard.sendKeys(number);
    }

    /**
     *
     * @param option
     */
    selectOption(option) {

        return this.cmbCardType.click()
            .then(() => $(`[value=${option}]`).click())
            .then(() => $(`[value=${option}]`).click());
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
        if (!items) throw new Error(`CheckoutPage: items is incorrect`);

        return items.map((item) => {

            return {
                value: item.evaluate('item.price'),
                name: item.evaluate('item.name')
            }
        });
    }
}

module.exports = CheckoutPage;