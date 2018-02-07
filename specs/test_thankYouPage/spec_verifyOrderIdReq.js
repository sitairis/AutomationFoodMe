const request = require("request");

let req_conf = require('../../lib/request_conf');
let path_conf = require('../../path_conf');

let UsersData = require('../../UsersData');
let thankYouPage = require('../../pages/ThankYouPage');
let authForm = require('../../pages/AuthPage');
let valid = require('../../lib/utils/valid');

describe('test for purchase', () => {
    beforeAll(() => {
        authForm.doLogIn(UsersData.nameDeliver, UsersData.address);

        request(req_conf.reqOptJson('post', 'order', true), req_conf.reqFunc(path_conf.fileNames.order));
    });

    it('should click on purchase, get ID and make json file', () => {
        thankYouPage.open()
            .then(() => browser.ignoreSynchronization = false)
            .then(() => thankYouPage.getStringWithOrderID())
            .then((text) => getOrderId(text))
            .then((orderId) => expect(orderId)
                .toEqual(require(`${path_conf.pth_tmp(path_conf.fileNames.order)}`).info.orderId));
    })
});

/**
 * вернет id заказа из переданной строки
 * @param text
 * @returns {number}
 */
function getOrderId(text) {
    if (!valid.isString(text)) throw new Error('text is not a string');

    return Number.parseInt(text.match(/\d+/g)[0]);
}