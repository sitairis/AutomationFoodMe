let Page = require('./Page');
let utils = require(`../utils/utils`);

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.rootRestaurantList = $(`.span9.fm-panel.fm-restaurant-list`);
        this.rootDeliver = $(`.breadcrumb.fm-deliver-to.ng-binding`);

    }

    /**
     * вернет заголовок с количеством ресторанов
     * @returns {*}
     */
    getListTitle() {
        return this.rootRestaurantList.$(`h4`).getText();
    }

    /**
     * перейти на страницу ресторана
     * @param index
     * @returns {*}
     */
    openRestaurant(index) {
        if(!index) throw new Error(`MainPage: index is undefined`);
        if (!utils.isNumber(index)) throw new Error(`MainPage: index is not a number`);

        return this.rootRestaurantList.$$(`img.img-rounded.pull-left`).get(index).click();
    }

}

module.exports = MainPage;