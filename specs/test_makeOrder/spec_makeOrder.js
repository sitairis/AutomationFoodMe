let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);
let filtersData = require('../../pages/filters/filtersData');
let UsersData = require('../../UsersData');

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

        filterPanel.setCheckBoxFilter(`Cuisines`, UsersData.cuisine)
            .then(() => mainPage.getAllRestaurants()
                .then((unSortedRestaurants) =>

    });




            .then(() => {
                mainPage.openRestaurant(0)
                    .then(() => {
                        let restaurantPage = new RestaurantPage();
                        let listProperties = [];

                        restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                            .then((sortedPrices) => {
                                let threeMinPrices = sortedPrices.slice(0, 3);

                                listProperties = getListValues(sortedPrices);

                                return threeMinPrices.forEach((dish) => restaurantPage.addToOrder(dish.index))
                            })
                            .then(() => restaurantPage.makeCheckout())
                            .then(() => {
                                let checkoutPage = new CheckoutPage();

                                return checkoutPage.getProperties(checkoutPage.getAllItems())
                                    .then((properties) => getListValues(properties))
                                    .then((properties) => properties.forEach((property, index) => expect(property).toEqual(listProperties[index])))

                            });
                    });
            })

    });
});

function getListValues(array) {
    return array.map((element) => `${element.name}${element.value}` );
}

function getCuisinesName(cuisines) {
    return cuisines.map((cuisine) => cuisine.name);
}