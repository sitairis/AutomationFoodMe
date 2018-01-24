let restaurantPage = require(`../../pages/RestaurantPage`);
let checkoutPage = require(`../../pages/CheckoutPage`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let thankYouPage = require('../../pages/ThankYouPage');
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let faker = require('faker');

describe('test for purchase', () => {
    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;
        authForm.doLogIn(randomName, randomAddress);
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
        utils.setCuisineFilter(3)
            .then(() => utils.openPopularCheapestRestaurant())
            .then(() => {
                log.testStep('test for purchase', 5, 'save info about restaurant');
                return restaurantPage.getRestaurantInfo()
            })
            .then((obj) => {
                orderData.restaurant = obj;
                return orderData;
            })
            .then(() => utils.addRandomDishesToOrder())
            .then(() => {
                log.testStep('test for purchase', 8, 'make checkout');
                return restaurantPage.makeCheckout()
            })
            .then(() => {
                log.testStep('test for purchase', 9, 'save info about items in order');
                checkoutPage.getInfoOfOrderItems()
            })
            .then((arrayItems) => {
                orderData.items = arrayItems;
                return orderData;
            })
            .then(() => {
                log.testStep('test for purchase', 10, 'type payment info');
                return typeCardData();
            })
            .then(() => {
                log.testStep('test for purchase', 11, 'purchase');
                return checkoutPage.clickBtnPurchase()
            })
            .then(() => {
                log.testStep('test for purchase', 13, 'save orderID');
                return thankYouPage.getID()
            })
            .then((id) => {
                orderData.orderID = id;
                return orderData;
            })
            .then(() => utils.createInfoJSON(orderData))
            .then(() => log.testStep('test for purchase', 14, 'verify line with orderID'))
            .then(() => thankYouPage.getStringWithOrderID())
            .then((text) => expect(text.match(/ID is \d\d\d\d\d\d\d\d\d\d\d\d\d/)).not.toBe(null));
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