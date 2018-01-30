let mainPage = require(`../../pages/MainPage`);
let restaurantPage = require(`../../pages/RestaurantPage`);
let log = require('../../lib/Logger');
let authForm = require('../../pages/AuthPage');
let utils = require(`../../lib/utils`);
let faker = require('faker');
let restInfoWithDetails = require('../../lib/restInfoWithDetails');

describe('test for restaurant page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);
    });

    it('should open restaurant, select dish and compare results', () => {

        log.testStep('test for restaurant page', 1, 'open restaurant');
        mainPage.openRestaurant(utils.getRandomNumber(0, 38))
            .then(() => {
                log.testStep('test for restaurant page', 2, 'get menu');
                return restaurantPage.getMenuObjArray()
            })
            .then((objArray) => utils.getMenuInfoObjArray(objArray))
            .then((menuItems) => {
                restaurantPage.getRestaurantName()
                    .then((restName) => {
                        log.testStep('test for restaurant page', 3, 'get name of restaurant');
                        return restInfoWithDetails.info.find((a) => a.name === restName)
                    })
                    .then((rest) => {
                        log.testStep('test for restaurant page', 4, 'verify menu');
                        expect(menuItems).toEqual(rest.menuItems.map((item) => `${item.name}${item.price}`.toLowerCase()));
                    })
            })
    });
});
