let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test for restaurant page', () => {

    it('should open restaurant and select item', () => {

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
                    .then((orderList) => restaurantPage.getOrderNamesList(orderList))
                    .then((orderNamesList) => orderNamesList.forEach((name, index) => expect(name).toEqual(nameList[index])))

                /*browser.ignoreSynchronization = true;
                browser.get('http://localhost:5000/#/menu/babythai');*/
            });
    });
});