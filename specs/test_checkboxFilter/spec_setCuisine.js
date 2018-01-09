let MainPage = require(`../../pages/MainPage`);
let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let data = require('../../pages/filters/filtersData');

describe('test for checkbox filter', () => {

    it('should get title of restaurants list', () => {

        let mainPage = new MainPage();
        let threeCuisines = data.CUISINE.slice(0, 3);
        let filterPanel = new FilterPanel();

        filterPanel.setCheckBoxFilter(`Cuisines`, threeCuisines)
            .then(() => expect(mainPage.getListTitle()).toEqual(`6 restaurants found!`))

    });
});