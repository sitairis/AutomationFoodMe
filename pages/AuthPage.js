let Logger = require('../elements/Logger');

class AuthPage {
    constructor() {
        this.log = new Logger();
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = element(by.css('[ng-click="findRestaurants(customerName, customerAddress)"]'));

    }

    navigate() {
        this.log.step('AuthPage', 'navigate','***');

        return browser.get('http://localhost:5000/#/customer');
    }

    authorizate(name, address) {
        this.log.step('AuthPage', 'authorizate','***');

        return this.fillInputName(name)
            .then(() => this.fillInputAddress(address))
            .then(() => this.pressFindRestaurantsButton())
    }

    fillInputName(name) {
        this.log.step('AuthPage', 'fillInputName','***');
        return this.inputName.sendKeys(name);
    }

    pressFindRestaurantsButton() {
        this.log.step('AuthPage', 'pressFindRestaurantsButton','***');
        return this.btnFindRestaurants.click();
    }

    fillInputAddress(address) {
        this.log.step('AuthPage', 'fillInputAddress','***');
        return this.inputAddress.sendKeys(address);
    }
}
module.exports = AuthPage;
