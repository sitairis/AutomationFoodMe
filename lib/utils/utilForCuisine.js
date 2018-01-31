let FiltersData = require(`../../pages/filters/FiltersData`);
let UsersData = require('../../UsersData');
let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let log = require('../Logger');
let valid = require('./valid');
let random = require('./random');

/**
 * вернет массив объуктов "кухня"
 * @returns {Array}
 */
exports.getCuisinesObjectsArray = function () {
    let cuisines = [];

    if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
        cuisines.push(FiltersData.CUISINE[random.getRandomNumber(0, FiltersData.CUISINE.length - 1)]);
    } else {
        UsersData.cuisine.forEach((currentCuisineName) => {
            cuisines.push(findCuisineElement(currentCuisineName));
        })
    }

    if (cuisines.length === 0) {
        log.error(`utils : getCuisinesObjectsArray : Cuisines not found`);
        throw new Error(`utils : getCuisinesObjectsArray : Cuisines not found`);
    }

    log.step('utils', 'getCuisinesObjectsArray', '');

    return cuisines;
};

/**
 * Найти объект кухни с совпадающим названием
 * @param cuisineName
 * @returns {{name: string, countRestaurants: number} | undefined}
 */
function findCuisineElement(cuisineName) {
    return FiltersData.CUISINE.find((currentElement) => {
        log.step('utils', 'findCuisineElement', '');

        return cuisineName === currentElement.name
    })
}

exports.findCuisineElement = findCuisineElement;

/**
 * вернет массив названий кухонь
 * @param cuisines
 * @returns {Array}
 */
exports.getCuisinesName = function (cuisines) {
    if (!Array.isArray(cuisines)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (valid.isEmptyArray(cuisines)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

    log.step('utils', 'getCuisinesName', '');

    return cuisines.map((cuisine) => cuisine.name);
};

/**
 * устанавливает фильтр по случайным кухням
 * @param number
 * @returns {promise.Promise<any>}
 */
exports.setRandomCuisineFilter = function(number) {
    return filterPanel.setCheckBoxFilter(`Cuisines`, random.getRandomCuisinesArrayObj(number));
};