let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let MainPage = require(`../../pages/MainPage`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let FiltersData = require('../../pages/filters/FiltersData');
let log = require('../../lib/Logger');

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
        let mainPage = new MainPage();

        let selectedCuisines = null;

        if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
            selectedCuisines = utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1);
        } else {
            selectedCuisines = UsersData.cuisine;
        }

        let cuisines = utils.getCuisines(selectedCuisines);

            filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
                .then(() => expect(recursGetCountRatedRestaurants(filterPanel, mainPage, 4)).toEqual(utils.getCountRatedRestaurants(cuisines)));
    });
});

function recursGetCountRatedRestaurants(filterPanel, mainPage, maxRating) {

    return filterPanel.setRatingFilter('rating', maxRating)
        .then(() => mainPage.getAllRestaurants().count())
        .then((count) => {
            if (count) {
                return count;
            } else {
                return recursGetCountRatedRestaurants(filterPanel, mainPage, maxRating);
            }
        })
}
