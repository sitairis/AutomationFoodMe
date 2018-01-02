let utils = require('./utils');

exports.isRightName = function (name) {

    if (!name && !utils.isString(name)) {
        throw new Error(`неверно введено имя`);
    }

};

exports.isRightAddress = function(address) {
    if (!address && !utils.isString(address)) {
        throw new Error(`неверно введен адрес`);
    }
};
