let FilterPanel = require(`../../filters/FilterRestaurantsPanel`);
let FilterList = require(`../../filters/FilterListRestaurant`);

describe('test for rating, ', function() {

    let TEST_RATINGS = {
        '0': '1',
        '1': '2',
        '2': '3',
        '3': '4',
        '4': '5'
    };

    it('should set rating', function () {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();

        for (let testRating in TEST_RATINGS) {

            filterPanel.clearRadioFilter('Rating')
                .then(() => filterPanel.setRatingFilter(`Rating`, testRating))
                .then(() => filterList.getAllSelectedRatings()
                    .each((rating) => expect(filterList.getCount(rating)).toEqual(Number.parseInt(TEST_RATINGS[testRating]))))
                .then(() => filterPanel.clearRadioFilter('Rating'))
                .catch((err) => {
                    throw new Error(`Main page test: Error while selecting rating: ${err.message}`);
                });
        }
    });
});