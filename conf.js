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
        order: './specs/test_makeOrder/*.js',
        restPage: './specs/test_restaurantPage/spec_menuList.js',
        rating: './specs/test_ratingFilter/*.js',
        checkbox: './specs/test_checkboxFilter/*.js',
        all: './specs/*/*.js'
    },

    // onPrepare: function () {
    //     let AuthPage = require('./pages/AuthPage');
    //     let DeliverForm = require('./pages/Deliver');
    //     let UsersData = require('./UsersData');
    //
    //     beforeAll((done) => {
    //         let authorizationForm = new AuthPage();
    //
    //         browser.ignoreSynchronization = true;
    //
    //         authorizationForm.navigate()
    //             .then(() => browser.ignoreSynchronization = false)
    //             .then(() => authorizationForm.authorizate(UsersData.nameDeliver, UsersData.address))
    //             .then(() => done())
    //             .catch(err => done.fail(err));
    //     });
    //
    //     afterAll((done) => {
    //         let deliverForm = new DeliverForm();
    //
    //         $(`ul.nav a[href="#/"]`).click()
    //             .then(() => deliverForm.changeDeliver())
    //             .then(() => done())
    //             .catch(err => done.fail(err));
    //
    //     });
    // }
};