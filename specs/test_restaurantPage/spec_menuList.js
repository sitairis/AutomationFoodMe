let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let log = require('../../lib/Logger');

describe('test for restaurant page', () => {

    afterEach(() => {
        let btnClear = $('[ng-click="cart.reset()"]');
        let btnHome = element(by.cssContainingText('a','Home'));
        let btnCheckout = $(`div.pull-right`);

        btnCheckout.click()
            .then(() => btnClear.click())
            .then(() => btnHome.click());

    });

    it('should open restaurant, select dish and compare results', () => {

        let mainPage = new MainPage();

        log.testStep('test for restaurant page', 1, 'open restaurant');
        mainPage.openRestaurant(2)
            .then(() => {
                let restaurantPage = new RestaurantPage();

                log.testStep('test for restaurant page', 2, 'add dish to order');

                return restaurantPage.addToOrder(2)
                    .then(() => {
                        log.testStep('test for restaurant page', 3, 'get order price');

                        return restaurantPage.getTotalPrice()
                    })
                    .then((price) => {
                        let testPrice = price.getText();

                        log.testStep('test for restaurant page', 4, 'verify price');

                        expect(testPrice).toEqual('Total: $6.95');
                    });
            });
    });
});