let FilterPanel = require(`../../pages/filters/FilterRestaurantsPanel`);
let FilterList = require(`../../pages/filters/FilterListRestaurant`);
let filtersData = require('../../pages/filters/filtersData');
let UsersData = require('../../UsersData');

describe('test for checkbox filter', () => {

    beforeEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter());
    });

    afterEach(() => {
        let filterPanel = new FilterPanel();

        filterPanel.clearRadioFilter(`Rating`)
            .then(() => filterPanel.clearRadioFilter(`Price`))
            .then(() => filterPanel.clearCheckFilter());
    });

    it('should get count of restaurants list', () => {

        let filterList = new FilterList();
        let filterPanel = new FilterPanel();

        let selectedCuisines = null;
        
        if (!UsersData.cuisine || UsersData.cuisine.length === 0) {
            selectedCuisines = getRandomCuisine(0, filtersData.CUISINE.length - 1);
        } else {
            selectedCuisines = UsersData.cuisine;
        }

        let cuisines = getCuisines(selectedCuisines);

        filterPanel.setCheckBoxFilter(`Cuisines`, getCuisinesName(cuisines))
            .then(() => expect(filterList.getAllRestaurants().count()).toEqual(getTotalCount(cuisines)));
    });
});

/**
 * Получить массив объуктов "кухня"
 * @param testCuisines
 * @returns {Array}
 */
function getCuisines(testCuisines) {
    let cuisines = [];

    if(Array.isArray(testCuisines)) {
        testCuisines.forEach((currentCuisineName) => {
            cuisines.push(findCuisineElement(currentCuisineName));
        })
    } else {
        cuisines.push(filtersData.CUISINE[testCuisines]);
    }

    return cuisines;
}

/**
 * Найти объект кухни с совпадающим названием
 * @param cuisineName
 * @returns {{name: string, count: number} | undefined}
 */
function findCuisineElement(cuisineName) {
    return filtersData.CUISINE.find((currentElement) => {
        return cuisineName === currentElement.name
    })
}

/**
 * получить массив названий кухонь
 * @param cuisines
 * @returns {Array}
 */
function getCuisinesName(cuisines) {
    return cuisines.map((cuisine) => cuisine.name);
}

/**
 * плучить случайный номер кухни
 * @param min
 * @param max
 * @returns {Number}
 */
function getRandomCuisine(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * получить общее количество ресторанов разных кухонь
 * @param arrayObj
 */
function getTotalCount(arrayObj) {
    return arrayObj.reduce((totalCount, elem) => {
        return totalCount + elem.count;
    }, 0);
}