let utils = require(`../utils/utils`);
let Page = require('./Page');
let Button = require('../elements/Button');
let BaseElement = require('../elements/BaseElement');
let Logger = require('../elements/Logger');

class RestaurantPage  extends Page {

    constructor() {
        super(`Restaurant Page`);
        this.log = new Logger();
        this.rootMenu = new BaseElement('rootMenu', `div.span8.fm-panel.fm-menu-list`);
        this.rootCard = new BaseElement('rootCard', `div.span4.fm-panel.fm-cart`);
        this.btnCheckout = new Button('Checkout', `div.pull-right`);
    }

    /**
     * получить перечень блюд из меню
     * @returns {ElementArrayFinder}
     */
    getAllMenu() {
        this.log.step('RestaurantPage', 'getAllMenu','***');
        return this.rootMenu.findElementsByCSS(`li.ng-scope`);
    }

    /**
     * добавить блюдо в заказ
     * @param index
     * @returns {*}
     */
    addToOrder(index) {
        this.log.step('RestaurantPage', 'addToOrder','***');
        if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);

        return this.getAllMenu().get(index).$(`a`).click();
    }

    /**
     * получить элемент с перечнем блюд в заказе
     * @returns {ElementFinder}
     */
    getOrder() {
        this.log.step('RestaurantPage', 'getOrder','***');
        return this.rootCard.findElementByCSS(`ul.unstyled`);
    }

    /**
     * список заказанных блюд
     * @returns {ElementArrayFinder}
     */
    getAllOrderList() {
        this.log.step('RestaurantPage', 'getAllOrderList','***');
        return this.getOrder().all(by.repeater(`item in cart.items`));
    }

    /**
     *
     * @returns {ElementArrayFinder}
     */
    getAllPriceList() {
        this.log.step('RestaurantPage', 'getAllPriceList','***');
        return this.rootMenu.findElementsByRepeater('menuItem in restaurant.menuItems');
    }

    /**
     * получить элемент со стоимостью заказа
     * @returns {ElementFinder}
     */
    getOrderPrice() {
        this.log.step('RestaurantPage', 'getOrderPrice','***');
        return this.rootCard.findElementByCSS(`b.ng-binding`);
    }

    /**
     * удалить блюдо из заказа
     * @param index
     * @returns {*}
     */
    removeOrderItem(index) {
        this.log.step('RestaurantPage', 'removeOrderItem','***');
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
        this.log.step('RestaurantPage', 'sortPriceByDec','***');
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
        this.log.step('RestaurantPage', 'getOrderNamesList','***');
        return orderList.$$('li').map((item) => item.evaluate('item.name'));
    }

    /**
     *
     * @returns {*}
     */
    makeCheckout() {
        this.log.step('RestaurantPage', 'makeCheckout','***');
        return this.btnCheckout.click();
    }
}

module.exports = RestaurantPage;