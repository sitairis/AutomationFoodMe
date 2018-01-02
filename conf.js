exports.config = {
    framework: 'jasmine',

    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "http://localhost:5000/#/",
    specs: ['./specs/*/*.js'],
    onPrepare: function() {

        let AuthPage = function() {

            this.inputName = element(by.model('customerName'));
            this.inputAddress = element(by.model('customerAddress'));
            this.btnFindRestaurants = element(by.css('[ng-click="findRestaurants(customerName, customerAddress)"]'));

            this.navigate = function () {
                return browser.get('/');
            };

            this.authorizate = function(name, address) {
                return this.fillInputName(name)
                    .then(() => this.fillInputAddress(address))
                    .then(() => this.pressFindRestaurantsButton())
            };

            this.fillInputName = function (name) {
                return this.inputName.sendKeys(name);
            };

            this.fillInputAddress = function (address) {
                return this.inputAddress.sendKeys(address);
            };

            this.pressFindRestaurantsButton = function () {
                return this.btnFindRestaurants.click();
            };
        };


        beforeAll((done) => {
            let authorizationForm = new AuthPage();

            browser.ignoreSynchronization = true;

            authorizationForm.navigate()
                .then(() => browser.ignoreSynchronization = false)
                .then(() => authorizationForm.authorizate("aaa", "bbb"))
                .then(() => done())
                .catch(err => done.fail(err));
        });
    },
    // suites: {
    //     suite1: [
    //         './specs/catalogMobile/*.js'
    //     ],
    //     suite2: [
    //         './specs/navigateMenu/*.js'
    //     ],
    //     suite3: [
    //         './specs/search/*.js'
    //     ],
    //     suite4: [
    //         './specs/userBar/*.js'
    //     ],
    //     testAll:[
    //         './specs/*/*.js'
    //     ]
    // },
    capabilities: {
        browserName: 'chrome',
            // chromeOptions: {
            //     args: ['headless', 'disable-gpu']
            // }
        // browserName: 'firefox',
        // 'moz:firefoxOptions': {
        //     args: ["--headless"]
        // }
    },
    // multiCapabilities: [{
    //     browserName: 'firefox',
    //     'moz:firefoxOptions': {
    //         args: [ "--headless" ]
    //     }
    // }, {
    //     browserName: 'chrome',
    //     chromeOptions: {
    //         args: ['headless', 'disable-gpu']
    //     }
    // }],

    jasmineNodeOpts: {
        showColors: true
    }
};