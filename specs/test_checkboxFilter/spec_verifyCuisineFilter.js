let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let MainPage = require(`../../pages/MainPage`);
let utils = require(`../../lib/utils`);
let log = require('../../lib/Logger');

describe('test for checkbox filter', () => {

    beforeEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter());
    });

    afterEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter());
    });

    it('should get countRestaurants of restaurants list', () => {
        let mainPage = new MainPage();
        let filterPanel = new FilterPanel();

        log.testStep('Verify cuisine filter', 1, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisines();

        log.testStep('Verify cuisine filter', 2, 'check cuisine(s)');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => expect(mainPage.getAllRestaurants().count()).toEqual(utils.getTotalCount(cuisines)));
    });
});