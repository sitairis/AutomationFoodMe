let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);

describe('test for price rating', () => {

    let TEST_PRICES = {
        '0': '1',
        '1': '2',
        '2': '3',
        '3': '4',
        '4': '5'
    };

    it('should set price', () => {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();
        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearCheckFilter())
            .then(() => {
                for (let testPrice in TEST_PRICES) {

                    filterPanel.clearRadioFilter('Price')
                        .then(() => filterPanel.setRatingFilter(`Price`, testPrice))
                        .then(() => filterList.getAllSelectedPrices()
                            .each((price) => expect(filterList.getCount(price)).toEqual(Number.parseInt(TEST_PRICES[testPrice]))))
                }
            })
    })
});