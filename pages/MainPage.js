let Page = require('./Page');

class MainPage extends Page {

    constructor() {
        super(`main page`);

        this.lnkBrand = $(by.css(`a.brand`));
    }


    getBrand () {
        return this.lnkBrand.getText();
    }
}

module.exports = MainPage;