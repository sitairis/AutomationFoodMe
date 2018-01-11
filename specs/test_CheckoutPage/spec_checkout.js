let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);
let CheckoutPage = require(`../../pages/CheckoutPage`);

describe('test for checkout page', () => {

    it('should make checkout and compare names and prices of dishes', () => {

        let mainPage = new MainPage();

        mainPage.openRestaurant(0)
            .then(() => {
                let restaurantPage = new RestaurantPage();
                let listProperties = [];

                restaurantPage.sortPriceByDec(restaurantPage.getAllPriceList())
                    .then((sortedPrices) => {
                        let threeMinPrices = sortedPrices.slice(0, 3);

                        listProperties = getListValues(sortedPrices);

                        return threeMinPrices.forEach((dish) => restaurantPage.addToOrder(dish.index))
                    })
                    .then(() => restaurantPage.makeCheckout())
                    .then(() => {
                        let checkoutPage = new CheckoutPage();

                        return checkoutPage.getProperties(checkoutPage.getAllItems())
                            .then((properties) => getListValues(properties))
                            .then((properties) => properties.forEach((property, index) => expect(property).toEqual(listProperties[index])))

                    });
            });
    });
});

/**
 *
 * @param array
 */
function getListValues(array) {
    return array.map((element) => `${element.name}${element.value}` );
}