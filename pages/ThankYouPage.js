let Page = require('./Page');
let log = require('../lib/Logger');

class ThankYouPage extends Page{

    constructor(){
        super('Thank you page');
        this.content = $('p.ng-binding');
    }

    getID() {

        return this.content.evaluate('orderId')
            .then ((id)=> {
                log.step('ThankYouPage', 'getID','get order id');
                return id;
            });
    }

    getContent() {

        return this.content.getText()
            .then((text) => {
                log.step('ThankYouPage', 'getContent','get text which contain order id');
                return text;
            });
    }
}

module.exports = ThankYouPage;