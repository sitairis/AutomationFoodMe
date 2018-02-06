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
        restPage: './specs/test_restaurantPage/spec_verifyMenuItems.js',
        rating: './specs/test_ratingFilter/*.js',
        checkbox: './specs/test_checkboxFilter/*.js',
        all: './specs/*/*.js'
    },

    beforeLaunch: () => {
        const request = require("request");
        const fs = require('fs');

        let path_conf = require('./path_conf');
        let req_conf = require('./lib/request_conf');

        let log = require('./lib/Logger');

        request(req_conf.reqOptJson('get', 'restaurant', true), (err, response) => {
            if (err) throw new Error(err);

            let objForAllRst = {
                info: response.body
            };

            fs.writeFile(path_conf.pth_tmp('restaurants.json'), JSON.stringify(objForAllRst), err => {
                if (err) {
                    log.error(err);
                    throw new Error(err.message);
                }

                log.step('', '', "File restaurants.json has been created");
            });
        });
    }
};