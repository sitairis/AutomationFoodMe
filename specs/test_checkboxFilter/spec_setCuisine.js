let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);
let data = require('../../pages/filters/filtersData');
let DeliverForm = require('../../pages/Deliver');
let AuthPage = require('../../pages/AuthPage');

describe('test for checkbox filter', () => {

    beforeEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter())
    });

    afterEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter())
    });

    it('should get title of restaurants list', () => {

        let filterList = new FilterList();

        let threeCuisines = data.CUISINE.slice(0, 3);
        let filterPanel = new FilterPanel();

        filterPanel.setCheckBoxFilter(`Cuisines`, threeCuisines)
            .then(() => expect(filterList.getAllRestaurants().count()).toEqual(6));
    });
});