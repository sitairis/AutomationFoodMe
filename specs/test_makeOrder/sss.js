let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require('../../UsersData');
let utils = require('../../utils/utils');
let filtersData = require('../../pages/filters/filtersData');
let ThankYouPage = require('../../pages/ThankYouPage');

describe('test for checkout page', () => {

    afterEach(() => {

        // let btnClear = $('[ng-click="cart.reset()"]');
        let btnHome = element(by.cssContainingText('a', 'Home'));

        // btnClear.click()
        //     .then(() =>
                btnHome.click()
            .then(() => {
                let filterPanel = new FilterPanel();

                filterPanel.clearCheckFilter();
            });
    });

    it('should click on purchase, get ID and make json file', () => {

        let mainPage = new MainPage();
        let filterPanel = new FilterPanel();

        let selectedCuisines = null;

        if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
            selectedCuisines = utils.getRandomCuisine(0, filtersData.CUISINE.length - 1);
        } else {
            selectedCuisines = UsersData.cuisine;
        }

        let cuisines = utils.getCuisines(selectedCuisines);

        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => filterPanel.setRatingFilter('rating', 4))
            .then(() => filterPanel.setRatingFilter('price', 0))
            .then(() => mainPage.openRestaurant(0))
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

                        checkoutPage.selectOption('visa')
                            .then(() => checkoutPage.typeNumberCard(UsersData.numberCard))
                            .then(() => checkoutPage.typeExpire(UsersData.expire.dd, UsersData.expire.yyyy))
                            .then(() => checkoutPage.typeCVC(UsersData.CVC))
                            .then(() => checkoutPage.clickBtnPurchase())
                            .then(() => {
                                let thankYouPage = new ThankYouPage();
                                return {
                                    id : thankYouPage.getID(),
                                    text : thankYouPage.getContent()
                                }

                            })
                            .then((obj) => console.log(`${obj.id} ${obj.text}`));
                        });
            });
    });
});