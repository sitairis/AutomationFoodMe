let Page = require('./Page');
let baseEl = require('../elements/BaseElement');
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

    /**
     * кликнет на кнопку 'perchase'
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
        return this.txbExpire.sendKeys(`${dd}/${yyyy}`)
            .then(() => log.step('CheckoutPage', 'typeExpire','type expire field'));
    }

    /**
     * записать номер карты
     * @param number
     * @returns {ActionSequence | promise.Promise<void> | promise.Promise<void> | * | ActionSequence | webdriver.promise.Promise<void>}
     */
    typeNumberCard(number) {
        return this.txbNumderCard.sendKeys(number)
            .then(() => log.step('CheckoutPage', 'typeNumberCard','type curd number field'));
    }

    /**
     * выбрать тип карты
     * @param option
     */
    selectOption(option) {
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