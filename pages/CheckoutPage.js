let log = require('../lib/Logger');

let protrUtils = require('../lib/utils/protrUtils');
let servUtils = require('../lib/utils/servUtils');
let valid = require('../lib/utils/valid');

let Page = require('./Page');

class CheckoutPage  extends Page {

    constructor() {
        super(`Checkout Page`);
        this.className = 'CheckoutPage';
        this.root = $('table');
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

        return protrUtils.doClick(this.btnPurchase, 'click on btnPurchase')
            .then(() => log.step(this.className, 'clickBtnPurchase', 'click on btnPurchase'))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- clickBtnPurchase : ${err}`)));
    }

    /**
     * записать cvc карты
     * @param cvc
     * @returns {promise.Promise<void>}
     */
    typeCVC(cvc) {
        return protrUtils.doSendKeys(this.txbCVC, `${cvc}`, 'type CVC field')
            .then(() => log.step(`${this.className}`, 'typeCVC', 'type CVC field'))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- typeCVC : ${err}`)));
    }

    /**
     * записать expire карты
     * @param dd
     * @param yyyy
     * @returns {promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        return protrUtils.doSendKeys(this.txbExpire, `${dd}/${yyyy}`, 'type expire field')
            .then(() => log.step(this.className, 'typeExpire', 'type expire field'))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- typeExpire : ${err}`)));
    }

    /**
     * записать номер карты
     * @param number
     * @returns promise.Promise<void>}
     */
    typeNumberCard(number) {
        return protrUtils.doSendKeys(this.txbNumderCard, `${number}`, 'type curd number field')
            .then(() => log.step(this.className, 'typeNumberCard', 'type curd number field'))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- typeNumberCard : ${err}`)));
    }

    /**
     * выбрать тип карты
     * @param option
     */
    selectOption(option) {
        if (!valid.isString(option)) {
            log.error(`${this.className} : selectOption : option is not a string`);
            throw new Error(`${this.className} : selectOption : option is not a string`);
        }
        if (!valid.isValidOption(option)) {
            log.error(`${this.className} : selectOption : not found option = ${option}`);
            throw new Error(`${this.className} : selectOption : not found option = ${option}`);
        }

        return protrUtils.doClick(this.cmbCardType, 'select card type')
            .then(() => protrUtils.doClick(this.cmbCardType.$(`[value=${option}]`), 'select card type'))
            .then(() => log.step(this.className, 'selectOption', 'select card type'))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- selectOption : ${err}`)));
    }

    /**
     * вернет все пункты в заказе
     * @returns {ElementArrayFinder}
     */
    getOrderItemsElementsCollect() {
        log.step(this.className, 'getOrderItemsElementsCollect', 'get all items from order');

        return this.root.all(by.repeater(`item in cart.items`));
    }

    /**
     * вернет массив объектов с информацией о содержимом заказа {value, name, qty}
     */
    getInfoOfOrderItems() {
        return this.getOrderItemsElementsCollect().map((item) => {
            return item.evaluate('item')
                .then((itemProperties) => {
                    log.step(this.className, 'getInfoOfOrderItems', 'get prices and names from order list');
                    return servUtils.makeDishObject(itemProperties);
                })
        })
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- getInfoOfOrderItems : ${err}`)));
    }
}

module.exports = new CheckoutPage();