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
            .catch((errorMessage) => Promise.reject(`${this.className} : Error --- navigate : ${errorMessage}`));
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
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- authorizate : ${errorMessage}`)));
    }

    /**
     * провести авторизацию
     */
    doLogIn(name, address) {
        browser.ignoreSynchronization = true;

        return this.navigate()
            .then(() => browser.ignoreSynchronization = false)
            .then(() => this.authorizate(name, address))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- doLogIn : ${errorMessage}`)));
    }

    /**
     * ввод имени
     * @param name
     * @returns {promise.Promise<any>}
     */
    fillInputName(name) {
        return protrUtils.doSendKeys(this.inputName, name, `type deliver's name`)
            .then(() =>  log.step(this.className, 'fillInputName',`type deliver's name`))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- fillInputName : ${errorMessage}`)));
    }

    /**
     * нажать кнопку 'Find Restaurants'
     * @returns {promise.Promise<any>}
     */
    pressFindRestaurantsButton() {
        return protrUtils.doClick(this.btnFindRestaurants, `click on button 'Find Restaurants'`)
            .then(() => log.step(this.className, 'pressFindRestaurantsButton',`click on button 'Find Restaurants'`))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- pressFindRestaurantsButton : ${errorMessage}`)));
    }

    /**
     * ввод адреса
     * @param address
     * @returns {promise.Promise<any>}
     */
    fillInputAddress(address) {
        return protrUtils.doSendKeys(this.inputAddress, address, `type deliver's address`)
            .then(() => log.step(this.className, 'fillInputAddress',`type deliver's address`))
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- fillInputAddress : ${errorMessage}`)));
    }
}
module.exports = new AuthPage();
