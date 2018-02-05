exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "http://localhost:5000/#/",
    specs: ['./specs/*/*.js'],
    capabilities: {
        shardTestFiles: true,
        maxInstances: 3,
        browserName: 'chrome',
        chromeOptions: {
            args: ['headless', 'disable-gpu']
        }
    },
    suites: {
        checkout: './specs/test_checkoutPage/*.js',
        order: './specs/test_thankYouPage/*.js',
        restPage: './specs/test_restaurantPage/*.js',
        rating: './specs/test_ratingFilter/*.js',
        checkbox: './specs/test_checkboxFilter/*.js',
        all: './specs/*/*.js'
    },

    beforeLaunch: () => {
        const request = require("request");

        let req_conf = require('./lib/request_conf');

        request(req_conf.reqOptJson('get', 'restaurant', true), req_conf.reqFunc('restaurants.json'));
    }
};