let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);

describe('test for price rating', () => {


    beforeEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter())
    });

    afterEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter())
    });

    let TEST_RATING = [1, 2, 3, 4, 5];

    it('should set price', () => {
        let filterPanel = new FilterPanel();
        let filterList = new FilterList();

        TEST_RATING.forEach((testPrice, index) => {

            filterPanel.setRatingFilter(`Price`, index)
                .then(() => filterList.getAllSelectedPrices()
                    .each((price) => expect(filterList.getRatingLevel(price)).toEqual(Number.parseInt(testPrice))))
        });
    });

    it('should set rating', () => {
        let filterPanel = new FilterPanel();
        let filterList = new FilterList();

        TEST_RATING.forEach((testRating, index) => {

            filterPanel.setRatingFilter(`Rating`, index)
                .then(() => filterList.getAllSelectedRatings()
                    .each((rating) => expect(filterList.getRatingLevel(rating)).toEqual(Number.parseInt(testRating))))
        });
    });
});




