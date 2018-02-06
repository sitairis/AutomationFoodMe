let faker = require('faker');

let log = require('../../lib/Logger');
let random = require('../../lib/utils/random');

let mainPage = require(`../../pages/MainPage`);
let restaurantPage = require(`../../pages/RestaurantPage`);
let authForm = require('../../pages/AuthPage');

let restaurants = require('../../tmp/restaurants');

describe('test for restaurant page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);
    });

    it('should open restaurant, select dish and compare results', () => {

        log.testStep('test for restaurant page', 1, 'open restaurant');
        mainPage.openRestaurant(random.getRandomNumber(0, restaurants.info.length))
            .then(() => {
                log.testStep('test for restaurant page', 2, 'add dish to order');

                return addRandomDishesInOrder(3)
            })
            .then(() => {
                log.testStep('test for restaurant page', 3, 'get order price');

                return restaurantPage.getTotalPriceElement()
            })
            .then((totalPriceElement) => totalPriceElement.getText())
            .then((totalPrice) => {
                log.testStep('test for restaurant page', 4, 'verify price');
                expect(totalPrice.match(/\d+\.\d+/g)[0]).toEqual(culcTotalPriceOfOrder());
            })
    });
});

/**
 * вернет общую цену заказа
 * @returns {promise.Promise<any>}
 */
function culcTotalPriceOfOrder() {
    return restaurantPage.getOrderElementsCollect().map((currentItem) => {
        return currentItem.evaluate('item')
            .then((item) => {
                return item.price;
            })
    })
        .then((orderItems) => orderItems.reduce((total, currentItem) => total + currentItem, 0).toFixed(2))
}

/**
 * добавить случайное блюдо
 * @param countDishes
 * @returns {promise.Promise<any>}
 */
function addRandomDishesInOrder(countDishes) {
    return restaurantPage.getPriceListElementsCollect().count()
        .then((count) => {
            for (let i = 0; i < countDishes; i++) {
                restaurantPage.addToOrder(random.getRandomNumber(0, count));
            }
        })
        .catch((err) => Promise.reject(new Error(` : Error --- addRandomDishesInOrder : ${err}`)));
}