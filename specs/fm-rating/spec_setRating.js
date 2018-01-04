let MainPage = require(`./pages/MainPage`);
let Filter = require(`./filters/FilterRestaurants`);

describe('test ', function() {
    let typeFilter = [
        'Rating',
        'Price'
    ];

    let rating = {
        '0': '4 restaurants found!',
        '1': '10 restaurants found!',
        '2': '7 restaurants found!',
        '3': '10 restaurants found!',
        '4': '8 restaurants found!'
    };

    let price = {
        '0': '3 restaurants found!',
        '1': '7 restaurants found!',
        '2': '13 restaurants found!',
        '3': '11 restaurants found!',
        '4': '4 restaurants found!'
    };

    it('should set rating', function () {
        let mainPage = new MainPage();

        let filter = new Filter();

        filter.setRatingFilter(`Rating`, 3)
            .then(() => mainPage.getListTitle())
            .then((title) => {
                expect(title).toEqual(`10 restaurants found!`);
            })
            .catch((err) => {
                throw new Error(`Main page test: Error while choose rating: ${err.message}`);
            });
    });
});