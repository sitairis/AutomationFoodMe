let log = require('../lib/Logger');
let protrUtils = require('../lib/utils/protrUtils');

class AuthPage {

    constructor() {
        this.className = 'AuthPage';
        this.inputName = element(by.model('customerName'));
        this.inputAddress = element(by.model('customerAddress'));
        this.btnFindRestaurants = $('[ng-click="findRestaurants(customerName, customerAddress)"]');
    }

    /**
     * открыть страницу авторизации
     */
    navigate() {
        return browser.get('#/customer')
            .then(() => log.step(this.className, 'navigate','open AuthPage'))
            .catch((err) => Promise.reject(`${this.className} : Error --- navigate : ${err}`));
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
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- authorizate : ${err}`)));
    }

    /**
     * провести авторизацию
     */
    doLogIn(name, address) {
        browser.ignoreSynchronization = true;

        return this.navigate()
            .then(() => browser.ignoreSynchronization = false)
            .then(() => this.authorizate(name, address))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- doLogIn : ${err}`)));
    }

    /**
     * ввод имени
     * @param name
     * @returns {promise.Promise<any>}
     */
    fillInputName(name) {
        return protrUtils.doSendKeys(this.inputName, name, `type deliver's name`)
            .then(() =>  log.step(this.className, 'fillInputName',`type deliver's name`))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- fillInputName : ${err}`)));
    }

    /**
     * нажать кнопку 'Find Restaurants'
     * @returns {promise.Promise<any>}
     */
    pressFindRestaurantsButton() {
        return protrUtils.doClick(this.btnFindRestaurants, `click on button 'Find Restaurants'`)
            .then(() => log.step(this.className, 'pressFindRestaurantsButton',`click on button 'Find Restaurants'`))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- pressFindRestaurantsButton : ${err}`)));
    }

    /**
     * ввод адреса
     * @param address
     * @returns {promise.Promise<any>}
     */
    fillInputAddress(address) {
        return protrUtils.doSendKeys(this.inputAddress, address, `type deliver's address`)
            .then(() => log.step(this.className, 'fillInputAddress',`type deliver's address`))
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- fillInputAddress : ${err}`)));
    }
}
module.exports = new AuthPage();
