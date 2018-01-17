let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);
let FiltersData = require('../../pages/filters/FiltersData');
let UsersData = require('../../UsersData');
let utils = require(`../../utils/utils`);
let Logger = require('../../elements/Logger');

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
        let log = new Logger();
        let filterList = new FilterList();
        let filterPanel = new FilterPanel();

        let selectedCuisines = null;

        if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
            log.testStep('Verify cuisine filter', 1, 'get random cuisine index');
            selectedCuisines = utils.getRandomCuisine(0, FiltersData.CUISINE.length - 1);
        } else {
            log.testStep('Verify cuisine filter', 1, 'get cuisine(s) names from UsersData');
            selectedCuisines = UsersData.cuisine;
        }

        log.testStep('Verify cuisine filter', 2, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisines(selectedCuisines);

        log.testStep('Verify cuisine filter', 3, 'check cuisine(s)');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => expect(filterList.getAllRestaurants().count()).toEqual(utils.getTotalCount(cuisines)));
    });
});