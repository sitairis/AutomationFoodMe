let log = require('../lib/Logger');

let path_conf = require('../path_conf');

// let ordId = ;
let Page = require('./Page');

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
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- getID : ${err}`)));
    }

    /**
     * откроет thankYouPage
     */
    open(){
        browser.ignoreSynchronization = true;

        let orderId = require('../tmp/orderId').info.orderId;

        return browser.get(`/thank-you?orderId=${orderId}`)
            .catch((err) => Promise.reject(`${this.className} : Error --- open : ${err}`));
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
            .catch((err) => Promise.reject(new Error(`${this.className} : Error --- getStringWithOrderID : ${err}`)));
    }
}

module.exports = new ThankYouPage();