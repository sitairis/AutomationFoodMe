let utils = require('../../utils/utils');
let FiltersData = require('./FiltersData');
let Logger = require('../../elements/Logger');

class FilterRestaurantsPanel {

    constructor() {
        this.log = new Logger();
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
    }

    /**
     *
     * @param typeFilter
     * @param ratingValue
     * @returns {*}
     */
    setRatingFilter(typeFilter, ratingValue) {
        this.log.step('FilterRestaurantsPanel', 'setRatingFilter','***');

        return this._getRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(ratingValue)).click();
    }

    /**
     * находит root для понели рейтингов
     * @param typeFilter
     * @returns {ElementFinder}
     * @private
     */
    _getRootRadioBtnFilterElement(typeFilter) {
        this.log.step('FilterRestaurantsPanel', '_getRootRadioBtnFilterElement','***');

        if (!utils.isRightTypeFilter(typeFilter)) throw new Error(`FilterRestaurantsPanel: typeFilter is incorrect`);

        let root = null;
        FiltersData.TYPES_RADIO_FILTERS.forEach((item) => {
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
        this.log.step('FilterRestaurantsPanel', 'setCheckBoxFilter','***');

        if (!utils.isRightTypeFilter(typeFilter) || typeFilter.toLowerCase() !== 'cuisines') throw new Error(`FilterRestaurantsPanel: typeFilter is incorrect`);
        utils.RightValues(values);

        return this.getAllCheckBoxes()
            .each((checkbox) => {
                checkbox.getAttribute('value')
                    .then((text) => {
                        values.forEach((el) => {
                            if (el === text) checkbox.click()
                        });
                    });
            })
            .catch((err) => {
                throw new Error(`FilterRestaurantsPanel: Error --- setCheckBoxFilter: ${err.message}`);
            });
    }

    /**
     * обнулить рейтинги
     * @param typeFilter
     * @returns {*}
     */
    clearRadioFilter(typeFilter) {
        this.log.step('FilterRestaurantsPanel', 'clearRadioFilter','***');

        if (!typeFilter) throw new Error(`FilterRestaurantsPanel: typeFilter is undefined`);

        let btnClear = this._getRootRadioBtnFilterElement(typeFilter.toLowerCase())
            .$(`ul + a[ng-click="select(null)"]`);
        browser.driver.actions().mouseMove(btnClear).perform();

        return btnClear.click();

    }

    /**
     *
     * @returns {promise.Promise<any>}
     */
    clearCheckFilter() {
        this.log.step('FilterRestaurantsPanel', 'clearCheckFilter','***');

        return this.getAllCheckBoxes()
            .each((checkbox) => {
                checkbox.isSelected()
                    .then((selected) => {
                        if (selected === true) checkbox.click();
                    })
            })
            .catch((err) => {
                throw new Error(`FilterRestaurantsPanel: Error --- clearCheckFilter: ${err.message}`);
            });
    }

    /**
     *
     * @returns {ElementArrayFinder | *}
     */
    getAllCheckBoxes() {
        this.log.step('FilterRestaurantsPanel', 'getAllCheckBoxes','***');

        return this.rootCheckBoxFilter.$$(`input[type="checkbox"]`);
    }
}

module.exports = FilterRestaurantsPanel;
