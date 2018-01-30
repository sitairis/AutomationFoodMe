let restaurantPage = require(`../../pages/RestaurantPage`);
let checkoutPage = require(`../../pages/CheckoutPage`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let thankYouPage = require('../../pages/ThankYouPage');
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let utilForCuisine = require('../../lib/utils/utilForCuisine');
let random = require('../../lib/utils/random');

describe('test for purchase', () => {
    beforeAll(() => {
        authForm.doLogIn(UsersData.nameDeliver, UsersData.address);
    });

    it('should click on purchase, get ID and make json file', () => {

        let orderData = {
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
        utilForCuisine.setCuisineFilter(3)
            .then(() => {
                log.testStep('test for purchase', 2, 'open restaurant');
                return utils.openPopularCheapestRestaurant()
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
            .then(() => utils.createJSONFile(orderData))
            .then(() => log.testStep('test for purchase', 10, 'verify line with orderID'))
            .then(() => thankYouPage.getStringWithOrderID())
            .then((text) => expect(text.match(/\d\d\d\d\d\d\d\d\d\d\d\d\d/)).not.toBe(null));
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