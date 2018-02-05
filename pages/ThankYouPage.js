let log = require('../lib/Logger');

let path_conf = require('../path_conf');

let ordId = require('../.tmp/orderId');
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

        let orderId = ordId.info.orderId;
        let url = `${path_conf.baseURL(`thank-you?orderId=${orderId}`)}`;
        console.log(url+'*******');
        return browser.get(url)
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