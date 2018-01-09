let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);

describe('test for rating, ', () => {

    let TEST_RATINGS = [1, 2, 3, 4, 5];

    it('should set rating', () => {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();
        filterPanel.clearRadioFilter(`Price`)
            .then(() => filterPanel.clearCheckFilter())
            .then(() => {
                TEST_RATINGS.forEach((testRating, index) => {

                    filterPanel.clearRadioFilter('Rating')
                        .then(() => filterPanel.setRatingFilter(`Rating`, index))
                        .then(() => filterList.getAllSelectedRatings()
                            .each((rating) => expect(filterList.getRatingLevel(rating)).toEqual(Number.parseInt(testRating))))
                });
            });

    });
});