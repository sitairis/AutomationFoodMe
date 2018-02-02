let protrUtils = require(`../lib/utils/protrUtils`);
let Page = require('./Page');
let log = require('../lib/Logger');
let valid = require('../lib/utils/valid');
let servUtil = require('../lib/utils/servUtils');
let random = require('../lib/utils/random');
let rest = require('../lib/restaurants');

class RestaurantPage  extends Page {

    constructor() {
        super(`Restaurant Page`);
        this.className = 'RestaurantPage';
        this.rootMenu = $(`div.span8.fm-panel.fm-menu-list`);
        this.rootCard = $(`div.span4.fm-panel.fm-cart`);
        this.btnCheckout = $(`div.pull-right`);
        this.rootRestInfo = $$('div.span10');
    }

    open(randomRestId) {

        return browser.get(`http://localhost:5000/#/menu/${randomRestId}`)
            .catch((errorMessage) => Promise.reject(`${this.className} : Error --- open : ${errorMessage}`));
    }

    /**
     * добавить блюдо в заказ
     * @param index
     * @returns {promise.Promise.<void>}
     */
    addToOrder(index) {
        if (!valid.isIndexPositive(index)) {
            log.error(`${this.className} : addToOrder : index is incorrect`);
            throw new Error(`${this.className} : addToOrder : index is incorrect`);
        }

        let btnAddDishToOrder = this.getPriceListElementsCollect().$$(`a`).get(index);
        return protrUtils.doClick(btnAddDishToOrder, 'click on selected dish')
            .then(() => log.step(this.className, 'addToOrder', 'click on selected dish'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- addToOrder : ${errorMessage}`)));
    }

    /**
     * вернуть элемент с перечнем блюд в заказе
     * @returns {ElementArrayFinder}
     */
    getOrderElementsCollect() {
        log.step(this.className, 'getOrderElementsCollect', 'get element with order');

        return this.rootCard.all(by.repeater('item in cart.items'))
    }


    /**
     * вернуть перечень блюд из меню
     * @returns {ElementArrayFinder}
     */
    getPriceListElementsCollect() {
        log.step(this.className, 'getPriceListElementsCollect', 'get price list');

        return this.rootMenu.all(by.repeater('menuItem in restaurant.menuItems'));

    }

    /**
     * вернуть элемент со стоимостью заказа
     * @returns {ElementFinder}
     */
    getTotalPriceElement() {
        log.step(this.className, 'getTotalPriceElement', 'get total cost');

        return this.rootCard.$(`b.ng-binding`);
    }

    /**
     * вернет массив объектов для меню
     * @returns {promise.Promise<any[]>}
     */
    getMenuObjArray() {
        return this.getPriceListElementsCollect().map((item, index) => {
            return item.evaluate('menuItem')
                .then((menuItem) => {
                    log.step(this.className, 'getMenuObjArray', 'return objects array');

                    return servUtil.makeMenuObject(menuItem, index);
                })
        })
    }

    /**
     * вернуть сорированный по цене по убыванию массив объектов
     * @returns {promise.Promise<any>}
     */
    sortMenuByPriceDec() {
        return this.getMenuObjArray()
            .then((unSorted) => {
                log.step(this.className, 'sortMenuByPriceDec', 'get sorted by prices array ');

                return unSorted.sort((a, b) => a.value - b.value)
            })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- sortMenuByPriceDec : ${errorMessage}`)));
    }

    /**
     * вернуть массив названий блюд из заказа
     */
    getOrderInfoObjArray() {
        return this.getOrderElementsCollect().map((curItem) => {
            return curItem.evaluate('item')
                .then((item) => {
                    log.step(this.className, 'getOrderInfoObjArray', 'get array of dishes names');
                    return servUtil.makeDishObject(item);
                })
        })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- sortMenuByPriceDec : ${errorMessage}`)));
    }

    /**
     * клик на кнупку 'checkout'
     */
    makeCheckout() {
        return protrUtils.doClick(this.btnCheckout, 'click on btnCheckout')
            .then(() => log.step(this.className, 'makeCheckout', 'click on btnCheckout'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- makeCheckout : ${errorMessage}`)));
    }

    /**
     * вернеть массив с информацией о ресторане
     * @returns {promise.Promise<any[]>}
     */
    getRestaurantInfo() {
        log.step(this.className, 'getRestaurantInfo', 'get restaurant info');

        return this.rootRestInfo.map((curElem) => {
            return {
                name: curElem.$('h3').getText(),
                description: curElem.$('.span4').getText()
            }
        })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- getRestaurantInfo : ${errorMessage}`)));
    }

    /**
     * вернет название ресторана
     * @returns {*|jQuery}
     */
    getRestaurantName() {
        return $('div.span10').$('h3').getText();
    }
}

module.exports = new RestaurantPage();