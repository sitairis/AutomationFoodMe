
/**
 * Проверка на String
 * @param value
 * @returns {boolean}
 */
exports.isString = function (value) {
    return typeof value === 'string';
};

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
    return value > -1 && value < 6;
};
/**
 *
 * @param array
 * @returns {boolean}
 */
exports.isEmpty = function (array) {
    return array.length === 0;
};
