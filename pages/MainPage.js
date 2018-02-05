let log = require('../lib/Logger');
let valid = require('../lib/utils/valid');
let protrUtils = require(`../lib/utils/protrUtils`);
let Page = require('./Page');

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.className = 'MainPage';
        this.rootRestaurantList = $(`div.span9.fm-panel.fm-restaurant-list`);
    }

    /**
     * перейти на страницу ресторана
     * @param index
     * @returns {*}
     */
    openRestaurant(index) {
        if (!valid.isIndexPositive(index)) {
            log.error(`${this.className} : openRestaurant : index is incorrect`);
            throw new Error(`${this.className} : openRestaurant : index is incorrect`);
        }
        let elementForClick = this.rootRestaurantList.$$(`img.img-rounded.pull-left`).get(index);

        return protrUtils.doClick(elementForClick, 'click on selected restaurant')
            .then(() => log.step(this.className, 'openRestaurant', 'click on selected restaurant'))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- openRestaurant : ${err}`)));
    }

    /**
     * вернуть все рестораны
     * @returns {ElementArrayFinder}
     */
    getRestaurantsElementsCollect() {
        log.step(this.className, 'getRestaurantsElementsCollect', 'get all list of restaurants');

        return element.all(by.repeater(`restaurant in restaurants`));
    }

    /**
     * вернет отсортированный массив
     * @param typeProp
     * @param typeSort
     */
    sortRestaurants(typeProp, typeSort) {
        if (!valid.isString(typeProp)) {
            log.error(`${this.className} : sortRestaurants : typeProp is not a string`);
            throw new Error(`${this.className} : sortRestaurants : typeProp is not a string`);
        }
        if (!valid.isString(typeSort)) {
            log.error(`${this.className} : sortRestaurants : typeSort is not a string`);
            throw new Error(`${this.className} : sortRestaurants : typeSort is not a string`);
        }

        return this.getRestaurantProperties(typeProp)
            .then((unsorted) => {
                log.step(this.className, 'sortRestaurants', 'get sorted array - {prop,index}');

                return unsorted.sort((a, b) => this._setTypeSort(typeSort, a, b));
            })
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- sortRestaurants : ${err}`)));
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
        return typeSort === 'desc' ? b.prop - a.prop : a.prop - b.prop;
    }

    /**
     * вернуть массив объектов ресторанов
     * @param prop
     */
    getRestaurantProperties(prop) {
        if (!valid.isString(prop)) {
            log.error(`${this.className} : prop is not a string`);
            throw new Error(`${this.className} : getRestaurantProperties : prop is not a string`);
        }

        log.step(this.className, 'getRestaurantProperties', 'get array by price/rating - {prop,index}');

        return this.getRestaurantsElementsCollect().map((currentRating, index) => {
            return {
                prop: currentRating.evaluate(`restaurant.${prop}`),
                index: index
            };
        })
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- getRestaurantProperties : ${err}`)));
    }

    /**
     * вернуть самый популярный, одновременно и самый дешевый ресторан
     * @returns {Object}
     */
    findPopularCheapestRestaurant() {

        return Promise.all([
            this.sortRestaurants("rating", "desc"),
            this.sortRestaurants("price", "asc")
        ])
            .then((resArray) => {
                let firstArray = resArray[0];
                let secondArray = resArray[1];

                return firstArray.find((currentElement, index) => currentElement.index === secondArray[index].index);
            })
            .catch((err) => Promise
                .reject(new Error(`${this.className} : Error --- findPopularCheapestRestaurant : ${err}`)));

    }
}

module.exports = new MainPage();