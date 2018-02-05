let Page = require('./Page');
let log = require('../lib/Logger');
let path_conf = require('../path_conf');

class ThankYouPage extends Page{

    constructor(){
        super('Thank you page');
        this.className = 'ThankYouPage';
        this.content = $('p.ng-binding');
    }

    /**
     * вернет orderID
     * @returns {promise.Promise<any>}
     */
    getID() {
        return this.content.evaluate('orderId')
            .then ((id)=> {
                log.step('ThankYouPage', 'getID','get order id');

                return id;
            })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- getID : ${errorMessage}`)));
    }

    /**
     * откроет thankYouPage
     */
    open(){
        browser.ignoreSynchronization = true;

        return browser.get(`http://localhost:5000/#/thank-you?orderId=${require(path_conf.pth_tmp('orderId.json')).info.orderId}`)
            .catch((errorMessage) => Promise.reject(`${this.className} : Error --- open : ${errorMessage}`));
    }

    /**
     * вернет строку с orderID
     */
    getStringWithOrderID() {
        return this.content.getText()
            .then((text) => {
                log.step('ThankYouPage', 'getStringWithOrderID','get text which contain order id');

                return text;
            })
            .catch((errorMessage) => Promise.reject(new Error(`${this.className} : Error --- getStringWithOrderID : ${errorMessage}`)));
    }
}

module.exports = new ThankYouPage();