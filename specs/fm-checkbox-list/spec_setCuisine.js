let MainPage = require(`../../pages/MainPage`);
let FilterPanel = require(`../../filters/FilterRestaurantsPanel`);
let FilterList = require(`../../filters/FilterListRestaurant`);
let data = require('../../filters/filtersData');

describe('test for checkbox filter', function() {

    it('should get title of restaurants list', function () {

        let mainPage = new MainPage();

        let filterPanel = new FilterPanel();
        let filterList = new FilterList();

        filterPanel.clearFilter('Price');
        filterPanel.clearFilter('Rating');

        filterPanel.setCheckBoxFilter(`Cuisines`, data.CUISINE.slice(0,3))
            .then(() => expect(mainPage.getListTitle()).toEqual(`6 restaurants found!`))
            .catch((err) => {
                throw new Error(`Main page test: Error while selecting cuisine: ${err.message}`);
            });
    });

});