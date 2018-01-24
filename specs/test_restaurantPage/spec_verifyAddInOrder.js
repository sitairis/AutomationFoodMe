let mainPage = require(`../../pages/MainPage`);
let restaurantPage = require(`../../pages/RestaurantPage`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let utils = require(`../../lib/utils`);
let faker = require('faker');

describe('test for restaurant page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);
    });


    it('should open restaurant, select dish and compare results', () => {

        log.testStep('test for restaurant page', 1, 'open restaurant');
        mainPage.openRestaurant(0)//utils.getRandomNumber(0, 39)
            .then(() => {
                log.testStep('test for restaurant page', 2, 'add dish to order');

                return utils.addRandomDishesToOrder(3)
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
 *
 * @returns {promise.Promise<any>}
 */
function culcTotalPriceOfOrder() {
    return restaurantPage.getOrderElementsCollect().map((currentItem) => {
        return currentItem.evaluate('item')
            .then((item) => item.price)
    })
        .then((orderItems) => orderItems.reduce((total, currentItem) => {
                return total + currentItem
            },0).toFixed(2))
}

