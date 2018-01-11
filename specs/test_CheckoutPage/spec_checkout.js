let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);

describe('test for checkout page', () => {

    it('should make checkout and compare names of dishes', () => {

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
                    .then(() => restaurantPage.makeCheckout())
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                        return checkoutPage.getAllItems()
                            .then((items) => checkoutPage.getNames(items))
                            .then((names) => names.forEach((name, index) => expect(name).toEqual(nameList[index])))
                    })
            });
    });
});