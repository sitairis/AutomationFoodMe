let faker = require('faker');

let log = require('../../lib/Logger');
let servUtils = require(`../../lib/utils/servUtils`);
let random = require('../../lib/utils/random');

let restaurants = require('../../.tmp/restaurants');
let restaurantPage = require(`../../pages/RestaurantPage`);
let checkoutPage = require(`../../pages/CheckoutPage`);
let authForm = require('../../pages/AuthPage');
let mainPage= require('../../pages/MainPage');

describe('test for checkout page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);
    });

    it('should make checkout and compare names and prices of dishes', () => {
        let infoArrayLinesFromRestPage = [];

        log.testStep('test for checkout page', 1, 'check cuisine(s) and open restaurant');
        mainPage.openRestaurant(random.getRandomNumber(0, restaurants.info.length))
            .then(() => {
                log.testStep('test for restaurant page', 2, 'add dish to order');
                return addRandomDishesInOrder(3)
            })
            .then(() => restaurantPage.getOrderElementsCollect())
            .then(() => restaurantPage.getOrderInfoObjArray())
            .then((orderInfo) => {
                infoArrayLinesFromRestPage = servUtils.getOrderInfoObjArray(orderInfo);
                return infoArrayLinesFromRestPage;
            })
            .then(() => {
                log.testStep('test for checkout page', 3, 'make checkout');
                return restaurantPage.makeCheckout()
            })
            .then(() => {
                log.testStep('test for checkout page', 4, 'compare order list and dishes list');
                return checkoutPage.getInfoOfOrderItems();
            })
            .then((infoObjArray) => servUtils.getOrderInfoObjArray(infoObjArray))
            .then((infoArrayLines) => infoArrayLines
                .forEach((line, index) => expect(line).toEqual(infoArrayLinesFromRestPage[index])));
    });
});

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
        .catch((err) => Promise.reject(new Error(` : Error --- addRandomDishesInOrder : ${err}`)));
}