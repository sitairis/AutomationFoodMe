let utils = require(`../utils/utils`);
let Page = require('./Page');

class RestaurantPage  extends Page{

    constructor() {
        super(`Restaurant Page`);
        this.rootMenu = $(`div.span8.fm-panel.fm-menu-list`);
        this.rootCard = $(`div.span4.fm-panel.fm-cart`);
    }

    getAllMenu() {
        return this.rootMenu.$$(`li.ng-scope`);
    }

    addToOrder(index) {
        if(!index) throw new Error(`RestaurantPage: index is undefined`);
        if (!utils.isNumber(index)) throw new Error(`RestaurantPage: index is no a number`);

        return this.getAllMenu().get(index).$(`a`).click();
    }

    getOrderList() {
        return this.rootCard.$(`ul.unstyled`);
    }

    getOrderPrice() {
        return this.rootCard.$(`b.ng-binding`);
    }

    removeOrderItem(index){
        if(!index) throw new Error(`RestaurantPage: index is undefined`);
        if (!utils.isNumber(index)) throw new Error(`RestaurantPage: index is not a number`);

        browser.driver.actions().mouseMove(this.getOrderList().$$(`a`).get(index)).perform();

        return this.getOrderList().$$(`a`).get(index).click();
    }


}
module.exports = RestaurantPage;