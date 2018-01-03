let Page = require('./Page');

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.rootRestaurantList = $(`.span9.fm-panel.fm-restaurant-list`);
        this.rootDeliver = $(`.breadcrumb.fm-deliver-to.ng-binding`);

    }

    getListTitle() {
        return this.rootRestaurantList.$(`h4`).getText();
    }

}

module.exports = MainPage;