const path = require('path');

let baseDir = __dirname;

exports.baseApiURL = postFix => `http://localhost:5000/api/${postFix}`;
exports.baseURL = postFix => `http://localhost:5000/#/${postFix}`;

exports.pth_lib = fileName => path.join(baseDir, 'lib', fileName);
exports.pth_lib = fileName => path.join(baseDir, 'lib', 'utils', fileName);

exports.pth_page = fileName => path.join(baseDir, 'pages', fileName);
exports.pth_filters = fileName => path.join(baseDir, 'pages', 'filters', fileName);

exports.pth_tmp = fileName => path.join(baseDir, '.tmp', fileName);



