let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let MainPage = require(`../../pages/MainPage`);
let utils = require('../../lib/utils');
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


        log.testStep('test for rating filter', 1, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisines();

        log.testStep('test for rating filter', 2, 'verify count');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => expect(recursGetCountRatedRestaurants(filterPanel, mainPage, 4)).toEqual(utils.getCountRatedRestaurants(cuisines)));
    });
});

/**
 * рекурсия вернет количество самых популярных ресторанов
 * @param filterPanel
 * @param mainPage
 * @param maxRating
 */
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
