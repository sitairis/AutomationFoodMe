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
        return this.btnPurchase.isEnabled()
            .then(() => utils.doClick(this.btnPurchase, 'click on btnPurchase'))
            .then(() => log.step(this.className, 'clickBtnPurchase','click on btnPurchase'))
            .catch(() => Promise.reject(`${this.className} : Error --- clickBtnPurchase`));
    }

    /**
     * записать cvc карты
     * @param cvc
     * @returns {promise.Promise<void>}
     */
    typeCVC(cvc) {
        if (!utils.isRightCVC(cvc)) throw new Error(`CheckoutPage: cvc = ${cvc} is incorrect`);

        return utils.doSendKeys(this.txbCVC, `${cvc}`, 'type CVC field')
            .then(() => log.step(`${this.className}`, 'typeCVC','type CVC field'))
            .catch(() => Promise.reject(`${this.className} : Error --- typeCVC`));
    }

    /**
     * записать expire карты
     * @param dd
     * @param yyyy
     * @returns {promise.Promise<void>}
     */
    typeExpire(dd, yyyy) {
        if (!utils.isRightExpire(dd, yyyy)) throw new Error(`CheckoutPage: expire = ${dd}/${yyyy} is incorrect`);

        return utils.doSendKeys(this.txbExpire, `${dd}/${yyyy}`, 'type expire field')
            .then(() => log.step('CheckoutPage', 'typeExpire','type expire field'))
            .catch(() => Promise.reject(`${this.className} : Error --- typeExpire`));
    }

    /**
     * записать номер карты
     * @param number
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeNumberCard(number) {
        if (!utils.isRightCardNumber(number)) throw new Error(`CheckoutPage: number = ${number} is incorrect`);

        return utils.doSendKeys(this.txbNumderCard, `${number}`, 'type curd number field')
            .then(() => log.step('CheckoutPage', 'typeNumberCard','type curd number field'))
            .catch(() => Promise.reject(`${this.className} : Error --- typeNumberCard`));
    }

    /**
     * выбрать тип карты
     * @param option
     */
    selectOption(option) {
        if (!utils.isString(option)) throw new Error(`CheckoutPage: option is not a string`);
        if (!utils.isRightOption(option)) throw new Error(`CheckoutPage: not found option = ${option}`);

        return utils.doClick(this.cmbCardType, 'select card type')
            .then(() => utils.doClick(this.cmbCardType.$(`[value=${option}]`), 'select card type'))
            .then(() => log.step('CheckoutPage', 'selectOption','select card type'))
            .catch(() => Promise.reject(`${this.className} : Error --- selectOption`));
    }

    /**
     * вернет все пункты в заказе
     * @returns {ElementArrayFinder}
     */
    getOrderItemsElementsCollect() {
        log.step('CheckoutPage', 'getOrderItemsElementsCollect','get all items from order');

        return this.root.findElementsByRepeater(`item in cart.items`);
    }

    /**
     * вернет массив объектов с информацией о содержимом заказа {value, name, qty}
     */
    getPropertiesOfOrderItems() {
        log.step('CheckoutPage', 'getPropertiesOfOrderItems','get prices and names from order list');

        return this.getOrderItemsElementsCollect().map((item) => {

            return item.evaluate('item')
                .then((itemProperties) => {
                    return {
                        value: itemProperties.price,
                        name: itemProperties.name,
                        qty : itemProperties.qty
                    }
                })
        });
    }


}

module.exports = CheckoutPage;