let MainPage = require(`../pages/MainPage`);
let Filter = require(`../filters/FilterRestaurants`);

describe('test ', function() {

    it('should set rating', function () {
        let mainPage = new MainPage();
        let filter = new Filter();
        filter.setFilter(`Rating`, 4);

        let title = mainPage.getListTitle();

        expect(title).toEqual(`10 restaurants found!`);

    });
});
