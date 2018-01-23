let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
let log = require('../lib/Logger');
let utils = require('../lib/utils');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.className = 'CheckoutPage';
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
        return utils.doClick(this.btnPurchase, 'click on btnPurchase')
            .then(() => log.step(this.className, 'clickBtnPurchase', 'click on btnPurchase'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- clickBtnPurchase : ${errorMessage}`)));
    }

    /**
     * записать cvc карты
     * @param cvc
     * @returns {promise.Promise<void>}
     */
    typeCVC(cvc) {
        return utils.doSendKeys(this.txbCVC, `${cvc}`, 'type CVC field')
            .then(() => log.step(`${this.className}`, 'typeCVC', 'type CVC field'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- typeCVC : ${errorMessage}`)));
    }

    /**
     * записать expire карты
     * @param dd
     * @param yyyy
     * @returns {promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        return utils.doSendKeys(this.txbExpire, `${dd}/${yyyy}`, 'type expire field')
            .then(() => log.step(this.className, 'typeExpire', 'type expire field'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- typeExpire : ${errorMessage}`)));
    }

    /**
     * записать номер карты
     * @param number
     * @returns promise.Promise<void>}
     */
    typeNumberCard(number) {
        return utils.doSendKeys(this.txbNumderCard, `${number}`, 'type curd number field')
            .then(() => log.step(this.className, 'typeNumberCard', 'type curd number field'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- typeNumberCard : ${errorMessage}`)));
    }

    /**
     * выбрать тип карты
     * @param option
     */
    selectOption(option) {
        if (!utils.isString(option)) {
            log.error(`${this.className} : selectOption : option is not a string`);
            throw new Error(`${this.className} : selectOption : option is not a string`);
        }
        if (!utils.isValidOption(option)) {
            log.error(`${this.className} : selectOption : not found option = ${option}`);
            throw new Error(`${this.className} : selectOption : not found option = ${option}`);
        }

        return utils.doClick(this.cmbCardType, 'select card type')
            .then(() => utils.doClick(this.cmbCardType.$(`[value=${option}]`), 'select card type'))
            .then(() => log.step(this.className, 'selectOption', 'select card type'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- selectOption : ${errorMessage}`)));
    }

    /**
     * вернет все пункты в заказе
     * @returns {ElementArrayFinder}
     */
    getOrderItemsElementsCollect() {
        log.step(this.className, 'getOrderItemsElementsCollect', 'get all items from order');

        return this.root.findElementsByRepeater(`item in cart.items`);
    }

    /**
     * вернет массив объектов с информацией о содержимом заказа {value, name, qty}
     */
    getInfoOfOrderItems() {
        return this.getOrderItemsElementsCollect().map((item) => {
            return item.evaluate('item')
                .then((itemProperties) => {
                    log.step(this.className, 'getInfoOfOrderItems', 'get prices and names from order list');
                    return {
                        value: itemProperties.price,
                        name: itemProperties.name,
                        qty: itemProperties.qty
                    }
                })
        })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- getInfoOfOrderItems : ${errorMessage}`)));
    }
}

module.exports = new CheckoutPage();