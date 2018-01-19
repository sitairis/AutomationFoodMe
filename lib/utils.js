let FiltersData = require(`../pages/filters/FiltersData`);
let log = require('./Logger');

/**
 * Проверка на String
 * @param value
 * @returns {boolean}
 */
function isString(value) {
    log.step('utils', 'isString', '');

    return typeof value === 'string';
}

/**
 * Проверка на Number
 * @param value
 * @returns {boolean}
 */
exports.isNumber = function (value) {
    log.step('utils', 'isNumber', '');

    return typeof value === 'number';
};

/**
 * вернет true, если значение [0;5]
 * @param value
 * @returns {boolean}
 */
exports.isRightValue = function (value) {
    log.step('utils', 'isRightValue', '');

    return value >= 0 && value < 6 && !value;
};

/**
 * вернет true, если тип фильтра задан как строка
 * @param value
 * @returns {boolean}
 */
exports.isRightTypeFilter = function (value) {
    log.step('utils', 'isRightTypeFilter', '');

    return isString(value);
};

/**
 * выдаст ошибку, если параметр - не массив или пустой массив
 * @param array
 */
function rightValues(array) {
    log.step('utils', 'rightValues', '');

    if (!Array.isArray(array)) throw new Error(`utils: values is not an array`);
    if (array.length === 0) throw new Error(`utils: values is empty`);
}

exports.rightValues = rightValues;

    /**
 * вернет true, если индекс >= 0
 * @param index
 * @returns {boolean}
 */
exports.isRightIndex = function (index) {
    log.step('utils', 'isRightIndex', '');

    return index >= 0;
};

/**
 * Получить массив объуктов "кухня"
 * @param testCuisines
 * @returns {Array}
 */
exports.getCuisines = function (testCuisines) {
    rightValues(testCuisines);

    let cuisines = [];

    if (Array.isArray(testCuisines)) {
        testCuisines.forEach((currentCuisineName) => {
            cuisines.push(findCuisineElement(currentCuisineName));
        })
    } else {
        cuisines.push(FiltersData.CUISINE[testCuisines]);
    }

    if (cuisines.length === 0) throw new Error(`spec_setCuisine : getCuisines : Cuisines not found`);
    log.step('utils', 'getCuisines', '');

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
 * получить массив названий кухонь
 * @param cuisines
 * @returns {Array}
 */
exports.getCuisinesName = function (cuisines) {
    rightValues(cuisines);
    log.step('utils', 'getCuisinesName', '');

    return cuisines.map((cuisine) => cuisine.name);
};

/**
 * плучить случайный номер кухни
 * @param min
 * @param max
 * @returns {Number}
 */
exports.getRandomCuisine = function (min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    log.step('utils', 'getRandomCuisine', '');

    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * получить общее количество ресторанов разных кухонь
 * @param arrayObj
 */
exports.getTotalCount = function (arrayObj = []) {
    rightValues(arrayObj);
    log.step('utils', 'getTotalCount', '');

    return arrayObj.reduce((totalCount, elem) => {
        return totalCount + elem.countRestaurants;
    }, 0);
};

/**
 * вернет количество самых популярных ресторанов
 * @param restaurants
 */
exports.getCountRatedRestaurants = function (restaurants = []) {
    rightValues(restaurants);

    let sortedByRating = restaurants.sort((a, b) => b.countRatedRestaurants.rating - a.countRatedRestaurants.rating);

    let firstElement = sortedByRating[0];
    let arrayMaxRating = sortedByRating.filter(currentElement => currentElement.countRatedRestaurants.rating === firstElement.countRatedRestaurants.rating);

    log.step('utils', 'getCountRatedRestaurants', '');

    return arrayMaxRating.reduce((totalCount, elem) => {
        return totalCount + elem.countRatedRestaurants.count;
    }, 0);
};

/**
 * вернет моссив из строк
 * @param array
 */
exports.getListValues = function (array) {
    rightValues(array);
    log.step('utils', 'getListValues', '');

    return array.map((element) => `${element.name}${element.value}` );
};

/**
 * вернет массив с названиями кухонь
 * @param cuisines
 */
exports.getCuisinesName = function (cuisines) {
    rightValues(cuisines);
    log.step('utils', 'getCuisinesName', '');

    return cuisines.map((cuisine) => cuisine.name);
};

/**
 *  возвращает массив со строками
 * @param array
 */
exports.getListValues = function (array) {
    rightValues(array);
    log.step('utils', 'getCuisinesName', '');

    return array.map((element) => `${element.name}${element.value}` );
};

/**
 * запись информации о заказе в json
 * @param orderData
 */
exports.createInfoJSON = function (orderData) {
    log.step('utils', 'createInfoJSON', '');

    let fs = require("fs");
    fs.writeFile("./OrderData.json", JSON.stringify(orderData), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File has been created");
    });
};
