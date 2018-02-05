const request = require('request');

let faker = require('faker');

let req_conf = require('../../lib/request_conf');
let log = require('../../lib/Logger');
let servUtil = require('../../lib/utils/servUtils');
let filterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let authForm = require('../../pages/AuthPage');
let mainPage = require(`../../pages/MainPage`);

describe('test for rating filter', () => {

    beforeAll(() => {
        let randomName = faker.name.findName();
        let randomAddress = `${faker.address.city()}, ${faker.address.streetAddress()}`;

        authForm.doLogIn(randomName, randomAddress);
    });

    let arrayRestaurants = [];

    /**
     * get info about all restaurants
     */
    request(req_conf.reqOptJson('get','restaurant', true), (err, response) => {
        if (err) {
            log.error(`reqFunc: request ${err}`);
            throw new Error(err);
        }

        if (response.statusCode === 200) {
            arrayRestaurants = response.body;
        }
    });

    let filterDataArray = [{
        filterName: 'rating',
        startValue: 4
    }, {
        filterName: 'price',
        startValue: 0
    }];

    it('should find the most popular restaurant and then the cheapest restaurant', () => {

        log.testStep('test for filters', 1, 'verify counts');
        filterDataArray.forEach((filterObj) => {
            recursGetCountRatedRestaurants(filterObj.filterName, filterObj.startValue)
                .then((expectRestaurantCount) => {
                    return filterPanel.clearRadioFilter(filterObj.filterName)
                        .then(() => expect(expectRestaurantCount)
                            .toEqual(servUtil.getCountRatedRestaurants(filterObj.filterName)))
                });
        });
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

    if ((filterName === 'rating' && startValue < 0) || (filterName === 'price' && startValue >= 5)) {
        return `not found restaurants`;
    }

    return filterPanel.setRatingFilter(filterName, startValue)
        .then(() => mainPage.getRestaurantsElementsCollect().count())
        .then((c) => {
            if (c !== 0) {
                return c;
            } else {
                filterName === 'rating' ? startValue-- : startValue++;
                return recursGetCountRatedRestaurants(filterName, startValue);
            }
        });
}