let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let usersData = require(`../../UsersData`);
let utils = require('../../utils/utils');

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

        filterPanel.setCheckBoxFilter('Cuisines', ['pizza'])
            .then(() => filterPanel.setRatingFilter('rating', 4))
            .then(() => filterPanel.setRatingFilter('price', 0))
            .then(() => mainPage.openRestaurant(0))
            .then(() => {
                let restaurantPage = new RestaurantPage();
                let listProperties = [];

                restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                    .then((sortedPrices) => {
                        let dishes = sortedPrices.slice(0, usersData.personsAmount);

                        listProperties = utils.getListValues(sortedPrices);

                        return dishes.forEach((dish) => restaurantPage.addToOrder(dish.index))
                    })
                    .then(() => restaurantPage.makeCheckout())
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                        return checkoutPage.getProperties(checkoutPage.getAllItems())
                            .then((properties) => utils.getListValues(properties))
                            .then((properties) => properties.forEach((property, index) => expect(property).toEqual(listProperties[index])));

                    });
            });
    });
});