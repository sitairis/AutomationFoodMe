let mainPage = require(`../../pages/MainPage`);
let restaurantPage = require(`../../pages/RestaurantPage`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let utils = require(`../../lib/utils`);

describe('test for restaurant page', () => {

    beforeAll(() => authForm.doLogIn());

    it('should open restaurant, select dish and compare results', () => {

        log.testStep('test for restaurant page', 1, 'open restaurant');
        mainPage.openRestaurant(utils.getRandomNumber(0, 39))
            .then(() => {
                log.testStep('test for restaurant page', 2, 'add dish to order');

                return addRandomDishesToOrder(3)
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

function addRandomDishesToOrder(countDishes) {
    return restaurantPage.getPriceListElementsCollect().count()
        .then((count) => {
            for (let i = 0; i < countDishes; i++) {
                restaurantPage.addToOrder(utils.getRandomNumber(0, count));
            }
        })
}

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

