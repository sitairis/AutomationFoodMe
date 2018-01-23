let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let mainPage = require(`../../pages/MainPage`);
let utils = require(`../../lib/utils`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');


describe('test for checkbox filter', () => {

    beforeAll(() => authForm.doLogIn());

    it('should verify cuisines filter', () => {
        log.testStep('Verify cuisine filter', 1, 'get cuisine(s) array from FiltersData');
        let cuisines = utils.getCuisinesObjectsArray();

        log.testStep('Verify cuisine filter', 2, 'check cuisine(s)');
        filterPanel.setCheckBoxFilter(`Cuisines`, utils.getCuisinesName(cuisines))
            .then(() => expect(mainPage.getRestaurantsElementsCollect().count()).toEqual(utils.getTotalCount(cuisines)));
    });
});