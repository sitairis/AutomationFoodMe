class AuthPage {
    constructor() {
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = element(by.css('[ng-click="findRestaurants(customerName, customerAddress)"]'));

    }

    navigate() {
        return browser.get('http://localhost:5000/#/customer');
    }

    authorizate(name, address) {
        return this.fillInputName(name)
            .then(() => this.fillInputAddress(address))
            .then(() => this.pressFindRestaurantsButton())
    }

    fillInputName(name) {
        return this.inputName.sendKeys(name);
    }

    pressFindRestaurantsButton() {
        return this.btnFindRestaurants.click();
    }

    fillInputAddress(address) {
        return this.inputAddress.sendKeys(address);
    }
}
module.exports = AuthPage;
