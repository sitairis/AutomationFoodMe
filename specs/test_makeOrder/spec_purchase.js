let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let FiltersData = require('../../pages/filters/FiltersData');
let ThankYouPage = require('../../pages/ThankYouPage');
let log = require('../../lib/Logger');

describe('test for purchase', () => {

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
            log.testStep('test for purchase', 1, 'get random cuisine index');
            selectedCuisines = utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1);
        } else {
            log.testStep('test for purchase', 1, 'get cuisine(s) names from UsersData');
            selectedCuisines = UsersData.cuisine;
        }
        log.testStep('test for purchase', 2, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisines(selectedCuisines);

        log.testStep('test for purchase', 3, 'check cuisine(s)');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => {
                log.testStep('test for purchase', 4, 'get the most popular and the cheapest restaurant');
                return mainPage.findPopularCheapestRestaurant()
            })
            .then((restaurant) => {
                log.testStep('test for purchase', 5, 'open selected restaurant');
                return mainPage.openRestaurant(restaurant.index)
            })
            .then(() => {
                let restaurantPage = new RestaurantPage();
                log.testStep('test for purchase', 6, 'save info about restaurant');
                return restaurantPage.getRestaurantInfo()
                    .then((obj) => {
                        orderData.restaurant = obj;
                        return orderData;
                    })
                    .then(() => log.testStep('test for purchase', 7, 'get sorted price list'))
                    .then(() => restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList()))
                    .then((sortedPrices) => {
                            let minPrices = sortedPrices.slice(0, UsersData.personsAmount);

                            log.testStep('test for purchase', 8, 'add dishes to order');
                            return minPrices.forEach((dish) => restaurantPage.addToOrder(dish.index))
                        })
                    .then(() => {
                        log.testStep('test for purchase', 9, 'make checkout');
                        return restaurantPage.makeCheckout()
                    })
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                        log.testStep('test for purchase', 10, 'save info about items in order');
                        checkoutPage.getProperties(checkoutPage.getAllItems())
                            .then((arrayItems) => {
                                orderData.items = arrayItems;
                                return orderData;
                            })
                            .then(() => log.testStep('test for purchase', 11, 'type payment info'))
                            .then(() => checkoutPage.selectOption(UsersData.type))
                            .then(() => checkoutPage.typeNumberCard(UsersData.numberCard))
                            .then(() => checkoutPage.typeExpire(UsersData.expire.dd, UsersData.expire.yyyy))
                            .then(() => checkoutPage.typeCVC(UsersData.CVC))
                            .then(() => {
                                log.testStep('test for purchase', 12, 'purchase');
                                return checkoutPage.clickBtnPurchase()
                            })
                            .then(() => {
                                log.testStep('test for purchase', 13, 'open ThankYouPage');
                                let thankYouPage = new ThankYouPage();

                                log.testStep('test for purchase', 14, 'save orderID');
                                return thankYouPage.getID()
                                    .then((id) => {
                                        orderData.orderID = id;
                                        return orderData;
                                    })
                                    .then(() => utils.createInfoJSON(orderData))
                                    .then(() => log.testStep('test for purchase', 15, 'verify line with orderID'))
                                    .then(() => thankYouPage.getContent())
                                    .then((text) => expect(text.match(/ID is \d\d\d\d\d\d\d\d\d\d\d\d\d/)).not.toBe(null));
                            })
                    })
            })
    });
});