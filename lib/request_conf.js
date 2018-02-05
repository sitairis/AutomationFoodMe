const fs = require('fs');

let path_conf = require('../path_conf');
let log = require('./Logger');

/**
 *
 * @param type
 * @param idUrl
 * @param data
 * @returns {{method: *, url: string, headers: {Accept: string}, json: *}}
 */
exports.reqOptJson = (type, idUrl, data) => {
    return {
        method: type,
            url:`${path_conf.baseApiURL(idUrl)}`,
            headers: headers,
            json: data
    }
};
/**
 *
 * @param fileName
 * @param obj
 * @returns {Function}
 */
exports.reqFunc = (fileName, obj={}) => function (err, response) {
    if (err) {
        log.error(`reqFunc: request ${err}`);
        throw new Error(err);
    }



        obj.info = response.body;

        fs.writeFile(`${path_conf.pth_tmp(fileName)}`, JSON.stringify(obj, null, 4), err => {
            if (err) {
                log.error(`reqFunc: request writeFile ${err}`);
                throw new Error(err.message);
            }

            log.step('request_conf', 'reqFunc', `File ${fileName} has been created`);
        });

};

let headers = {
    Accept: 'application/json'
};
