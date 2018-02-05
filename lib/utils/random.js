let FiltersData = require(`../../pages/filters/FiltersData`);
let log = require('../Logger');
let valid = require('./valid');
let restaurantPage = require('../../pages/RestaurantPage');

/**
 * вернет массив случайных кухонь
 * @param count
 * @returns {Array}
 */
function getRandomCuisinesArrayObj(count) {
    let resArray = [];

    for (let i = 0; i < count; i++) {
        resArray.push(FiltersData.CUISINE[getRandomNumber(0, FiltersData.CUISINE.length - 1)]);
    }

    return resArray;
}

exports.getRandomCuisinesArrayObj = getRandomCuisinesArrayObj;

/**
 * вернет случайное число
 * @param min
 * @param max
 * @returns {Number}
 */
function getRandomNumber(min, max) {
    if (!valid.isNumber(min) && !min) {
        log.error('utils: getRandomNumber - min is incorrect');
        throw new Error('utils: getRandomNumber - min is incorrect');
    }
    if (!max && !valid.isNumber(max)) {
        log.error('utils: getRandomNumber - max is incorrect');
        throw new Error('utils: getRandomNumber - max is incorrect');
    }
    if (min > max) {
        log.error('utils: getRandomNumber - min > max');
        throw new Error('utils: getRandomNumber - min > max');
    }

    min = Math.ceil(min);
    max = Math.floor(max);

    log.step('utils', 'getRandomNumber', '');

    return Math.floor(Math.random() * (max - min)) + min;
}

exports.getRandomNumber = getRandomNumber;