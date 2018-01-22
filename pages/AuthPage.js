let log = require('../lib/Logger');
let utils = require('../lib/utils');

class AuthPage {
    constructor() {
        this.className = 'AuthPage';
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = $('[ng-click="findRestaurants(customerName, customerAddress)"]');

    }

    /**
     * переходить по ссылке
     */
    navigate() {
        return browser.get('#/customer')
            .then(() => log.step(this.className, 'navigate','open AuthPage'));
    }

    /**
     * выполняет авторизацию
     * @param name
     * @param address
     */
    authorizate(name, address) {
        return this.fillInputName(name)
            .then(() => this.fillInputAddress(address))
            .then(() => this.pressFindRestaurantsButton())
            .catch(console.log.bind(console));
    }

    /**
     * ввод имени
     * @param name
     * @returns {promise.Promise<any>}
     */
    fillInputName(name) {
        return utils.doSendKeys(this.inputName, name, `type deliver's name`)
            .then(() =>  log.step(this.className, 'fillInputName',`type deliver's name`))
            .catch(() => Promise.reject(`${this.className} : Error --- fillInputName`));
    }

    /**
     * нажать кнопку 'Find Restaurants'
     * @returns {promise.Promise<any>}
     */
    pressFindRestaurantsButton() {
        return utils.doClick(this.btnFindRestaurants, `click on button 'Find Restaurants'`)
            .then(() => log.step(this.className, 'pressFindRestaurantsButton',`click on button 'Find Restaurants'`))
            .catch(() => Promise.reject(`${this.className} : Error --- pressFindRestaurantsButton`));
    }

    /**
     * ввод адреса
     * @param address
     * @returns {promise.Promise<any>}
     */
    fillInputAddress(address) {
        return utils.doSendKeys(this.inputAddress, address, `type deliver's address`)
            .then(() => log.step(this.className, 'fillInputAddress',`type deliver's address`))
            .catch(() => Promise.reject(`${this.className} : Error --- fillInputAddress`));
    }
}
module.exports = AuthPage;
