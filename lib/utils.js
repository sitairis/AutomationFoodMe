let FiltersData = require(`../pages/filters/FiltersData`);
let UsersData = require('../UsersData');
let log = require('./Logger');

/**
 * Проверка на String
 * @param value
 * @returns {boolean}
 */
function isString(value) {
    log.step('utils', 'isString', `isString = ${typeof value === 'string'}`);

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
exports.isValidRatingValue = function (value) {
    log.step('utils', 'isValidRatingValue', '');

    return value >= 0 && value < 6 && !value;
};

/**
 * вернет true, если тип фильтра задан как строка
 * @param value
 * @returns {boolean}
 */
exports.isValidTypeFilter = function (value) {
    log.step('utils', 'isValidTypeFilter', '');

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
exports.isValidIndex = function (index) {
    log.step('utils', 'isValidIndex', '');

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

    if (cuisines.length === 0) {
        log.error(`utils : getCuisines : Cuisines not found`);
        throw new Error(`utils : getCuisines : Cuisines not found`);
    }

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
    if (!Array.isArray(cuisines)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(cuisines)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

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
    if (!isNumber(min) && !min) {
        log.error('utils: getRandomCuisine - min is incorrect');
        throw new Error('utils: getRandomCuisine - min is incorrect');
    }
    if (!max && !isNumber(max)) {
        log.error('utils: getRandomCuisine - max is incorrect');
        throw new Error('utils: getRandomCuisine - max is incorrect');
    }
    if (min > max) {
        log.error('utils: getRandomCuisine - min > max');
        throw new Error('utils: getRandomCuisine - min > max');
    }

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
    if (!Array.isArray(arrayObj)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(arrayObj)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

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
    if (!Array.isArray(restaurants)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(restaurants)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

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
exports.getListRestaurantInfo = function (array) {
    if (!Array.isArray(array)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(array)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

    log.step('utils', 'getListRestaurantInfo', '');

    return array.map((element) => `${element.name}${element.value}` );
};

/**
 * вернет массив с названиями кухонь
 * @param cuisines
 */
exports.getCuisinesName = function (cuisines) {
    if (!Array.isArray(cuisines)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(cuisines)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

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

// /**
//  * проверит cvc
//  * @param cvc
//  * @returns {RegExpMatchArray | null}
//  */
// exports.isValidCVC = function (cvc) {
//     return `${cvc}`.match(/\d\d\d\d/);
// };
//
// /**
//  * проверит дату
//  * @param dd
//  * @param yyyy
//  * @returns {RegExpMatchArray | null}
//  */
// exports.isValidExpire = function (dd, yyyy) {
//     return `${dd}`.match(/\d\d/) && `${yyyy}`.match(/\d\d\d\d/);
// };
// /**
//  * проверит, номер из 13-то цифр подряд или нет
//  * @param number
//  * @returns {RegExpMatchArray | null}
//  */
// exports.isValidCardNumber = function (number) {
//     return `${number}`.match(/\d\d\d\d\d\d\d\d\d\d\d\d\d/);
// };
/**
 * проверит есть ли такой вид карточки
 * @param option
 * @returns {string | undefined}
 */
exports.isValidOption = function (option) {
    return OPTIONS.find((currentOption) => currentOption === option);
};

let OPTIONS = [
    'visa',
    'mc',
    'amex',
    'discover'
];
/**
 * обертка функции click
 * @param element
 * @param logText
 * @returns {promise.Promise<any>}
 */
exports.doClick = function(element, logText){
    if (!element) {
        log.error(`utils: Error --- doClick: element is incorrect`);
        throw new Error(`utils: Error --- doClick: element is incorrect`);
    }

    return element.isEnabled()
        .then(() => element.click())
        .then(() => log.step('utils', 'doClick',`${logText}`))
        .catch((errorMessage) => {
            log.error(`utils: Error --- doClick: ${errorMessage}`);
            throw new Error(`utils: Error --- doClick: ${errorMessage}`);
        });
};
/**
 * обертка функции sendKeys
 * @param element
 * @param text
 * @param logText
 * @returns {promise.Promise<any>}
 */
exports.doSendKeys = function (element, text, logText) {
    if (!isString(text)) {
        log.error(`utils: Error --- doSendKeys : text is not an string`);
        throw new Error(`utils: Error --- doSendKeys : text is not an string`);
    }
    if (!element) {
        log.error(`utils: Error --- doSendKeys: element is incorrect`);
        throw new Error(`utils: Error --- doSendKeys: element is incorrect`);
    }

    return element.sendKeys(text)
        .then(() => log.step('utils', 'doSendKeys', `${logText}`))
        .catch((errorMessage) => {
            log.error(`utils: Error --- doSendKeys: ${errorMessage}`);
            throw new Error(`utils: Error --- doSendKeys: ${errorMessage}`);
        });
};