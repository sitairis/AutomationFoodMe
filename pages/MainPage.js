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
     * перейти на страницу ресторана
     * @param index
     * @returns {*}
     */
    openRestaurant(index) {
        if (!utils.isRightIndex(index)) throw new Error(`MainPage: index is incorrect`);

        let restaurant = this.rootRestaurantList.findElementsByCSS(`img.img-rounded.pull-left`).get(index);

        return restaurant.click()
            .then(() => log.step('MainPage', 'openRestaurant', 'click on selected restaurant'));
    }

    /**
     * вернуть все рестораны
     * @returns {ElementArrayFinder}
     */
    getAllRestaurants() {
        log.step('MainPage', 'getAllRestaurants', 'get all list of restaurants');
        return element.all(by.repeater(`restaurant in restaurants`));
    }

    /**
     * вернуть отсортированный по популярности по убыванию массив ресторанов
     * @returns {Array}
     */
    sortRestaurantsByPopularityDesc() {
        return this.getRestaurantProperties('rating')
            .then((unSorted) => {
                log.step('MainPage', 'sortRestaurantsByPopularityDesc', 'get sorted by rating array - {prop,index}');

                return unSorted.sort((a, b) => b.prop - a.prop);
            })
            .catch(console.log.bind(console));
    }

    /**
     * вернуть отсортированный по цене по возрастанию массив ресторанов
     * @returns {Array}
     */
    sortRestaurantsByPriceAsc() {
        return this.getRestaurantProperties('price')
            .then((unsorted) => {
                log.step('MainPage', 'sortRestaurantsByPriceAsc', 'get sorted by price array - {prop,index}');
                return unsorted.sort((a, b) => a.prop - b.prop);
            })
            .catch(console.log.bind(console));
    }

    /**
     * вернуть массив объектов ресторанов
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
     * вернуть самый популярный, одновременно и самый дешевый ресторан
     * @returns {Object}
     */
    findPopularCheapestRestaurant() {
        return this.sortRestaurantsByPopularityDesc()
            .then((ratingArray) => {
                return this.sortRestaurantsByPriceAsc()
                    .then((priceArray) => {
                        log.step('MainPage', 'findPopularCheapestRestaurant', 'get array by price/rating - {prop,index}');

                        return ratingArray.find((currentRating, index) => currentRating.index === priceArray[index].index);
                    })
            })
            .catch(console.log.bind(console));
    }
}

module.exports = MainPage;