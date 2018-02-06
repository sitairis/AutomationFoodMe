const path = require('path');

let baseDir = __dirname;
let baseUrl = 'http://localhost:5000/';

exports.baseApiURL = {
    orderId : `${baseUrl}api/order`
};

exports.url = postFix => `http://localhost:5000/#/${postFix}`;

exports.pth_tmp = fileName => path.join(baseDir, 'tmp', fileName);



