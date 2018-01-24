let mainPage = require(`../../pages/MainPage`);
let restaurantPage = require(`../../pages/RestaurantPage`);
let checkoutPage = require(`../../pages/CheckoutPage`);
let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require(`../../UsersData`);
let utils = require(`../../lib/utils`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let faker = require('faker');

describe('test for checkout page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;
        authForm.doLogIn(randomName, randomAddress);
    });


    it('should make checkout and compare names and prices of dishes', () => {
        let infoArrayLinesFromRestPage = [];

        log.testStep('test for checkout page', 1, 'check cuisine(s) and open restaurant');
        setCuisineFilter(3)
            .then(() => openPopularCheapestRestaurant())
            .then(() => {
                log.testStep('test for checkout page', 2, 'get sorted price list');
                return restaurantPage.sortMenuByPriceDec();
            })
            .then((sortedPrices) => {
                        let dishes = sortedPrices.slice(0, UsersData.personsAmount);

                        infoArrayLinesFromRestPage = utils.getListRestaurantInfo(sortedPrices);

                        log.testStep('test for checkout page', 3, 'add dishes to order');
                        return dishes.forEach((dish) => restaurantPage.addToOrder(dish.index))
            })
            .then(() => {
                log.testStep('test for checkout page', 4, 'make checkout');
                return restaurantPage.makeCheckout()
            })
            .then(() => {
                log.testStep('test for checkout page', 5, 'compare order list and dishes list');
                return checkoutPage.getInfoOfOrderItems();
            })
            .then((infoObjArray) => utils.getListRestaurantInfo(infoObjArray))
            .then((infoArrayLines) => infoArrayLines.forEach((line, index) => expect(line).toEqual(infoArrayLinesFromRestPage[index])));
    });
});

/**
 *
 */
function setCuisineFilter(number) {
    return filterPanel.setCheckBoxFilter(`Cuisines`, utils.getRandomCuisinesArrayObj(number));
}

/**
 *
 */
function openPopularCheapestRestaurant() {
         return mainPage.findPopularCheapestRestaurant()
             .then((restaurant) => mainPage.openRestaurant(restaurant.index));
}