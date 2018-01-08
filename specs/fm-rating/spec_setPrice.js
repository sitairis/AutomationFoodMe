let MainPage = require(`../../pages/MainPage`);
let FilterPanel = require(`../../filters/FilterRestaurantsPanel`);
let FilterList = require(`../../filters/FilterListRestaurant`);

describe('test for price rating', function() {

    let TEST_PRICES = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5
    };

    it('should set price', function () {

        let mainPage = new MainPage();

        for (let testPrice in TEST_PRICES) {

            let filterPanel = new FilterPanel();
            let filterList = new FilterList();

            filterPanel.clearFilter('Price')
                .then(() => filterPanel.setRatingFilter(`Price`, testPrice))
                .then(() => filterList.getAllSelectedPrices()
                    .each((price) => expect(filterList.getCount(price)).toEqual(TEST_PRICES[testPrice])))
                .catch((err) => {
                    throw new Error(`Main page test: Error while selecting price: ${err.message}`);
                });
        }
    });
});