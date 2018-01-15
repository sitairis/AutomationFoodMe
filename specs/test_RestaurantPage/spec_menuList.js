let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test for restaurant page', () => {

    afterEach(() => {
        let btnClear = $('[ng-click="cart.reset()"]');
        let btnHome = element(by.cssContainingText('a','Home'));
        let btnCheckout = $(`div.pull-right`);

        btnCheckout.click()
            .then(() => btnClear.click())
            .then(() => btnHome.click());

    });

    it('should open restaurant, select dish and compare results', () => {

        let mainPage = new MainPage();

        mainPage.openRestaurant(2)
            .then(() => {
                let restaurantPage = new RestaurantPage();

                return restaurantPage.addToOrder(2)
                    .then(() => restaurantPage.getOrderPrice())
                    .then((price) => {
                        let testPrice = price.getText();
                        expect(testPrice).toEqual('Total: $6.95');
                    });
            });
    });
});