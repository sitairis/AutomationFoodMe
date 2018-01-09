let FilterPanel = require(`../../filters/FilterRestaurantsPanel`);
let FilterList = require(`../../filters/FilterListRestaurant`);
let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test ', function() {


    it('should ', function () {

        let mainPage = new MainPage();

        mainPage.openRestaurant(2)
            .then(() => {
                let restaurantPage = new RestaurantPage();

                return restaurantPage.addToOrder(2)
                    .then(() => restaurantPage.getOrderPrice())
                    .then((price) => {
                        let testPrice = price.getText();
                        expect(testPrice).toEqual('Total: $6.95');
                    })
            })
            .catch((err) => {
                throw new Error(`Main page test: Error while selecting cuisine: ${err.message}`);
            });

    })

});