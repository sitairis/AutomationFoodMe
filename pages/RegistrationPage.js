let Page = require('./Page');
let except = require('../exceptions/exceptions');

class RegistrationPage extends Page {

    constructor() {
        super(`Registration page`);

        // this.root = $(by.className(`modal-body`));
        // this.txbCustomerName = $(by.css(`#customerName`));
        // this.txbAddress = $(by.css(`#address`));
        // this.btnFindRestaurants = $(by.css(`btn.btn-primary`));

this.item = 0;
    }


    open() {
        super.open('http://localhost:5000/#/customer');
        this.item = $(by.css(`[href="#/how-it-works"]`));
    }

    login(name, address) {


        except.isRightName(name);
        except.isRightAddress(address);

        // this.txbCustomerName.sendKeys(name);
        // this.txbAddress.sendKeys(address);
        // this.btnFindRestaurants.click();

        browser.waitForAngularEnabled(true);
    }
}

module.exports = RegistrationPage;