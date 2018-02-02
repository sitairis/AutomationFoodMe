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
        console.log('beforeLaunch');

        const request = require("request");
        const fs = require('fs');

        let firstRequestOpt = {
            method: 'get',
            url: 'http://localhost:5000/api/restaurant',
            headers: {
                Accept: 'application/json'
            },
            json: true
        };

        request(firstRequestOpt, (err, response) => {
            if (err) throw new Error(err);

            let objForAllRst = {
                info: response.body
            };

            fs.writeFile("./lib/restaurants.json", JSON.stringify(objForAllRst), (err) => {
                if (err) throw new Error(err.message);

                console.log("File restaurants.json has been created");
            });
        });
    }
};