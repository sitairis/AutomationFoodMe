let Page = require('./Page');
let utils = require(`../utils/utils`);

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.rootRestaurantList = $(`div.span9.fm-panel.fm-restaurant-list`);
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
        if (!utils.isRightIndex(index)) throw new Error(`MainPage: index is incorrect`);

        return this.rootRestaurantList.$$(`img.img-rounded.pull-left`).get(index).click();
    }

}

module.exports = MainPage;