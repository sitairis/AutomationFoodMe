exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "http://localhost:5000/#/",
    /*browser.ignoreSynchronization = true;
    browser.get('http://localhost:5000/#/menu/babythai');*/
    specs: ['./specs/*/*.js'],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['headless', 'disable-gpu']
        }
    },
    suites: {
        checkout: './specs/test_CheckoutPage/spec_checkout.js',
        restPage: './specs/test_RestaurantPage/*.js',
        rating: './specs/test_ratingFilter/*.js',
        checkbox: './specs/test_checkboxFilter/*.js',
        all: './specs/*/*.js'
    },

    onPrepare: function () {
        let AuthPage = require('./AuthPage');
        let DeliverForm = require('./Deliver');

        beforeAll((done) => {
            let authorizationForm = new AuthPage();

            browser.ignoreSynchronization = true;

            authorizationForm.navigate()
                .then(() => browser.ignoreSynchronization = false)
                .then(() => authorizationForm.authorizate("name", "address"))
                .then(() => done())
                .catch(err => done.fail(err));
        });

        afterAll((done) => {
            let deliverForm = new DeliverForm();

            $(`ul.nav a[href="#/"]`).click()
                .then(() => deliverForm.changeDeliver())
                .then(() => done())
                .catch(err => done.fail(err));

        });
    }
};