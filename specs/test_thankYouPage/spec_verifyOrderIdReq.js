let UsersData = require('../../UsersData');
let thankYouPage = require('../../pages/ThankYouPage');
let authForm = require('../../pages/AuthPage');
let valid = require('../../lib/utils/valid');


describe('test for purchase', () => {
    beforeAll(() => {
        authForm.doLogIn(UsersData.nameDeliver, UsersData.address);
        const request = require("request");
        const fs = require('fs');

        let requestOpt = {
            method: 'post',
            url: 'http://localhost:5000/api/order',
            headers: {
                Accept: 'application/json'
            },
            json: true
        };

        request(requestOpt, (err, response) => {
            if (err) throw new Error(err);

            let objForAllRst = response.body;

            fs.writeFile("./lib/orderId.json", JSON.stringify(objForAllRst), (err) => {
                if (err) throw new Error(err.message);

                console.log("File orderId.json has been created");
            });
        });

    });

    it('should click on purchase, get ID and make json file', () => {
        thankYouPage.open()
            .then(() => browser.ignoreSynchronization = false)
            .then(() => thankYouPage.getStringWithOrderID())
            .then((text) => getOrderId(text))
            .then((orderId) => expect(orderId).toEqual(require('../../lib/orderId').orderId));
    })
});

/**
 * вернет id заказа из переданной строки
 * @param text
 * @returns {number}
 */
function getOrderId(text) {
    if (!valid.isString(text)) throw new Error('text is not a string');

    let arrayWithOrderId = text.split(/\D/);
    let orderIdStr = arrayWithOrderId.find((curElem) => curElem !== '' && !isNaN(Number.parseInt(curElem)));
    return Number.parseInt(orderIdStr);
}