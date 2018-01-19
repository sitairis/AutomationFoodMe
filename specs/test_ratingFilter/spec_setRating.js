let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let MainPage = require(`../../pages/MainPage`);
let UsersData = require('../../UsersData');
let utils = require('../../lib/utils');
let FiltersData = require('../../pages/filters/FiltersData');
let log = require('../../lib/Logger');

describe('test for rating filter', () => {

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
            log.testStep('test for rating filter', 1, 'get random cuisine index');
            selectedCuisines = utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1);
        } else {
            log.testStep('test for rating filter', 1, 'get cuisine(s) names from UsersData');
            selectedCuisines = UsersData.cuisine;
        }
        log.testStep('test for rating filter', 2, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisines(selectedCuisines);

        log.testStep('test for rating filter', 3, 'verify count');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
                .then(() => expect(recursGetCountRatedRestaurants(filterPanel, mainPage, 4)).toEqual(utils.getCountRatedRestaurants(cuisines)));
    });
});

function recursGetCountRatedRestaurants(filterPanel, mainPage, maxRating) {
    log.step('test for rating filter', 'recursGetCountRatedRestaurants','get restaurants count');
    return filterPanel.setRatingFilter('rating', maxRating)
        .then(() => {
            return mainPage.getAllRestaurants().count()
        })
        .then((count) => {
            if (count) {
                return count;
            } else {
                return recursGetCountRatedRestaurants(filterPanel, mainPage, maxRating);
            }
        })
}
