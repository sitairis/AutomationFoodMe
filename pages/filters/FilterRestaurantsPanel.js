let utils = require('../../lib/utils');
let FiltersData = require('./FiltersData');
let log = require('../../lib/Logger');

class FilterRestaurantsPanel {

    constructor() {
        this.className = `FilterRestaurantsPanel`;
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
    }

    /**
     * кликнуть на рейтинг
     * @param typeFilter
     * @param ratingValue
     */
    setRatingFilter(typeFilter, ratingValue) {
        let ratingElement = this._getRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(ratingValue));

        return utils.doClick(ratingElement, 'set rating/price filter')
            .then(() => log.step(`${this.className}`, 'setRatingFilter', 'set rating/price filter'))
            .catch(() => Promise.reject(` : Error --- setRatingFilter`));
    }

    /**
     * находит root для понели рейтингов
     * @param typeFilter
     * @returns {ElementFinder}
     * @private
     */
    _getRootRadioBtnFilterElement(typeFilter) {
        if (!utils.isRightTypeFilter(typeFilter)) throw new Error(`FilterRestaurantsPanel: typeFilter is incorrect`);

        log.step('FilterRestaurantsPanel', '_getRootRadioBtnFilterElement', 'get root element for filter');

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
        if (!Array.isArray(values)) throw new Error(`FilterRestaurantsPanel: values is not an array`);
        if (utils.isEmptyArray(values)) throw new Error(`FilterRestaurantsPanel: values is empty`);

        return this.getCheckBoxesElementsCollect()
            .each((checkbox) => {
                checkbox.getAttribute('value')
                    .then((text) => {
                        values.forEach((el) => {
                            if (el === text) {
                                utils.doClick(checkbox, 'click on checkbox');

                                log.step('FilterRestaurantsPanel', 'setCheckBoxFilter', '');
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

        return utils.doClick(btnClear, 'click on button Clear')
            .then(() => log.step('FilterRestaurantsPanel', 'clearRadioFilter', ''))
            .catch(() => Promise.reject(` : Error --- clickBtnPurchase`));
    }

    /**
     * очищает фильтр с 'кухнями'
     * @returns {promise.Promise<any>}
     */
    clearCheckFilter() {
        return this.getCheckBoxesElementsCollect().each((checkbox) => {
            checkbox.isSelected().then((selected) => {
                if (selected === true) {
                    utils.doClick(checkbox, 'clear checkbox filter');

                    log.step('FilterRestaurantsPanel', 'clearCheckFilter', '');
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
    getCheckBoxesElementsCollect() {
        log.step('FilterRestaurantsPanel', 'getCheckBoxesElementsCollect', '');

        return this.rootCheckBoxFilter.$$(`input[type="checkbox"]`);
    }
}

module.exports = FilterRestaurantsPanel;
