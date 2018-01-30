let log = require('../Logger');
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