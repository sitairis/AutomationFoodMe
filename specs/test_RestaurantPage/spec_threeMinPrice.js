let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test for restaurant page', () => {


    afterEach(() => {
        let btnClear = $('[ng-click="cart.reset()"]');
        let btnHome = element(by.cssContainingText('a', 'Home'));
        let btnCheckout = $(`div.pull-right`);

        btnCheckout.click()
            .then(() => btnClear.click())
            .then(() => btnHome.click());

    });

    it('should open restaurant, select dishes and compare names', () => {

        let mainPage = new MainPage();

        mainPage.openRestaurant(0)
            .then(() => {
                let restaurantPage = new RestaurantPage();
                let nameList = [];

                restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                    .then((SortedPrices) => {
                        let threeMinPrices = SortedPrices.slice(0, 3);
                        nameList = SortedPrices.map((price) => price.name);
                        return threeMinPrices.forEach((price) => restaurantPage.addToOrder(price.index))
                    })
                    .then(() => restaurantPage.getOrder())
                    .then((orderList) => {
                        return restaurantPage.getOrderNamesList(orderList)
                    })
                    .then((orderNamesList) => orderNamesList.forEach((name, index) => expect(name).toEqual(nameList[index])))
            });
    });
});