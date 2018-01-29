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
        let restaurants = require('./restaurants');
        const request = require("request");
        const fs = require('fs');

        beforeAll(() => {
            request({method: 'get',
                url: 'http://localhost:5000/api/restaurant',
                headers: {
                    Accept: 'application/json'
                },
                json: true
            }, (err, responce) => {
                if (err) throw new Error(err);

                let objForAllRst = {
                    array: responce.body
                };

                fs.writeFile("./restaurants.json", JSON.stringify(objForAllRst), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log("File has been created");
                });

            });



            fs.writeFile("./restaurantInfo.json", JSON.stringify(objForRestInfo), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("File has been created");
            });



            let arrr = restaurants.array.map((curRest) => `http://localhost:5000/api/restaurant/${curRest.id}`);

            // console.log(arrr);


            arrr.forEach((a) => {
                request({
                    method: 'get',
                    url: a,
                    headers: {
                        Accept: 'application/json'
                    },
                    json: true
                }, (err, resp) => {
                    if (err) throw new Error(err);

                    fs.readFile('./restaurantInfo.json', (err, data) => {
                        if (err) throw new Error(err.message);

                        let obj = JSON.parse(data);

                        obj.push(resp.body);

                        fs.writeFile('./restaurantInfo.json', JSON.stringify(obj), (error) => {
                            if (error) throw new Error(error.message);

                            console.log("File has been update");
                        })
                    });

                });
            });
        });

    }
};