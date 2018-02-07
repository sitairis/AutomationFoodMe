const path = require('path');

let baseDir = __dirname;
// let baseUrl = 'http://localhost:5000/';

exports.baseApiURL = postFix => `http://localhost:5000/api/${postFix}`;

exports.url = postFix => `http://localhost:5000/#/${postFix}`;

exports.pth_tmp = fileName => path.join(baseDir, 'tmp', fileName);

exports.fileNames = {
    order: 'orderId.json',
    rest: 'restInfoWithDetails.json',
    allRest: 'restaurants.json'
};

