let utils = require(`../utils/utils`);
let Page = require('./Page');

class RestaurantPage  extends Page{

    constructor() {
        super(`Restaurant Page`);
        this.rootMenu = $(`div.span8.fm-panel.fm-menu-list`);
        this.rootCard = $(`div.span4.fm-panel.fm-cart`);
    }

    /**
     * получить перечень блюд из меню
     * @returns {ElementArrayFinder}
     */
    getAllMenu() {
        return this.rootMenu.$$(`li.ng-scope`);
    }

    /**
     * добавить блюдо в заказ
     * @param index
     * @returns {*}
     */
    addToOrder(index) {
        if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);

        return this.getAllMenu().get(index).$(`a`).click();
    }

    /**
     * получить элемент с перечнем блюд в заказе
     * @returns {ElementFinder}
     */
    getOrderList() {
        return this.rootCard.$(`ul.unstyled`);
    }

    /**
     * получить элемент со стоимостью заказа
     * @returns {ElementFinder}
     */
    getOrderPrice() {
        return this.rootCard.$(`b.ng-binding`);
    }

    /**
     * удалить блюдо из заказа
     * @param index
     * @returns {*}
     */
    removeOrderItem(index){
        if (!utils.isRightIndex(index)) throw new Error(`RestaurantPage: index is incorrect`);

        let btnRemove = this.getOrderList().$$(`a`).get(index);
        browser.driver.actions().mouseMove(btnRemove).perform();

        return btnRemove.click();
    }
}

module.exports = RestaurantPage;