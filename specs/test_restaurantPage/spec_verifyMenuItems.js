const request = require("request");

let faker = require('faker');

let req_conf = require('../../lib/request_conf');
let restaurants = require('../../tmp/restaurants');
// let rest = ;
let random = require(`../../lib/utils/random`);
let servUtils = require(`../../lib/utils/servUtils`);

let restaurantPage = require(`../../pages/RestaurantPage`);
let authForm = require('../../pages/AuthPage');

describe('test for restaurant page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);

        let randomRestId = restaurants.info[random.getRandomNumber(0, restaurants.info.length)].id;

        request(req_conf.reqOptJson('get', `restaurant/${randomRestId}`, true),
            req_conf.reqFunc('restInfoWithDetails.json', {id: randomRestId}));

    });

    it('should open restaurant, select dish and compare results', () => {

        restaurantPage.open(require('../../tmp/restInfoWithDetails').id)
            .then(() => browser.ignoreSynchronization = false)
            .then(() => restaurantPage.getMenuObjArray())
            .then((objArray) => servUtils.getMenuInfoObjArray(objArray))
            .then((menuItemsNames) => expect(menuItemsNames).toEqual(getStringsArray()));
    });
});

/**
 * вернет массив строк
 */
function getStringsArray() {
    return require('../../tmp/restInfoWithDetails').info.menuItems.map((item) => `${item.name}${item.price}`.toLowerCase())
}