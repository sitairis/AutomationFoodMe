let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let authForm = require('../../pages/AuthPage');
let mainPage = require(`../../pages/MainPage`);
let utils = require('../../lib/utils');
let log = require('../../lib/Logger');

describe('test for rating filter', () => {

    beforeAll(() => authForm.doLogIn());

    let filterDataArray = [{
        filterName: 'rating',
        startValue: 4
        },{
        filterName: 'price',
        startValue: 0
    }];

    it('should find the most popular restaurant and then the cheapest restaurant', () => {

        log.testStep('test for filters', 1, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getRandomCuisinesNames(3);

        log.testStep('test for filters', 2, 'checked cuisines');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => {
                log.testStep('test for filters', 3, 'verify counts');
                filterDataArray.forEach((filterObj) => expect(recursGetCountRatedRestaurants(filterObj.filterName, filterObj.startValue))
                    .toEqual(utils.getCountRatedRestaurants(cuisines, filterObj.filterName)))
            })
    });
});

/**
 * рекурсия вернет количество самых популярных/дешевых ресторанов
 * @returns {string}
 * @param filterName
 * @param startValue
 */
function recursGetCountRatedRestaurants(filterName, startValue) {
    log.step('test for rating filter', 'recursGetCountRatedRestaurants', 'get restaurants count');

    if ((filterName === 'rating' && startValue < 0) || (filterName === 'price' && startValue >= 5)) return `not found restaurants`;

    return filterPanel.setRatingFilter(filterName, startValue)
        .then(() => mainPage.getRestaurantsElementsCollect().count())
        .then((count) => {
            if (count) {
                return count;
            } else {
                filterName === 'rating' ? startValue-- : startValue++;
                return recursGetCountRatedRestaurants(filterName, startValue);
            }
        });
}