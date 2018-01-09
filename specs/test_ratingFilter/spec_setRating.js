let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);

describe('test for rating, ', () => {

    let TEST_RATINGS = {
        '0': '1',
        '1': '2',
        '2': '3',
        '3': '4',
        '4': '5'
    };

    it('should set rating', () => {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();
        filterPanel.clearRadioFilter(`Price`)
            .then(() => filterPanel.clearCheckFilter())
            .then(() => {
                for (let testRating in TEST_RATINGS) {

                    filterPanel.clearRadioFilter('Rating')
                        .then(() => filterPanel.setRatingFilter(`Rating`, testRating))
                        .then(() => filterList.getAllSelectedRatings()
                            .each((rating) => expect(filterList.getCount(rating)).toEqual(Number.parseInt(TEST_RATINGS[testRating]))))
                }
            })

    });
});