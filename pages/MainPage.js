let Page = require('./Page');
let utils = require(`../lib/utils`);
let baseEl = require('../elements/BaseElement');
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

        return this.rootRestaurantList.findElementsByCSS(`img.img-rounded.pull-left`)
            .get(index).click()
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
     * вернет отсортированный массив
     * @param typeProp
     * @param typeSort
     */
    sortRestaurants(typeProp, typeSort) {
        if (!utils.isString(typeProp)) throw new Error(`MainPage: typeProp is not a string`);
        if (!utils.isString(typeSort)) throw new Error(`MainPage: typeSort is not a string`);

        return this.getRestaurantProperties(typeProp)
            .then((unsorted) => {
                log.step('MainPage', 'sortRestaurants', 'get sorted array - {prop,index}');

                return unsorted.sort((a, b) => this._setTypeSort(typeSort, a, b));
            })
            .catch(console.log.bind(console));
    }

    /**
     * выбрать тип сортировки
     * @param typeSort
     * @param a
     * @param b
     * @returns {number}
     * @private
     */
    _setTypeSort(typeSort, a, b) {
        if(typeSort === 'desc') {
            return b.prop - a.prop
        } else {
            return a.prop - b.prop;
        }
    }

    /**
     * вернуть массив объектов ресторанов
     * @param prop
     */
    getRestaurantProperties(prop) {
        if (!utils.isString(prop)) throw new Error(`MainPage: prop is not a string`);

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
        return this.sortRestaurants("rating", "desc")
            .then((ratingArray) => {
                return this.sortRestaurants("price", "asc")
                    .then((priceArray) => {
                        log.step('MainPage', 'findPopularCheapestRestaurant', 'get array by price/rating - {prop,index}');

                        return ratingArray.find((currentRating, index) => currentRating.index === priceArray[index].index);
                    })
            })
            .catch(console.log.bind(console));
    }
}

module.exports = MainPage;