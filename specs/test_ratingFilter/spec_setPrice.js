let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);
let UsersData = require('../../UsersData');
let utils = require('../../utils/utils');
let FiltersData = require('../../pages/filters/FiltersData');
let Logger = require('../../elements/Logger');

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

    it('should find the most popular restaurant', () => {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();

        let selectedCuisines = null;

        if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
            selectedCuisines = utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1);
        } else {
            selectedCuisines = UsersData.cuisine;
        }

        let cuisines = utils.getCuisines(selectedCuisines);
        let rating = 0;
        for (let popularLevel = 4; popularLevel > -1; popularLevel--) {

            filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
                .then(() => filterPanel.setRatingFilter('rating', popularLevel))
                .then(() => filterList.getAllRestaurants().count())
                .then((count) => {
                    if (count === 0) {
                        rating = popularLevel;
                        popularLevel = -1;
                    }
                });
        }
    //
    // .then((count) => expect(count).toEqual(3));
    });
});