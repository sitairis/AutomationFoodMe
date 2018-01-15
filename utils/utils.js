
/**
 * Проверка на String
 * @param value
 * @returns {boolean}
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Проверка на Number
 * @param value
 * @returns {boolean}
 */
exports.isNumber = function (value) {
    return typeof value === 'number';
};
/**
 *
 * @param value
 * @returns {boolean}
 */
exports.isRightValue = function (value) {
    return value > -1 && value < 6 && !value;
};

exports.isRightTypeFilter = function (value) {
    return isString(value);
};
/**
 *
 * @param array
 * @returns {boolean}
 */
exports.RightValues = function (array) {
    if (!Array.isArray(array)) throw new Error(`FilterRestaurantsPanel: values is not an array`);
    if (array.length === 0) throw new Error(`FilterRestaurantsPanel: values is empty`);
};

exports.isRightIndex = function (index) {
    return typeof index === 'number';
};

/**
 * Получить массив объуктов "кухня"
 * @param testCuisines
 * @returns {Array}
 */
exports.getCuisines = function (testCuisines) {
    let cuisines = [];

    if (Array.isArray(testCuisines)) {
        testCuisines.forEach((currentCuisineName) => {
            cuisines.push(findCuisineElement(currentCuisineName));
        })
    } else {
        cuisines.push(filtersData.CUISINE[testCuisines]);
    }

    if (cuisines.length === 0) throw new Error(`spec_setCuisine : getCuisines : Cuisines not found`);

    return cuisines;
};

/**
 * Найти объект кухни с совпадающим названием
 * @param cuisineName
 * @returns {{name: string, count: number} | undefined}
 */
exports.findCuisineElement = function (cuisineName) {
    return filtersData.CUISINE.find((currentElement) => {
        return cuisineName === currentElement.name
    })
};

/**
 * получить массив названий кухонь
 * @param cuisines
 * @returns {Array}
 */
exports.getCuisinesName = function (cuisines) {
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
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * получить общее количество ресторанов разных кухонь
 * @param arrayObj
 */
exports.getTotalCount = function (arrayObj) {
    return arrayObj.reduce((totalCount, elem) => {
        return totalCount + elem.count;
    }, 0);
};

/**
 *
 * @param array
 */
exports.getListValues = function (array) {
    return array.map((element) => `${element.name}${element.value}` );
};

/**
 *
 * @param cuisines
 */
exports.getCuisinesName = function (cuisines) {
    return cuisines.map((cuisine) => cuisine.name);
};