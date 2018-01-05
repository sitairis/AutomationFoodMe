let MainPage = require(`../../pages/MainPage`);
let FilterPanel = require(`../../filters/FilterRestaurantsPanel`);
let FilterList = require(`../../filters/FilterListRestaurant`);

describe('test for rating, ', function() {

    let TEST_RATINGS = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5
    };

    it('should set rating', function () {

        let mainPage = new MainPage();

        for (let testRating in TEST_RATINGS) {

            let filterPanel = new FilterPanel();
            let filterList = new FilterList();

            // filterPanel.clearFilter('Rating');

            filterPanel.setRatingFilter(`Rating`, testRating)
                .then(() => filterList.getAllSelectedRatings()
                    .each((rating) => expect(filterList.getCount(rating)).toEqual(TEST_RATINGS[testRating])))
                .catch((err) => {
                    throw new Error(`Main page test: Error while selecting rating: ${err.message}`);
                });
        }
    });
});