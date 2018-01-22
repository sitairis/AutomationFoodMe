let Page = require('./Page');
let log = require('../lib/Logger');

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
            .catch(() => Promise.reject(`${this.className} : Error --- getID`));
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
            .catch(() => Promise.reject(`${this.className} : Error --- getStringWithOrderID`));
    }
}

module.exports = ThankYouPage;