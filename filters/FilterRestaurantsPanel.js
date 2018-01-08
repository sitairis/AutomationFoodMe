let utils = require('../utils/utils');
let data = require('./filtersData');

class FilterRestaurantsPanel {

    constructor() {
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
    }

    /**
     *
     * @param typeFilter
     * @param ratingValue
     * @returns {*}
     */
    setRatingFilter(typeFilter, ratingValue) {
        if (!typeFilter) throw new Error(`FilterRestaurantsPanel: typeFilter is undefined`);
        if (!ratingValue) throw new Error(`FilterRestaurantsPanel: value is undefined`);
        if (!utils.isString(typeFilter)) throw new Error(`FilterRestaurantsPanel: typeFilter is not a string`);
        // if (!utils.isNumber(ratingValue)) throw new Error(`FilterRestaurantsPanel: value is not a number`);
        if (!utils.isRightValue(ratingValue)) throw new Error(`FilterRestaurantsPanel: value is incorrect`);

        return this._setRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(ratingValue)).click();
    }

    /**
     * находит root для понели рейтингов
     * @param typeFilter
     * @returns {ElementFinder}
     * @private
     */
    _setRootRadioBtnFilterElement(typeFilter) {
        if (!typeFilter) throw new Error(`FilterRestaurantsPanel: typeFilter is undefined`);

        let root = null;
        data.TYPES_RADIO_FILTERS.forEach((item) => {
            if (typeFilter.toLowerCase() === item) {
                root = element(by.model(`$parent.filter.${item}`));
            }
        });

        return root;
    }

    /**
     *
     * @param typeFilter
     * @param values
     * @returns {promise.Promise<any>}
     */
    setCheckBoxFilter(typeFilter, [...values]) {
        if (!typeFilter) throw new Error(`FilterRestaurantsPanel: typeFilter is undefined`);
        if (!Array.isArray(values)) throw new Error(`FilterRestaurantsPanel: values is not an array`);
        if (utils.isEmpty(values)) throw new Error(`FilterRestaurantsPanel: values is empty`);
        if (typeFilter.toLowerCase() !== 'cuisines') throw new Error(`FilterRestaurantsPanel: typeFilter is incorrect`);

        return this.getAllCheckBoxes().each((checkbox) => {
            checkbox.getAttribute('value')
                .then((text) => {
                    values.forEach((el) => {
                        if (el === text) checkbox.click()
                    });
                });
        })
    }

    /**
     * обнулить рейтинги
     * @param typeFilter
     * @returns {*}
     */
    clearRadioFilter(typeFilter) {
        if (!typeFilter) throw new Error(`FilterRestaurantsPanel: typeFilter is undefined`);

        browser.driver.actions().mouseMove(this._setRootRadioBtnFilterElement(typeFilter.toLowerCase())
            .$(`ul + a[ng-click="select(null)"]`)).perform();

        return this._setRootRadioBtnFilterElement(typeFilter.toLowerCase())
            .$(`ul + a[ng-click="select(null)"]`).click();

    }

    /**
     *
     * @returns {promise.Promise<any>}
     */
    clearCheckFilter() {
        return this.getAllCheckBoxes().each((checkbox) => {
            checkbox.isSelected()
                .then((selected) => {
                if(selected === true) checkbox.click();
            })
        });
    }

    /**
     *
     * @returns {ElementArrayFinder | *}
     */
    getAllCheckBoxes() {
        return this.rootCheckBoxFilter.$$(`input[type="checkbox"]`);
    }
}

module.exports = FilterRestaurantsPanel;
