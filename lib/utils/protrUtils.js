let log = require('../Logger');
let valid = require('./valid');

let mainPage = require('../../pages/MainPage');

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
        .catch((err) => {
            log.error(`utils: Error --- doClick: ${err}`);
            throw new Error(`utils: Error --- doClick: ${err}`);
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
    if (!valid.isString(text)) {
        log.error(`utils: Error --- doSendKeys : text is not an string`);
        throw new Error(`utils: Error --- doSendKeys : text is not an string`);
    }
    if (!element) {
        log.error(`utils: Error --- doSendKeys: element is incorrect`);
        throw new Error(`utils: Error --- doSendKeys: element is incorrect`);
    }

    return element.sendKeys(text)
        .then(() => log.step('utils', 'doSendKeys', `${logText}`))
        .catch((err) => {
            log.error(`utils: Error --- doSendKeys: ${err}`);
            throw new Error(`utils: Error --- doSendKeys: ${err}`);
        });
};

/**
 * перейдет на страницу самого дешевого и популярного ресторана
 */
exports.openPopularCheapestRestaurant = function() {
    return mainPage.findPopularCheapestRestaurant()
        .then((restaurant) => mainPage.openRestaurant(restaurant.index));
};