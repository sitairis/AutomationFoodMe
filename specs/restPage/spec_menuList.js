let FilterPanel = require(`../../filters/FilterRestaurantsPanel`);
let FilterList = require(`../../filters/FilterListRestaurant`);
let MainPage = require(`../../pages/MainPage`);
let RestaurantPage = require(`../../pages/RestaurantPage`);

describe('test ', function() {


    it('should ', function () {

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();
        let mainPage = new MainPage();
        mainPage.openRestaurantPage(1)
            .then(() => {
                let restaurantPage = new RestaurantPage();
            });
    })

});