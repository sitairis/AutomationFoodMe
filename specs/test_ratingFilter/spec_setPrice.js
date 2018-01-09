let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);

describe('test for price rating', () => {

    let TEST_PRICES = [1, 2, 3, 4, 5];

    it('should set price', () => {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();
        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearCheckFilter())
            .then(() => {
                TEST_PRICES.forEach((testPrice, index) => {

                    filterPanel.clearRadioFilter('Price')
                        .then(() => filterPanel.setRatingFilter(`Price`, index))
                        .then(() => filterList.getAllSelectedPrices()
                            .each((price) => expect(filterList.getRatingLevel(price)).toEqual(Number.parseInt(testPrice))))
                });
            });
    });
});