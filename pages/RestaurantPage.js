let utils = require(`../lib/utils`);
let Page = require('./Page');
let Button = require('../elements/Button');
let BaseElement = require('../elements/BaseElement');
let log = require('../lib/Logger');

class RestaurantPage  extends Page {

    constructor() {
        super(`Restaurant Page`);
        this.className = 'RestaurantPage';
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
        let btnAddDishToOrder = this.getPriceListElementsCollect().get(index).$(`a`);

        return utils.doClick(btnAddDishToOrder, 'click on selected dish')
            .then(() => log.step(this.className, 'addToOrder', 'click on selected dish'))
            .catch(() => Promise.reject(`${this.className} : Error --- addToOrder`));
    }

    /**
     * вернуть элемент с перечнем блюд в заказе
     * @returns {ElementArrayFinder}
     */
    getOrderElementsCollect() {
        log.step(this.className, 'getOrderElementsCollect', 'get element with order');

        return this.rootCard.all(by.repeater('item in cart.items'));
    }

    /**
     * вернуть перечень блюд из меню
     * @returns {ElementArrayFinder}
     */
    getPriceListElementsCollect() {
        log.step(this.className, 'getPriceListElementsCollect', 'get price list');

        return this.rootMenu.findElementsByRepeater('menuItem in restaurant.menuItems');
    }

    /**
     * вернуть элемент со стоимостью заказа
     * @returns {ElementFinder}
     */
    getTotalPriceElement() {
        log.step(this.className, 'getTotalPriceElement', 'get total cost');

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
    //     let btnRemove = this.getOrderElementsCollect().$$(`a`).get(index);
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
        return this.getPriceListElementsCollect().map((item, index) => {
            return item.evaluate('menuItem')
                .then((menuItem) => {
                    log.step(this.className, 'sortMenuByPriceDec', 'return objects array');

                    return {
                        value: menuItem.price,
                        name: menuItem.name,
                        index: index
                    }
                })

        })
            .then((unSorted) => {
                log.step(this.className, 'sortMenuByPriceDec', 'get sorted by prices array ');

                return unSorted.sort((a, b) => a.value - b.value)
            })
            .catch(() => Promise.reject(`${this.className} : Error --- sortMenuByPriceDec`));
    }

    /**
     * вернуть массив названий блюд из заказа
     */
    getOrderNamesList() {
        log.step('RestaurantPage', 'getOrderNamesList', 'get array of dishes names');

        return this.getOrderElementsCollect().map((item) => item.evaluate('item.name'))
            .catch(() => Promise.reject(`${this.className} : Error --- sortMenuByPriceDec`));
    }

    /**
     * клик на кнупку 'checkout'
     */
    makeCheckout() {
        return this.btnCheckout.click()
            .then(() => log.step(this.className, 'makeCheckout', 'click on btnCheckout'));
    }

    /**
     * вернеть массив с информацией о ресторане
     * @returns {promise.Promise<any[]>}
     */
    getRestaurantInfo() {
        log.step(this.className, 'getRestaurantInfo', 'get restaurant info');


        return $$('div.span10').map((curElem) => {
            return {
                name: curElem.$('h3').getText(),
                description: curElem.$('.span4').getText()
            }
        })
            .catch(() => Promise.reject(`${this.className} : Error --- sortMenuByPriceDec`));
    }
}

module.exports = RestaurantPage;