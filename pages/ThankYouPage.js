let Page = require('./Page');
let log = require('../lib/Logger');

class ThankYouPage extends Page{

    constructor(){
        super('Thank you page');
        this.content = $('p.ng-binding');
    }

    getID() {
        log.step('ThankYouPage', 'getID','get order id');
        return this.content.evaluate('orderId');
    }

    getContent() {
        log.step('ThankYouPage', 'getContent','get text which contain order id');
        return this.content.getText();
    }
}

module.exports = ThankYouPage;