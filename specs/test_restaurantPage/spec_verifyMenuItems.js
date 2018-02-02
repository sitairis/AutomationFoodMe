let restaurantPage = require(`../../pages/RestaurantPage`);
let authForm = require('../../pages/AuthPage');
let servUtils = require(`../../lib/utils/servUtils`);
let faker = require('faker');
let random = require(`../../lib/utils/random`);
let rest = require('../../lib/restaurants');
const request = require("request");
const fs = require('fs');


describe('test for restaurant page', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);

        let randomRestId = rest.info[random.getRandomNumber(0, 38)].id;

        console.log(randomRestId);

        let requestOpt = {
            method: 'get',
            url: `http://localhost:5000/api/restaurant/${randomRestId}`,
            headers: {
                Accept: 'application/json'
            },
            json: true
        };

        request(requestOpt, (err, response) => {
            if (err) throw new Error(err);

            let objForRestInfo = {
                id: randomRestId,
                body: response.body
            };


            fs.writeFileSync(`./lib/restInfoWithDetails.json`, JSON.stringify(objForRestInfo));
        });
    });

    it('should open restaurant, select dish and compare results', () => {
        browser.waitForAngularEnabled(false)
            .then(() => restaurantPage.open(require('../../lib/restInfoWithDetails').id))
            .then(() => browser.waitForAngularEnabled(true))
            .then(() => restaurantPage.getMenuObjArray())
            .then((objArray) => servUtils.getMenuInfoObjArray(objArray))
            .then((menuItemsNames) => expect(menuItemsNames).toEqual(require('../../lib/restInfoWithDetails').body.menuItems.map((item) => `${item.name}${item.price}`.toLowerCase())));

    });
});
