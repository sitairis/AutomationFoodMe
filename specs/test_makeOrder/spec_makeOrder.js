let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require('../../UsersData');
let utils = require('../../utils/utils');
let FiltersData = require('../../pages/filters/FiltersData');
let logger = require('../../elements/Logger');

describe('test for checkout page', () => {

    afterEach(() => {

        let btnClear = $('[ng-click="cart.reset()"]');
        let btnHome = element(by.cssContainingText('a', 'Home'));

        btnClear.click()
            .then(() => btnHome.click())
            .then(() => {
                let filterPanel = new FilterPanel();

                filterPanel.clearCheckFilter();
            });
    });

    it('should make order', () => {

        let mainPage = new MainPage();
        let filterPanel = new FilterPanel();

        let selectedCuisines = null;

        if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
            selectedCuisines = utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1);
        } else {
            selectedCuisines = UsersData.cuisine;
        }

        let cuisines = utils.getCuisines(selectedCuisines);

        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => mainPage.findPopularCheapestRestaurant())
            .then((restaurant) => mainPage.openRestaurant(restaurant.index))
            .then(() => {
                let restaurantPage = new RestaurantPage();
                let listProperties = [];

                restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                    .then((sortedPrices) => {
                        let threeMinPrices = sortedPrices.slice(0, UsersData.personsAmount);

                        listProperties = utils.getListValues(sortedPrices);

                        return threeMinPrices.forEach((dish) => restaurantPage.addToOrder(dish.index))
                    })
                    .then(() => restaurantPage.makeCheckout())
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                        return checkoutPage.getProperties(checkoutPage.getAllItems())
                            .then((properties) => utils.getListValues(properties))
                            .then((properties) => properties.forEach((property, index) => expect(property).toEqual(listProperties[index])))
                    });
            });
    });
});