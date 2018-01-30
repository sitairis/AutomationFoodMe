let utils = require(`../lib/utils`);
let Page = require('./Page');
let BaseElement = require('../elements/BaseElement');
let log = require('../lib/Logger');

class RestaurantPage  extends Page {

    constructor() {
        super(`Restaurant Page`);
        this.className = 'RestaurantPage';
        this.rootMenu = new BaseElement('rootMenu', `div.span8.fm-panel.fm-menu-list`);
        this.rootCard = $(`div.span4.fm-panel.fm-cart`);
        this.btnCheckout = $(`div.pull-right`);
    }

    /**
     * добавить блюдо в заказ
     * @param index
     * @returns {promise.Promise.<void>}
     */
    addToOrder(index) {
        if (!utils.isIndexPositive(index)) {
            log.error(`${this.className} : addToOrder : index is incorrect`);
            throw new Error(`${this.className} : addToOrder : index is incorrect`);
        }

        let btnAddDishToOrder = this.getPriceListElementsCollect().$$(`a`).get(index);
        return utils.doClick(btnAddDishToOrder, 'click on selected dish')
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

        return element.all(by.repeater('menuItem in restaurant.menuItems'));

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
     *
     * @returns {promise.Promise<any[]>}
     */
    getMenuObjArray() {
        return this.getPriceListElementsCollect().map((item, index) => {
            return item.evaluate('menuItem')
                .then((menuItem) => {
                    log.step(this.className, 'getMenuObjArray', 'return objects array');

                    return utils.makeMenuObject(menuItem, index);
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
                    return utils.makeDishObject(item);
                })
        })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- sortMenuByPriceDec : ${errorMessage}`)));
    }

    /**
     * клик на кнупку 'checkout'
     */
    makeCheckout() {
        return utils.doClick(this.btnCheckout, 'click on btnCheckout')
            .then(() => log.step(this.className, 'makeCheckout', 'click on btnCheckout'))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- makeCheckout : ${errorMessage}`)));
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
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- getRestaurantInfo : ${errorMessage}`)));
    }
}

module.exports = new RestaurantPage();