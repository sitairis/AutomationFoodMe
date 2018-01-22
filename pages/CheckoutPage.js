let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
let log = require('../lib/Logger');
let utils = require('../lib/utils');

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

    /**
     * кликнет на кнопку 'purchase'
     */
    clickBtnPurchase() {
        return this.btnPurchase.isEnabled()
            .then(() => this.btnPurchase.click())
            .then(() => log.step('CheckoutPage', 'clickBtnPurchase','click on btnPurchase'));
    }

    /**
     * записать cvc карты
     * @param cvc
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeCVC(cvc) {
        if (!utils.isRightCVC(cvc)) throw new Error(`CheckoutPage: cvc = ${cvc} is incorrect`);

        return this.txbCVC.sendKeys(cvc)
            .then(() => log.step('CheckoutPage', 'typeCVC','type CVC field'));
    }

    /**
     * записать expire карты
     * @param dd
     * @param yyyy
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        if (!utils.isRightExpire(dd, yyyy)) throw new Error(`CheckoutPage: expire = ${dd}/${yyyy} is incorrect`);

        return this.txbExpire.sendKeys(`${dd}/${yyyy}`)
            .then(() => log.step('CheckoutPage', 'typeExpire','type expire field'));
    }

    /**
     * записать номер карты
     * @param number
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeNumberCard(number) {
        if (!utils.isRightCardNumber(number)) throw new Error(`CheckoutPage: number = ${number} is incorrect`);

        return this.txbNumderCard.sendKeys(number)
            .then(() => log.step('CheckoutPage', 'typeNumberCard','type curd number field'));
    }

    /**
     * выбрать тип карты
     * @param option
     */
    selectOption(option) {
        if (!utils.isString(option)) throw new Error(`CheckoutPage: option is not a string`);
        if (!utils.isRightOption(option)) throw new Error(`CheckoutPage: not found option = ${option}`);

        return this.cmbCardType.click()
            .then(() => $(`[value=${option}]`).click())
            .then(() => log.step('CheckoutPage', 'selectOption','select cord type'));
    }

    /**
     * вернет все пункты в заказе
     * @returns {ElementArrayFinder}
     */
    getAllOrderItems() {
        log.step('CheckoutPage', 'getAllOrderItems','get all items from order');

        return this.root.findElementsByRepeater(`item in cart.items`);
    }

    /**
     * вернет массив объектов с информацией о содержимом заказа {value, name, qty}
     */
    getPropertiesOfOrderItems() {
        log.step('CheckoutPage', 'getPropertiesOfOrderItems','get prices and names from order list');

        return this.getAllOrderItems().map((item) => {

            return {
                value: item.evaluate('item.price'),
                name: item.evaluate('item.name'),
                qty : item.evaluate('item.qty')
            }
        });
    }


}

module.exports = CheckoutPage;