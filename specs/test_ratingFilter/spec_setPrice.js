let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);
let UsersData = require('../../UsersData');
let utils = require('../../utils/utils');
let filtersData = require('../../pages/filters/filtersData');

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
            selectedCuisines = utils.getRandomCuisine(0, filtersData.CUISINE.length - 1);
        } else {
            selectedCuisines = UsersData.cuisine;
        }

        let cuisines = utils.getCuisines(selectedCuisines);

        filterPanel.setCheckBoxFilter('Cuisines', cuisines)
            .then(() => filterPanel.setRatingFilter('rating', 4))
            .then(() => filterList.getAllRestaurants().count())
            .then((count) => expect(count).toEqual(2));

    });
});