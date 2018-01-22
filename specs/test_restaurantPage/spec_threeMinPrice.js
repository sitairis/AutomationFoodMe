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

    it('should open restaurant, select dishes and compare names', () => {

        let mainPage = new MainPage();

        log.testStep('test for restaurant page', 1, 'open restaurant');

        mainPage.openRestaurant(0)
            .then(() => {
                let restaurantPage = new RestaurantPage();
                let nameList = [];

                log.testStep('test for restaurant page', 1, 'sort dishes by price');

                restaurantPage.sortMenuByPriceDec()
                    .then((SortedPrices) => {
                        log.testStep('test for restaurant page', 2, 'add the first three dishes');

                        let threeMinPrices = SortedPrices.slice(0, 3);

                        nameList = SortedPrices.map((price) => price.name);

                        return threeMinPrices.forEach((price) => restaurantPage.addToOrder(price.index));
                    })
                    .then(() => {
                        log.testStep('test for restaurant page', 3, 'get array names of dishes in order');

                        return restaurantPage.getOrderNamesList();
                    })
                    .then((orderNamesList) => {
                        log.testStep('test for restaurant page', 4, 'verify names');

                        orderNamesList.forEach((name, index) => expect(name).toEqual(nameList[index]))
                    });
            });
    });
});