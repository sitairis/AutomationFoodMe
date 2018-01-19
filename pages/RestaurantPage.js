let utils = require(`../lib/utils`);
let Page = require('./Page');
let Button = require('../elements/Button');
let BaseElement = require('../elements/BaseElement');
let log = require('../lib/Logger');

class RestaurantPage  extends Page {

    constructor() {
        super(`Restaurant Page`);
        this.rootMenu = new BaseElement('rootMenu', `div.span8.fm-panel.fm-menu-list`);
        this.rootCard = $(`div.span4.fm-panel.fm-cart`);
        this.btnCheckout = new Button('Checkout', `div.pull-right`);
    }

    /**
     * добавить блюдо в заказ
     * @param index
     * @returns {!webdriver.promise.Promise.<void>}
     */
    addToOrder(index) {
        if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);

        return this.getAllPriceList().get(index).$(`a`).click()
            .then(() => log.step('RestaurantPage', 'addToOrder', 'click on selected dish'));
    }

    /**
     * вернуть элемент с перечнем блюд в заказе
     * @returns {ElementArrayFinder}
     */
    getOrder() {
        log.step('RestaurantPage', 'getOrder', 'get element with order');

        return this.rootCard.all(by.repeater('item in cart.items'));
    }

    /**
     * вернуть перечень блюд из меню
     * @returns {ElementArrayFinder}
     */
    getAllPriceList() {
        log.step('RestaurantPage', 'getAllPriceList', 'get price list');

        return this.rootMenu.findElementsByRepeater('menuItem in restaurant.menuItems');
    }

    /**
     * вернуть элемент со стоимостью заказа
     * @returns {ElementFinder}
     */
    getTotalPrice() {
        log.step('RestaurantPage', 'getTotalPrice', 'get total cost');

        return this.rootCard.$(`b.ng-binding`);
    }

    // /**
    //  * удалить блюдо из заказа
    //  * @param index
    //  * @returns {*}
    //  */
    // removeOrderItem(index) {
    //     if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);
    //
    //     let btnRemove = this.getOrder().$$(`a`).get(index);
    //     browser.driver.actions().mouseMove(btnRemove).perform();
    //
    //     return btnRemove.click()
    //         .then(() => log.step('RestaurantPage', 'removeOrderItem', 'click on btnRemove dish'));
    // }

    /**
     * вернуть сорированный по цене по убыванию массив объектов
     * @returns {promise.Promise<any>}
     */
    sortMenuByPriceDec() {
        return this.getAllPriceList().map((item, index) => {

            return {
                value: item.evaluate('menuItem.price'),
                name: item.evaluate('menuItem.name'),
                index: index
            };
        })
            .then((unSorted) => {
                log.step('RestaurantPage', 'sortMenuByPriceDec', 'get sorted by prices array ');

                return unSorted.sort((a, b) => a.value - b.value)
            });
    }

    /**
     * вернуть массив названий блюд из заказа
     * @param orderList
     */
    getOrderNamesList(orderList) {
        log.step('RestaurantPage', 'getOrderNamesList', 'get array of dishes names');

        return this.getOrder().map((item) => item.evaluate('item.name'));
    }

    /**
     * клик на кнупку 'checkout'
     */
    makeCheckout() {
        return this.btnCheckout.click()
            .then(() => log.step('RestaurantPage', 'makeCheckout', 'click on btnCheckout'));
    }

    /**
     * вернеть массив с информацией о ресторане
     * @returns {promise.Promise<any[]>}
     */
    getRestaurantInfo() {
        log.step('RestaurantPage', 'getRestaurantInfo', 'get restaurant info');

        return $$('div.span10').map((el) => {
            return {
                name: el.evaluate('restaurant.name'),
                description: el.evaluate('restaurant.description')
            }
        });
    }
}

module.exports = RestaurantPage;