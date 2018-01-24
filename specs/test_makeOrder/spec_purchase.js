let mainPage = require(`../../pages/MainPage`);
let restaurantPage = require(`../../pages/RestaurantPage`);
let checkoutPage = require(`../../pages/CheckoutPage`);
let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let thankYouPage = require('../../pages/ThankYouPage');
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');

describe('test for purchase', () => {
    beforeAll(() => authForm.doLogIn());

    it('should click on purchase, get ID and make json file', () => {

        let orderData = {
            deliver: {
                name: UsersData.nameDeliver,
                address: UsersData.address
            },
            payment: {
                type: UsersData.type,
                number: UsersData.numberCard,
                expire: UsersData.expire.dd + '/' + UsersData.expire.yyyy,
                CVC: UsersData.CVC
            }
        };

        log.testStep('test for purchase', 1, 'get cuisine(s) array from FiltersData');
        setCuisineFilter(3)
            .then(() => openPopularCheapestRestaurant())
            .then(() => {
                log.testStep('test for purchase', 5, 'save info about restaurant');
                return restaurantPage.getRestaurantInfo()
            })
            .then((obj) => {
                orderData.restaurant = obj;
                return orderData;
            })
            .then(() => addRandomDishesToOrder())
            .then(() => {
                log.testStep('test for purchase', 8, 'make checkout');
                return restaurantPage.makeCheckout()
            })
            .then(() => {
                log.testStep('test for purchase', 9, 'save info about items in order');
                checkoutPage.getInfoOfOrderItems()
            })
            .then((arrayItems) => {
                orderData.items = arrayItems;
                return orderData;
            })
            .then(() => {
                log.testStep('test for purchase', 10, 'type payment info');
                return typeCardData();
            })
            .then(() => {
                log.testStep('test for purchase', 11, 'purchase');
                return checkoutPage.clickBtnPurchase()
            })
            .then(() => {
                log.testStep('test for purchase', 13, 'save orderID');
                return thankYouPage.getID()
            })
            .then((id) => {
                orderData.orderID = id;
                return orderData;
            })
            .then(() => utils.createInfoJSON(orderData))
            .then(() => log.testStep('test for purchase', 14, 'verify line with orderID'))
            .then(() => thankYouPage.getStringWithOrderID())
            .then((text) => expect(text.match(/ID is \d\d\d\d\d\d\d\d\d\d\d\d\d/)).not.toBe(null));
    })
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

function addRandomDishesToOrder(count) {
    return restaurantPage.getPriceListElementsCollect().count()
        .then((count) => {
            for (let i = 0; i < count; i++) {
                restaurantPage.addToOrder(utils.getRandomNumber(0, count));
            }
        })
}

function typeCardData() {
return checkoutPage.selectOption(UsersData.type)
        .then(() => checkoutPage.typeNumberCard(UsersData.numberCard))
        .then(() => checkoutPage.typeExpire(UsersData.expire.dd, UsersData.expire.yyyy))
        .then(() => checkoutPage.typeCVC(UsersData.CVC))
}