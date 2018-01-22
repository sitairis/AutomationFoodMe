let FiltersData = require(`../pages/filters/FiltersData`);
let UsersData = require('../UsersData');
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

exports.isString = isString;

/**
 * Проверка на Number
 * @param value
 * @returns {boolean}
 */
function isNumber(value) {
    log.step('utils', 'isNumber', '');

    return typeof value === 'number';
}

exports.isNumber = isNumber;

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

    return  isString(value) && (value === 'price' || value === 'rating');
};

/**
 * выдаст ошибку, если параметр - не массив или пустой массив
 * @param array
 */
function isEmptyArray(array) {
    log.step('utils', 'rightValues', '');

    return array.length === 0;
}

exports.isEmptyArray = isEmptyArray;

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
 * вернет массив объуктов "кухня"
 * @returns {Array}
 */
exports.getCuisines = function () {
    let cuisines = [];

    if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
        cuisines.push(FiltersData.CUISINE[utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1)]);
    } else {
        UsersData.cuisine.forEach((currentCuisineName) => {
            cuisines.push(findCuisineElement(currentCuisineName));
        })
    }

    if (cuisines.length === 0) throw new Error(`utils : getCuisines : Cuisines not found`);
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
 * вернет массив названий кухонь
 * @param cuisines
 * @returns {Array}
 */
exports.getCuisinesName = function (cuisines) {
    if (!Array.isArray(cuisines)) throw new Error(`utils: array is not an array`);
    if (isEmptyArray(cuisines)) throw new Error(`utils: array is empty`);

    log.step('utils', 'getCuisinesName', '');

    return cuisines.map((cuisine) => cuisine.name);
};

/**
 * вернет случайный номер кухни
 * @param min
 * @param max
 * @returns {Number}
 */
exports.getRandomCuisine = function (min, max) {
    if (!isNumber(min) && !min) throw new Error('utils: getRandomCuisine - min is incorrect');
    if (!max && !isNumber(max)) throw new Error('utils: getRandomCuisine - max is incorrect');
    if (min > max) throw new Error('utils: getRandomCuisine - min > max');

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
    if (!Array.isArray(arrayObj)) throw new Error(`utils: array is not an array`);
    if (isEmptyArray(arrayObj)) throw new Error(`utils: array is empty`);

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
    if (!Array.isArray(restaurants)) throw new Error(`utils: array is not an array`);
    if (isEmptyArray(restaurants)) throw new Error(`utils: array is empty`);

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
    if (!Array.isArray(array)) throw new Error(`utils: array is not an array`);
    if (isEmptyArray(array)) throw new Error(`utils: array is empty`);

    log.step('utils', 'getListValues', '');

    return array.map((element) => `${element.name}${element.value}` );
};

/**
 * вернет массив с названиями кухонь
 * @param cuisines
 */
exports.getCuisinesName = function (cuisines) {
    if (!Array.isArray(cuisines)) throw new Error(`utils: array is not an array`);
    if (isEmptyArray(cuisines)) throw new Error(`utils: array is empty`);

    log.step('utils', 'getCuisinesName', '');

    return cuisines.map((cuisine) => cuisine.name);
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

/**
 * проверит cvc
 * @param cvc
 * @returns {RegExpMatchArray | null}
 */
exports.isRightCVC = function (cvc) {
    return `${cvc}`.match(/\d\d\d\d/);
};

/**
 * проверит дату
 * @param dd
 * @param yyyy
 * @returns {RegExpMatchArray | null}
 */
exports.isRightExpire = function (dd, yyyy) {
    return `${dd}`.match(/\d\d/) && `${yyyy}`.match(/\d\d\d\d/);
};
/**
 * проверит, номер из 13-то цифр подряд или нет
 * @param number
 * @returns {RegExpMatchArray | null}
 */
exports.isRightCardNumber = function (number) {
    return `${number}`.match(/\d\d\d\d\d\d\d\d\d\d\d\d\d/);
};
/**
 * проверит есть ли такой вид карточки
 * @param option
 * @returns {string | undefined}
 */
exports.isRightOption = function (option) {
    return OPTIONS.find((currentOption) => currentOption === option);
};

let OPTIONS = [
    'visa',
    'mc',
    'amex',
    'discover'
];