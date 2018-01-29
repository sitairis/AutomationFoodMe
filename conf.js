exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "http://localhost:5000/#/",
    /*browser.ignoreSynchronization = true;
    browser.get('http://localhost:5000/#/menu/babythai');*/
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

    onPrepare: function () {
        /**
         * get info about all restaurants
         */
        const request = require("request");

        request({method: 'get',
            url: 'http://localhost:5000/api/restaurant',
            headers: {
                Accept: 'application/json'
            },
            json: true
        }, (err, responce) => {
            if (err) throw new Error(err);

            let obj = {
                array : responce.body
            };

            let fs = require("fs");
            fs.writeFile("./restaurants.json", JSON.stringify(obj), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("File has been created");
            });
        });
    }
};