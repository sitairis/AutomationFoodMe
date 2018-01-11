let AuthPage = function () {
    this.inputName = element(by.model('customerName'));
    this.inputAddress = element(by.model('customerAddress'));
    this.btnFindRestaurants = element(by.css('[ng-click="findRestaurants(customerName, customerAddress)"]'));

    this.navigate = function () {
        return browser.get('http://localhost:5000/#/customer');
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
module.exports = AuthPage
