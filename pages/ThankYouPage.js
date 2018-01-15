let Page = require('./Page');

class ThankYouPage extends Page{
    constructor(){
        super('Thank you page');
        this.title = $('h1');
        this.content = $('p.ng-binding');
    }

    getID() {
        return this.content.evaluate('orderId');
    }

    getContent() {
        return this.content.getText();
    }
}
module.exports = ThankYouPage;