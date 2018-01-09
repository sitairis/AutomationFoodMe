let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test for restaurant page', function() {

    it('should open restaurant and select item', function () {

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
                throw new Error(`Restaurant page test: Error while selecting dish: ${err.message}`);
            });
    })

});