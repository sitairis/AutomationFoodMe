let utils = require('../../lib/utils');
let FiltersData = require('./FiltersData');
let log = require('../../lib/Logger');

class FilterRestaurantsPanel {

    constructor() {
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
    }

    /**
     * кликнуть на рейтинг
     * @param typeFilter
     * @param ratingValue
     */
    setRatingFilter(typeFilter, ratingValue) {

        return this._getRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(ratingValue))
            .click()
            .then(() => log.step('FilterRestaurantsPanel', 'setRatingFilter','set rating/price filter'));
    }

    /**
     * находит root для понели рейтингов
     * @param typeFilter
     * @returns {ElementFinder}
     * @private
     */
    _getRootRadioBtnFilterElement(typeFilter) {
        log.step('FilterRestaurantsPanel', '_getRootRadioBtnFilterElement','get root element for filter');

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
     * кликает на 'кухни'
     * @param typeFilter
     * @param values
     * @returns {promise.Promise<any>}
     */
    setCheckBoxFilter(typeFilter, [...values]) {

        if (!utils.isString(typeFilter) || typeFilter.toLowerCase() !== 'cuisines') throw new Error(`FilterRestaurantsPanel: typeFilter is incorrect`);
        utils.rightValues(values);

        return this.getAllCheckBoxes()
            .each((checkbox) => {
                checkbox.getAttribute('value')
                    .then((text) => {
                        values.forEach((el) => {
                            if (el === text) {
                                checkbox.click();
                                log.step('FilterRestaurantsPanel', 'setCheckBoxFilter','');
                            }
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
        if (!typeFilter) throw new Error(`FilterRestaurantsPanel: typeFilter is undefined`);

        let btnClear = this._getRootRadioBtnFilterElement(typeFilter.toLowerCase())
            .$(`ul + a[ng-click="select(null)"]`);
        browser.driver.actions().mouseMove(btnClear).perform();

        return btnClear.click()
            .then(() => log.step('FilterRestaurantsPanel', 'clearRadioFilter',''));
    }

    /**
     * очищает фильтр с 'кухнями'
     * @returns {promise.Promise<any>}
     */
    clearCheckFilter() {
        return this.getAllCheckBoxes()
            .each((checkbox) => {
                checkbox.isSelected()
                    .then((selected) => {
                        if (selected === true) {
                            checkbox.click();
                            log.step('FilterRestaurantsPanel', 'clearCheckFilter','');
                        }
                    })
            })
            .catch((err) => {
                throw new Error(`FilterRestaurantsPanel: Error --- clearCheckFilter: ${err.message}`);
            });
    }

    /**
     * вернет массив элементов 'кухни'
     * @returns {ElementArrayFinder | *}
     */
    getAllCheckBoxes() {
        log.step('FilterRestaurantsPanel', 'getAllCheckBoxes','');

        return this.rootCheckBoxFilter.$$(`input[type="checkbox"]`);
    }
}

module.exports = FilterRestaurantsPanel;
