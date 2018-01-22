let log = require('../lib/Logger');
let utils = require('../lib/utils');

class AuthPage {
    constructor() {
        this.className = 'AuthPage';
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = $('[ng-click="findRestaurants(customerName, customerAddress)"]');

    }

    navigate() {
        return browser.get('#/customer')
            .then(() => log.step(this.className, 'navigate','open AuthPage'));
    }

    authorizate(name, address) {
        return this.fillInputName(name)
            .then(() => this.fillInputAddress(address))
            .then(() => this.pressFindRestaurantsButton())
            .catch(console.log.bind(console));
    }

    fillInputName(name) {
        return utils.doSendKeys(this.inputName, name, `type deliver's name`)
            .then(() =>  log.step(this.className, 'fillInputName',`type deliver's name`))
            .catch(() => Promise.reject(`${this.className} : Error --- fillInputName`));
    }

    pressFindRestaurantsButton() {
        return utils.doClick(this.btnFindRestaurants, `click on button 'Find Restaurants'`)
            .then(() => log.step(this.className, 'pressFindRestaurantsButton',`click on button 'Find Restaurants'`))
            .catch(() => Promise.reject(`${this.className} : Error --- pressFindRestaurantsButton`));
    }

    fillInputAddress(address) {
        return utils.doSendKeys(this.inputAddress, address, `type deliver's address`)
            .then(() => log.step(this.className, 'fillInputAddress',`type deliver's address`))
            .catch(() => Promise.reject(`${this.className} : Error --- fillInputAddress`));
    }
}
module.exports = AuthPage;
