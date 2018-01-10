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
        checkout: './specs/test_CheckoutPage/*.js',
        restPage:  './specs/test_RestaurantPage/*.js',
        rating:  './specs/test_ratingFilter/*.js',
        checkbox:  './specs/test_checkboxFilter/*.js'
    },


    onPrepare: function () {

        let AuthPage = function () {
            this.inputName = element(by.model('customerName'));
            this.inputAddress = element(by.model('customerAddress'));
            this.btnFindRestaurants = element(by.css('[ng-click="findRestaurants(customerName, customerAddress)"]'));

            this.navigate = function () {
                return browser.get('/');
            };

            this.authorizate = function (name, address) {
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

        class DeliverForm {
            constructor() {
                this.deliver = $(`a.pull-right`);
            }

            changeDeliver() {
                return this.deliver.click();
            }
        }

        beforeAll((done) => {
            let authorizationForm = new AuthPage();

            browser.ignoreSynchronization = true;

            authorizationForm.navigate()
                .then(() => browser.ignoreSynchronization = false)
                .then(() => authorizationForm.authorizate("aaa", "bbb"))
                .then(() => done())
                .catch(err => done.fail(err));
        });

        // afterAll((done) => {
        //     let deliverForm = new DeliverForm();
        //
        //     $(`ul.nav a[href="#/"]`).click()
        //         .then(() => deliverForm.changeDeliver())
        //         .then(() => done())
        //         .catch(err => done.fail(err));
        //
        // });
    }
};