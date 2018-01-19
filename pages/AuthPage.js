let log = require('../lib/Logger');

class AuthPage {
    constructor() {
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = $('[ng-click="findRestaurants(customerName, customerAddress)"]');

    }

    navigate() {
        return browser.get('http://localhost:5000/#/customer')
            .then(() => log.step('AuthPage', 'navigate','open AuthPage'));
    }

    authorizate(name, address) {
        return this.fillInputName(name)
            .then(() => this.fillInputAddress(address))
            .then(() => this.pressFindRestaurantsButton())
            .catch(console.log.bind(console));
    }

    fillInputName(name) {
        return this.inputName.sendKeys(name)
            .then(() =>  log.step('AuthPage', 'fillInputName',`type deliver's name`));
    }

    pressFindRestaurantsButton() {
        return this.btnFindRestaurants.click()
            .then(() => log.step('AuthPage', 'pressFindRestaurantsButton',`click on button 'Find Restaurants'`));
    }

    fillInputAddress(address) {
        return this.inputAddress.sendKeys(address)
            .then(() => log.step('AuthPage', 'fillInputAddress',`type deliver's address`));
    }
}
module.exports = AuthPage;
