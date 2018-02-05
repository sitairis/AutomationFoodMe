let log = require('../Logger');
let valid = require('./valid');
let FiltersData = require(`../../pages/filters/FiltersData`);

/**
 * вернет массив из значений передоваемого массива объектов по переданному свойству
 * @param arrayObjects
 * @param prop
 */
exports.getArrayValuesByProperty = function (arrayObjects, prop) {
    return arrayObjects.map((currentObject) => currentObject[prop]);
};

/**
 * вернет массив без повторяющихся значений
 * @param array
 * @returns {Array}
 */
exports.dropRepeatingElement = function(array) {
    let i = array.length;
    array.sort();
    while (i--) {
        if (array[i] === array[i-1]) {
            array.splice(i, 1);
        }
    }
    return array;
};

/**
 * вернет объект для массива блюд
 * @param item
 * @returns {{value: *, name, qty: *}}
 */
exports.makeDishObject = function (item) {
    return {
        value: item.price,
        name: item.name,
        qty: item.qty
    }
};
/**
 * возвращает объект для списка меню
 * @param item
 * @param index
 * @returns {{value: *, name, index: *}}
 */
exports.makeMenuObject = function (item, index) {
    return {
        value: item.price,
        name: item.name,
        index: index
    }
};

/**
 * вернет массив строк для меню
 * @param array
 */
exports.getMenuInfoObjArray = function (array) {
    if (!Array.isArray(array)) {
        log.error(`utils: getMenuInfoObjArray : array is not an array`);
        throw new Error(`utils: getMenuInfoObjArray : array is not an array`);
    }
    if (valid.isEmptyArray(array)) {
        log.error(`utils: getMenuInfoObjArray : array is empty`);
        throw new Error(`utils: getMenuInfoObjArray : array is empty`);
    }

    log.step('utils', 'getMenuInfoObjArray', '');

    return array.map((element) => `${element.name}${element.value}`.toLowerCase() );
};

/**
 * вернет моссив из строк с названием и ценой блюд
 * @param array
 */
exports.getOrderInfoObjArray = function (array) {
    if (!Array.isArray(array)) {
        log.error(`utils: getOrderInfoObjArray : array is not an array`);
        throw new Error(`utils: getOrderInfoObjArray : array is not an array`);
    }
    if (valid.isEmptyArray(array)) {
        log.error(`utils: getOrderInfoObjArray : array is empty`);
        throw new Error(`utils: getOrderInfoObjArray : array is empty`);
    }

    log.step('utils', 'getOrderInfoObjArray', '');

    return array.map((element) => `${element.value}${element.name}${element.qty}`.toLowerCase() );
};

/**
 * запись информации о заказе в json
 * @param orderData
 */
exports.createJSONFile = function (orderData) {
    log.step('utils', 'createJSONFile', '');

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
 * получить общее количество ресторанов разных кухонь
 * @param arrayObj
 */
exports.getTotalRestCount = function (arrayObj = []) {
    if (!Array.isArray(arrayObj)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (valid.isEmptyArray(arrayObj)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

    log.step('utils', 'getTotalRestCount', '');

    return arrayObj.reduce((totalCount, elem) => {
        return totalCount + elem.countRestaurants;
    }, 0);
};

/**
 * вернет количество самых популярных/дешевых ресторанов
 * @param typeFilter
 * @param restaurants
 */
exports.getCountRatedRestaurants = function (typeFilter, restaurants = []) {
    if (!Array.isArray(restaurants)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (valid.isEmptyArray(restaurants)) {
        restaurants = FiltersData.CUISINE;
    }
    if (!valid.isValidTypeFilter(typeFilter)) {
        log.error(`utils: getCuisinesName : typeFilter is incorrect`);
        throw new Error(`utils: getCuisinesName : typeFilter is incorrect`);
    }

    let key = () => {
        if (typeFilter === 'rating') return 'countRatedRestaurants';
        return 'countCheapest';
    };

    let sortedByRating = () => {
        if (typeFilter === 'rating'){
            return restaurants.sort((a, b) => b[key()]['rating'] - a[key()]['rating']);
        }

        return restaurants.sort((a, b) => a[key()]['rating'] - b[key()]['rating']);
    };

    let sortedArray = sortedByRating();

    let firstElement = sortedArray[0];
    let arrayMaxRating = sortedArray.filter(currentElement => currentElement[key()]['rating'] === firstElement[key()]['rating']);

    log.step('utils', 'getCountRatedRestaurants', `get count restaurants filtered by ${typeFilter}`);

    return arrayMaxRating.reduce((totalCount, elem) => {
        return totalCount + elem[key()]['count'];
    }, 0);
};