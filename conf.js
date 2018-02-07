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
  /*  suites: {
        checkout: './specs/test_checkoutPage/*.js',
        order: './specs/test_thankYouPage/*.js',
        restPage: './specs/test_restaurantPage/spec_verifyMenuItems.js',
        rating: './specs/test_ratingFilter/*.js',
        checkbox: './specs/test_checkboxFilter/*.js',
        all: './specs/*/
    // },
    onPrepare: function() {
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
    },

    beforeLaunch: () => {
        const request = require("request");
        const fs = require('fs');

        let path_conf = require('./path_conf');
        let req_conf = require('./lib/request_conf');

        let log = require('./lib/Logger');
        const tmpDir = 'tmp';

        request(req_conf.reqOptJson('get', 'restaurant', true), (err, response) => {
            if (err) throw new Error(err);

            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }

            let objForAllRst = {
                info: response.body
            };

            fs.writeFile(path_conf.pth_tmp(path_conf.fileNames.allRest), JSON.stringify(objForAllRst), err => {
                if (err) {
                    log.error(err);
                    throw new Error(err.message);
                }

                log.step('', '', "File restaurants.json has been created");
            });
        });
    }
};