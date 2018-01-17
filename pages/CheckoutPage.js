let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');
let Logger = require('../elements/Logger');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.log = new Logger();
        this.root = new baseEl('root', 'table');//$(`table`);
        this.cmbCardType = element(by.model('cart.payment.type'));
        this.txbNumderCard = element(by.model('cart.payment.number'));
        this.txbExpire = element(by.model('cart.payment.expire'));
        this.txbCVC = element(by.model('cart.payment.cvc'));
        this.btnPurchase = $('[ng-click="purchase()"]');
    }

    clickBtnPurchase() {
        this.log.step('CheckoutPage', 'clickBtnPurchase','***');
        this.btnPurchase.isEnabled()
            .then(() => this.btnPurchase.click());
    }

    /**
     *
     * @param cvc
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeCVC(cvc) {
        this.log.step('CheckoutPage', 'typeCVC','***');
        return this.txbCVC.sendKeys(cvc);
    }

    /**
     *
     * @param dd
     * @param yyyy
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        this.log.step('CheckoutPage', 'typeExpire','***');
        return this.txbExpire.sendKeys(`${dd}/${yyyy}`);
    }

    /**
     *
     * @param number
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeNumberCard(number) {
        this.log.step('CheckoutPage', 'typeNumberCard','***');
        return this.txbNumderCard.sendKeys(number);
    }

    /**
     *
     * @param option
     */
    selectOption(option) {
        this.log.step('CheckoutPage', 'selectOption','***');
        return this.cmbCardType.click()
            .then(() => $(`[value=${option}]`).click())
            .then(() => $(`[value=${option}]`).click());
    }

    /**
     *
     * @returns {ElementArrayFinder}
     */
    getAllItems() {
        this.log.step('CheckoutPage', 'getAllItems','***');
        return this.root.findElementsByRepeater(`item in cart.items`);
    }

    /**
     *
     * @param items
     */
    getProperties(items) {
        this.log.step('CheckoutPage', 'getProperties','***');
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