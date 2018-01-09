
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