let log = require('../lib/Logger');

class AuthPage {
    constructor() {
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = $('[ng-click="findRestaurants(customerName, customerAddress)"]');

    }

    navigate() {
        log.step('AuthPage', 'navigate','open AuthPage');

        return browser.get('http://localhost:5000/#/customer');
    }

    authorizate(name, address) {

        return this.fillInputName(name)
            .then(() => this.fillInputAddress(address))
            .then(() => this.pressFindRestaurantsButton())
    }

    fillInputName(name) {
        log.step('AuthPage', 'fillInputName',`type deliver's name`);
        return this.inputName.sendKeys(name);
    }

    pressFindRestaurantsButton() {
       log.step('AuthPage', 'pressFindRestaurantsButton',`click on button 'Find Restaurants'`);
        return this.btnFindRestaurants.click();
    }

    fillInputAddress(address) {
       log.step('AuthPage', 'fillInputAddress',`type deliver's address`);
        return this.inputAddress.sendKeys(address);
    }
}
module.exports = AuthPage;
