let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test for restaurant page', () => {


    it('should open restaurant and select item', () => {

        let mainPage = new MainPage();
        browser.debugger();
        mainPage.openRestaurant(2)
            .then(() => {
                let restaurantPage = new RestaurantPage();

                return restaurantPage.addToOrder(2)
                    .then(() => restaurantPage.getOrderPrice())
                    .then((price) => {
                        let testPrice = price.getText();
                        expect(testPrice).toEqual('Total: $5.95');
                    });
            });
    });
});