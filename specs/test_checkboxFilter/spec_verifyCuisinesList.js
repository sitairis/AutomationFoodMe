let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let servUtils = require(`../../lib/utils/servUtils`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let faker = require('faker');
let restInfo = require('../../lib/restaurants');

describe('test for checkbox filter', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;
        authForm.doLogIn(randomName, randomAddress);
    });

    it('should verify cuisines names', () => {
        log.testStep('Verify cuisine filter', 1, 'get cuisine(s) array from FiltersData');
        filterPanel.getCheckboxesValues()
            .then((expectCuisines) => {
                log.testStep('Verify cuisine filter', 2, 'check cuisine(s)');
                expect(expectCuisines.sort()).toEqual(servUtils.dropRepeatingElement(servUtils.getArrayValuesByProperty(restInfo.info, 'cuisine')));
            })
    });
});