let Page = require('./Page');
let Logger = require('../elements/Logger');

class ThankYouPage extends Page{

    constructor(){
        super('Thank you page');
        this.log = new Logger();
        this.content = $('p.ng-binding');
    }

    getID() {
        this.log.step('ThankYouPage', 'getID','***');
        return this.content.evaluate('orderId');
    }

    getContent() {
        this.log.step('ThankYouPage', 'getContent','***');
        return this.content.getText();
    }
}

module.exports = ThankYouPage;