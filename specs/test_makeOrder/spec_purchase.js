let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let FiltersData = require('../../pages/filters/FiltersData');
let ThankYouPage = require('../../pages/ThankYouPage');
let log = require('../../lib/Logger');

describe('test for checkout page', () => {

    afterEach(() => {
        let btnHome = element(by.cssContainingText('a', 'Home'));

        btnHome.click()
            .then(() => {
                let filterPanel = new FilterPanel();

                filterPanel.clearCheckFilter();
            });
    });

    it('should click on purchase, get ID and make json file', () => {

        let orderData = {
            deliver: {
                name : UsersData.nameDeliver,
                address : UsersData.address
            },
            payment: {
                type : UsersData.type,
                number : UsersData.numberCard,
                expire : UsersData.expire.dd+'/'+UsersData.expire.yyyy,
                CVC : UsersData.CVC
            }
        };

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

                // orderData.restaurant = restaurantPage.getRestaurantInfo();

                restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                    .then((sortedPrices) => {
                        let minPrices = sortedPrices.slice(0, UsersData.personsAmount);

                        return minPrices.forEach((dish) => restaurantPage.addToOrder(dish.index))
                    })
                    .then(() => restaurantPage.makeCheckout())
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                           checkoutPage.selectOption(UsersData.type)
                            .then(() => checkoutPage.typeNumberCard(UsersData.numberCard))
                            .then(() => checkoutPage.typeExpire(UsersData.expire.dd, UsersData.expire.yyyy))
                            .then(() => checkoutPage.typeCVC(UsersData.CVC))
                            .then(() => checkoutPage.clickBtnPurchase())
                            .then(() => {
                                let thankYouPage = new ThankYouPage();

                                // utils.createInfoJSON(orderData);
                                return thankYouPage.getContent()
                            })
                            .then((text) => expect(text.match(/ID is \d\d\d\d\d\d\d\d\d\d\d\d\d/)).not.toBe(null));
                    });
            });
    });
});