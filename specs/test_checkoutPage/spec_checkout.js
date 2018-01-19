let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require(`../../UsersData`);
let utils = require(`../../lib/utils`);
let log = require('../../lib/Logger');

describe('test for checkout page', () => {


    afterEach(() => {
        let btnClear = $('[ng-click="cart.reset()"]');
        let btnHome = element(by.cssContainingText('a','Home'));

        btnClear.click()
            .then(() => btnHome.click());

    });

    it('should make checkout and compare names and prices of dishes', () => {

        let mainPage = new MainPage();
        let filterPanel = new FilterPanel();

        log.testStep('test for checkout page', 1, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisines();

        log.testStep('test for checkout page', 2, 'check cuisine(s)');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => {
                log.testStep('test for checkout page', 3, 'get the most popular and the cheapest restaurant');
                return mainPage.findPopularCheapestRestaurant();
            })
            .then((restaurant) => {
                log.testStep('test for checkout page', 4, 'open selected restaurant');
                return mainPage.openRestaurant(restaurant.index)
            })
            .then(() => {
                let restaurantPage = new RestaurantPage();
                let listProperties = [];

                log.testStep('test for checkout page', 5, 'get sorted price list');
                restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                    .then((sortedPrices) => {
                        let dishes = sortedPrices.slice(0, UsersData.personsAmount);

                        listProperties = utils.getListValues(sortedPrices);

                        log.testStep('test for checkout page', 6, 'add dishes to order');
                        return dishes.forEach((dish) => restaurantPage.addToOrder(dish.index))
                    })
                    .then(() => {
                        log.testStep('test for checkout page', 7, 'make checkout');
                        return restaurantPage.makeCheckout()
                    })
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                        log.testStep('test for checkout page', 8, 'compare order list and dishes list');
                        return checkoutPage.getProperties(checkoutPage.getAllItems())
                            .then((properties) => utils.getListValues(properties))
                            .then((properties) => properties.forEach((property, index) => expect(property).toEqual(listProperties[index])));
                    });
            });
    });
});