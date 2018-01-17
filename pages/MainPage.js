let Page = require('./Page');
let utils = require(`../utils/utils`);
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');
let Logger = require('../elements/Logger');

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.log = new Logger();
        this.rootRestaurantList = new baseEl('a', `div.span9.fm-panel.fm-restaurant-list`);
    }

    /**
     * вернет заголовок с количеством ресторанов
     * @returns {*}
     */
    getListTitle() {
        this.log.step('MainPage', 'getListTitle', '***');
        return this.rootRestaurantList.findElementsByCSS('h4').getText();
    }

    /**
     * перейти на страницу ресторана
     * @param index
     * @returns {*}
     */
    openRestaurant(index) {
        this.log.step('MainPage', 'openRestaurant', '***');
        if (!utils.isRightIndex(index)) throw new Error(`MainPage: index is incorrect`);

        let restaurant = this.rootRestaurantList.findElementsByCSS(`img.img-rounded.pull-left`).get(index);
        return restaurant.click();
    }

    /**
     *
     */
    getAllRestaurants() {
        this.log.step('MainPage', 'getAllRestaurants', '***');
        return element.all(by.repeater(`restaurant in restaurants`));
    }

    //
    // /**
    //  * Неправильный
    //  * @param allItems
    //  */
    // sortByPriceDesc(allItems){
    //     this.log.step('MainPage', 'sortByPriceDesc','***');
    //     return allItems.map((item, index) => {
    //
    //         return {
    //             value: item.evaluate('menuItem.price'),
    //             name: item.evaluate('menuItem.name'),
    //             index: index
    //         };
    //     })
    //         .then((unSorted) => unSorted.sort((a, b) => a.value - b.value));
    // }

    /**
     *
     */
    sortRestaurantsByPopularityDesc() {

        return this.getAllRestaurants().map((currentRating, index) => {
            return {
                value: currentRating.evaluate('restaurant.rating'),
                index: index
            };
        })
            .then((unSorted) => unSorted.sort((a, b) => a.value - b.value));

    }

}

module.exports = MainPage;