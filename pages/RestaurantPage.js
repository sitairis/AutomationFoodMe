let utils = require(`../lib/utils`);
let Page = require('./Page');
let Button = require('../elements/Button');
let BaseElement = require('../elements/BaseElement');
let log = require('../lib/Logger');

class RestaurantPage  extends Page {

    constructor() {
        super(`Restaurant Page`);
        this.rootMenu = new BaseElement('rootMenu', `div.span8.fm-panel.fm-menu-list`);
        this.rootCard = new BaseElement('rootCard', `div.span4.fm-panel.fm-cart`);
        this.btnCheckout = new Button('Checkout', `div.pull-right`);
    }

     /**
     * добавить блюдо в заказ
     * @param index
     * @returns {*}
     */
    addToOrder(index) {
        log.step('RestaurantPage', 'addToOrder','click on selected dish');
        if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);

        return this.getAllPriceList().get(index).$(`a`).click();
    }

    /**
     * получить элемент с перечнем блюд в заказе
     * @returns {ElementFinder}
     */
    getOrder() {
        log.step('RestaurantPage', 'getOrder','get element with order');
        return this.rootCard.findElementByCSS(`ul.unstyled`);
    }

    /**
     * список заказанных блюд
     * @returns {ElementArrayFinder}
     */
    getAllOrderList() {
        log.step('RestaurantPage', 'getAllOrderList','get array dishes from order');
        return this.getOrder().all(by.repeater(`item in cart.items`));
    }

    /**
     * получить перечень блюд из меню
     * @returns {ElementArrayFinder}
     */
    getAllPriceList() {
        log.step('RestaurantPage', 'getAllPriceList','get price list');
        return this.rootMenu.findElementsByRepeater('menuItem in restaurant.menuItems');
    }

    /**
     * получить элемент со стоимостью заказа
     * @returns {ElementFinder}
     */
    getOrderPrice() {
        log.step('RestaurantPage', 'getOrderPrice','get total cost');
        return this.rootCard.findElementByCSS(`b.ng-binding`);
    }

    /**
     * удалить блюдо из заказа
     * @param index
     * @returns {*}
     */
    removeOrderItem(index) {
        log.step('RestaurantPage', 'removeOrderItem','click on btnRemove dish');
        if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);

        let btnRemove = this.getOrder().$$(`a`).get(index);
        browser.driver.actions().mouseMove(btnRemove).perform();

        return btnRemove.click();
    }

    /**
     *
     * @param allItems
     * @returns {Array}
     */
    sortPriceByDec(allItems) {
        log.step('RestaurantPage', 'sortPriceByDec','get sorted by prices array ');
        return allItems.map((item, index) => {

            return {
                value: item.evaluate('menuItem.price'),
                name: item.evaluate('menuItem.name'),
                index: index
            };
        })
            .then((unSorted) => unSorted.sort((a, b) => a.value - b.value));
    }

    /**
     * названия блюд из заказа
     * @param orderList     *
     */
    getOrderNamesList(orderList) {
        log.step('RestaurantPage', 'getOrderNamesList','get array of dishes names');
        return orderList.$$('li').map((item) => item.evaluate('item.name'));
    }

    /**
     *
     * @returns {*}
     */
    makeCheckout() {
        log.step('RestaurantPage', 'makeCheckout','click on btnCheckout');
        return this.btnCheckout.click();
    }

    getRestaurantInfo() {
        return {
            name: $('div.span10 h3').getText(),
            description: $('div.span10 .span4').getText()
        }
    }
}

module.exports = RestaurantPage;