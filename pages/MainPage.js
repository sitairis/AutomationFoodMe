let Page = require('./Page');
let utils = require(`../lib/utils`);
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');
let log = require('../lib/Logger');

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.rootRestaurantList = new baseEl('a', `div.span9.fm-panel.fm-restaurant-list`);
    }

    /**
     * вернет заголовок с количеством ресторанов
     * @returns {*}
     */
    getListTitle() {
        log.step('MainPage', 'getListTitle', 'get title of page');
        return this.rootRestaurantList.findElementsByCSS('h4').getText();
    }

    /**
     * перейти на страницу ресторана
     * @param index
     * @returns {*}
     */
    openRestaurant(index) {
        log.step('MainPage', 'openRestaurant', 'click on selected restaurant');
        if (!utils.isRightIndex(index)) throw new Error(`MainPage: index is incorrect`);

        let restaurant = this.rootRestaurantList.findElementsByCSS(`img.img-rounded.pull-left`).get(index);
        return restaurant.click();
    }

    /**
     *
     */
    getAllRestaurants() {
        log.step('MainPage', 'getAllRestaurants', 'get all list of restaurants');
        return element.all(by.repeater(`restaurant in restaurants`));
    }

    /**
     *
     */
    sortRestaurantsByPopularityDesc() {
        log.step('MainPage', 'sortRestaurantsByPopularityDesc', 'get sorted by rating array - {prop,index}');

        return this.getRestaurantProperties('rating')
            .then((unSorted) => unSorted.sort((a, b) => b.prop - a.prop));
    }

    /**
     *
     */
    sortRestaurantsByPriceAsc() {
        log.step('MainPage', 'sortRestaurantsByPriceAsc', 'get sorted by price array - {prop,index}');

        return this.getRestaurantProperties('price')
            .then((unsorted) => unsorted.sort((a, b) => a.prop - b.prop));
    }

    /**
     *
     * @param prop
     */
    getRestaurantProperties(prop) {
        log.step('MainPage', 'getRestaurantProperties', 'get array by price/rating - {prop,index}');

        return this.getAllRestaurants().map((currentRating, index) => {
            return {
                prop: currentRating.evaluate(`restaurant.${prop}`),
                index: index
            };
        })
    }

    /**
     *
     */
    findPopularCheapestRestaurant() {

        log.step('MainPage', 'findPopularCheapestRestaurant', 'get array by price/rating - {prop,index}');

        return this.sortRestaurantsByPopularityDesc()
            .then((ratingArray) => {
                return this.sortRestaurantsByPriceAsc()
                    .then((priceArray) => {

                        return ratingArray.find((currentRating, index) => currentRating.index === priceArray[index].index);
                    })
            })
    }
}

module.exports = MainPage;