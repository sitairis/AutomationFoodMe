let FiltersData = require(`../pages/filters/FiltersData`);
let UsersData = require('../UsersData');
let filterPanel = require(`../pages/filters/FilterRestaurantsPanel`);
let mainPage = require('../pages/MainPage');
let restaurantPage = require('../pages/RestaurantPage');
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
    log.step('utils', 'isNumber', `isNumber = ${typeof value === 'number'}`);

    return typeof value === 'number';
}

exports.isNumber = isNumber;

/**
 * вернет true, если значение [0;5]
 * @param value
 * @returns {boolean}
 */
exports.isValidRatingValue = function (value) {
    log.step('utils', 'isValidRatingValue', ``);

    return value >= 0 && value < 5;
};

/**
 * вернет true, если тип фильтра задан как строка
 * @param value
 * @returns {boolean}
 */
function isValidTypeFilter(value) {
    log.step('utils', 'isValidTypeFilter', '');

    return  isString(value) && (value === 'price' || value === 'rating');
}

exports.isValidTypeFilter = isValidTypeFilter;

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
exports.isIndexPositive = function (index) {
    log.step('utils', 'isIndexPositive', '');

    return index >= 0;
};

/**
 * вернет массив объуктов "кухня"
 * @returns {Array}
 */
exports.getCuisinesObjectsArray = function () {
    let cuisines = [];

    if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
        cuisines.push(FiltersData.CUISINE[getRandomNumber(0, FiltersData.CUISINE.length - 1)]);
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
function getRandomNumber(min, max) {
    if (!isNumber(min) && !min) {
        log.error('utils: getRandomNumber - min is incorrect');
        throw new Error('utils: getRandomNumber - min is incorrect');
    }
    if (!max && !isNumber(max)) {
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
 * вернет количество самых популярных/дешевых ресторанов
 * @param typeFilter
 * @param restaurants
 */
exports.getCountRatedRestaurants = function (typeFilter, restaurants = []) {
    if (!Array.isArray(restaurants)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(restaurants)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }
    if (!isValidTypeFilter(typeFilter)) {
        log.error(`utils: getCuisinesName : typeFilter is incorrect`);
        throw new Error(`utils: getCuisinesName : typeFilter is incorrect`);
    }

    let key = () => {
        if (typeFilter === 'rating') return 'countRatedRestaurants';
    return 'countCheapest';
    };
    let prop = key();

    let sortedByRating = () => {
        if (typeFilter === 'rating'){
            return restaurants.sort((a, b) => b[prop]['rating'] - a[prop]['rating']);
        }

        return restaurants.sort((a, b) => a[prop]['rating'] - b[prop]['rating']);
    };

    let sortedArray = sortedByRating();

    let firstElement = sortedArray[0];
    let arrayMaxRating = sortedArray.filter(currentElement => currentElement[key()]['rating'] === firstElement[key()]['rating']);

    log.step('utils', 'getCountRatedRestaurants', `get count restaurants filtered by ${typeFilter}`);

    return arrayMaxRating.reduce((totalCount, elem) => {
        return totalCount + elem[prop]['count'];
    }, 0);
};

/**
 * вернет моссив из строк с названием и ценой блюд
 * @param array
 */
exports.getOrderInfoObjArray = function (array) {
    if (!Array.isArray(array)) {
        log.error(`utils: getCuisinesName : array is not an array`);
        throw new Error(`utils: getCuisinesName : array is not an array`);
    }
    if (isEmptyArray(array)) {
        log.error(`utils: getCuisinesName : array is empty`);
        throw new Error(`utils: getCuisinesName : array is empty`);
    }

    log.step('utils', 'getOrderInfoObjArray', '');

    return array.map((element) => `${element.value}${element.name}${element.qty}`.toLowerCase() );
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

// /**
//  * добавит в заказ случайные блюда
//  * @param countDishes
//  * @returns {promise.Promise<any>}
//  */
// exports.addRandomDishesInOrder = function(countDishes) {
//     return element.all(by.repeater('menuItem in restaurant.menuItems')).count()
//         .then((count) => {
//             for (let i = 0; i < countDishes; i++){
//                 restaurantPage.addToOrder(getRandomNumber(0, count));
//             }
//         })
//         .catch((errorMessage) => Promise.reject(new Error(`utils : Error --- addRandomDishesInOrder : ${errorMessage}`)));
// };

/**
 * перейдет на страницу самого дешевого и популярного ресторана
 */
exports.openPopularCheapestRestaurant = function() {
    return mainPage.findPopularCheapestRestaurant()
        .then((restaurant) => mainPage.openRestaurant(restaurant.index));
};

/**
 * устанавливает фильтр по случайным кухням
 * @param number
 * @returns {promise.Promise<any>}
 */
exports.setCuisineFilter = function(number) {
    return filterPanel.setCheckBoxFilter(`Cuisines`, getRandomCuisinesArrayObj(number));
};
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

exports.makeDishObject = function (item) {
    return {
        value: item.price,
        name: item.name,
        qty: item.qty
    }
};

exports.makeMenuObject = function (item, index) {
    return {
        value: item.price,
        name: item.name,
        index: index
    }
};