let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');
let log = require('../lib/Logger');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.root = new baseEl('root', 'table');
        this.cmbCardType = element(by.model('cart.payment.type'));
        this.txbNumderCard = element(by.model('cart.payment.number'));
        this.txbExpire = element(by.model('cart.payment.expire'));
        this.txbCVC = element(by.model('cart.payment.cvc'));
        this.btnPurchase = $('[ng-click="purchase()"]');
    }

    clickBtnPurchase() {
        log.step('CheckoutPage', 'clickBtnPurchase','click on btnPurchase');
        this.btnPurchase.isEnabled()
            .then(() => this.btnPurchase.click());
    }

    /**
     *
     * @param cvc
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeCVC(cvc) {
        log.step('CheckoutPage', 'typeCVC','type CVC field');
        return this.txbCVC.sendKeys(cvc);
    }

    /**
     *
     * @param dd
     * @param yyyy
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        log.step('CheckoutPage', 'typeExpire','type expire field');
        return this.txbExpire.sendKeys(`${dd}/${yyyy}`);
    }

    /**
     *
     * @param number
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeNumberCard(number) {
        log.step('CheckoutPage', 'typeNumberCard','type curd number field');
        return this.txbNumderCard.sendKeys(number);
    }

    /**
     *
     * @param option
     */
    selectOption(option) {
        log.step('CheckoutPage', 'selectOption','select cord type');
        return this.cmbCardType.click()
            .then(() => $(`[value=${option}]`).click())//dubClick
            .then(() => $(`[value=${option}]`).click());
    }

    /**
     *
     * @returns {ElementArrayFinder}
     */
    getAllItems() {
        log.step('CheckoutPage', 'getAllItems','get all items from order');
        return this.root.findElementsByRepeater(`item in cart.items`);
    }

    /**
     *
     * @param items
     */
    getProperties(items) {
        log.step('CheckoutPage', 'getProperties','get prices and names from order list');
        if (!items) throw new Error(`CheckoutPage: items is incorrect`);

        return items.map((item) => {

            return {
                value: item.evaluate('item.price'),
                name: item.evaluate('item.name'),
                qty : item.evaluate('item.qty'),
            }
        });
    }


}

module.exports = CheckoutPage;