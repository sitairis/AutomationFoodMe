const path = require('path');

let baseDir = __dirname;

exports.baseApiURL = postFix => `http://192.168.12.161:5000/api/${postFix}`;

exports.url = postFix => `http://192.168.12.161:5000/#/${postFix}`;

exports.pth_tmp = fileName => path.join(baseDir, 'tmp', fileName);

exports.fileNames = {
    order: 'orderId.json',
    rest: 'restInfoWithDetails.json',
    allRest: 'restaurants.json'
};

