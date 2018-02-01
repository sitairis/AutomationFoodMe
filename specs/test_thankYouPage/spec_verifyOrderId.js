let restaurantPage = require(`../../pages/RestaurantPage`);
let checkoutPage = require(`../../pages/CheckoutPage`);
let UsersData = require('../../UsersData');
let thankYouPage = require('../../pages/ThankYouPage');
let authForm = require('../../pages/AuthPage');
let random = require('../../lib/utils/random');
let valid = require('../../lib/utils/valid');

// let servUtils = require('../../lib/utils/servUtils');
// let protrUtils = require('../../lib/utils/protrUtils');
// let log = require('../../lib/Logger');
// let utilForCuisine = require('../../lib/utils/utilForCuisine');

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

        /* let orderData = {
             deliver: {
                 name: UsersData.nameDeliver,
                 address: UsersData.address
             },
             payment: {
                 type: UsersData.type,
                 number: UsersData.numberCard,
                 expire: UsersData.expire.dd + '/' + UsersData.expire.yyyy,
                 CVC: UsersData.CVC
             }
         };

         log.testStep('test for purchase', 1, 'get cuisine(s) array from FiltersData');
        utilForCuisine.setRandomCuisineFilter(3)
             .then(() => {
                 log.testStep('test for purchase', 2, 'open restaurant');
                 return protrUtils.openPopularCheapestRestaurant()
             })
             .then(() => {
                 log.testStep('test for purchase', 3, 'save info about restaurant');
                 return restaurantPage.getRestaurantInfo()
             })
             .then((obj) => {
                 orderData.restaurant = obj;
                 return orderData;
             })
             .then(() => {
                 log.testStep('test for purchase', 4, 'add 3 random dishes');
                 return addRandomDishesInOrder(3);
             })
             .then(() => {
                 log.testStep('test for purchase', 5, 'make checkout');
                 return restaurantPage.makeCheckout()
             })
             .then(() => {
                 log.testStep('test for purchase', 6, 'save info about items in order');
                 checkoutPage.getInfoOfOrderItems()
             })
             .then((arrayItems) => {
                 orderData.items = arrayItems;
                 return orderData;
             })
             .then(() => {
                 log.testStep('test for purchase', 7, 'type payment info');
                 return typeCardData();
             })
             .then(() => {
                 log.testStep('test for purchase', 8, 'purchase');
                 return checkoutPage.clickBtnPurchase()
             })
             .then(() => {
                 log.testStep('test for purchase', 9, 'save orderID');
                 return thankYouPage.getID()
             })
             .then((id) => {
                 orderData.orderID = id;
                 return orderData;
             })
             .then(() => servUtils.createJSONFile(orderData))
             .then(() => log.testStep('test for purchase', 10, 'verify line with orderID'))
             .then(() => */


        thankYouPage.getStringWithOrderID()
            .then((text) => getOrderId(text))
            .then((orderId) => expect(orderId).toEqual(require('../../lib/orderId').orderId));
    })
});

/**
 * заполнит поля для платежа
 */
function typeCardData() {
    return checkoutPage.selectOption(UsersData.type)
        .then(() => checkoutPage.typeNumberCard(UsersData.numberCard))
        .then(() => checkoutPage.typeExpire(UsersData.expire.dd, UsersData.expire.yyyy))
        .then(() => checkoutPage.typeCVC(UsersData.CVC));
}

/**
 * добавить случайное блюдо
 * @param countDishes
 * @returns {promise.Promise<any>}
 */
function addRandomDishesInOrder(countDishes) {
    return restaurantPage.getPriceListElementsCollect().count()
        .then((count) => {
            for (let i = 0; i < countDishes; i++){
                restaurantPage.addToOrder(random.getRandomNumber(0, count));
            }
        })
        .catch((errorMessage) => Promise.reject(new Error(` : Error --- addRandomDishesInOrder : ${errorMessage}`)));
}

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