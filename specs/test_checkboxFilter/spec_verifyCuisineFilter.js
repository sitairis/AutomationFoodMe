let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let mainPage = require(`../../pages/MainPage`);
let utils = require(`../../lib/utils`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let faker = require('faker');
let utilForCuisine = require('../../lib/utils/utilForCuisine');

describe('test for checkbox filter', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;
        authForm.doLogIn(randomName, randomAddress);
    });

    it('should verify cuisines filter', () => {
        log.testStep('Verify cuisine filter', 1, 'get cuisine(s) array from FiltersData');
        let cuisines = utilForCuisine.getCuisinesObjectsArray();

        log.testStep('Verify cuisine filter', 2, 'check cuisine(s)');
        filterPanel.setCheckBoxFilter(`Cuisines`, utilForCuisine.getCuisinesName(cuisines))
            .then(() => expect(mainPage.getRestaurantsElementsCollect().count()).toEqual(utils.getTotalRestCount(cuisines)));
    });
});