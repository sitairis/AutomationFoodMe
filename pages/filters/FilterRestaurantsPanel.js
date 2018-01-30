let utils = require('../../lib/utils');
let FiltersData = require('./FiltersData');
let log = require('../../lib/Logger');
let valid = require('../../lib/utils/valid');

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
        if (!valid.isValidRatingValue(ratingValue)) {
            log.error(`${this.className} : setRatingFilter : ratingValue is incorrect`);
            throw new Error(`${this.className} : setRatingFilter : ratingValue is incorrect ${ratingValue}`);
        }

        let ratingElement = this._getRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(ratingValue));

        return utils.doClick(ratingElement, 'set rating/price filter')
            .then(() => log.step(`${this.className}`, 'setRatingFilter', 'set rating/price filter'))
            .catch((errorMessage) => Promise.reject(`${this.className} : Error --- setRatingFilter : ${errorMessage}`));
    }

    /**
     * находит root для понели рейтингов
     * @param typeFilter
     * @returns {ElementFinder}
     * @private
     */
    _getRootRadioBtnFilterElement(typeFilter) {
        if (!valid.isValidTypeFilter(typeFilter)) {
            log.error(`${this.className} : _getRootRadioBtnFilterElement : typeFilter is incorrect`);
            throw new Error(`${this.className} : _getRootRadioBtnFilterElement : typeFilter is incorrect`);
        }

        log.step(this.className, '_getRootRadioBtnFilterElement', 'get root element for filter');

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
        if (!valid.isString(typeFilter) || typeFilter.toLowerCase() !== 'cuisines') {
            log.error(`${this.className}: setCheckBoxFilter : typeFilter is incorrect`);
            throw new Error(`${this.className}: setCheckBoxFilter : typeFilter is incorrect`);
        }
        if (!Array.isArray(values)) {
            log.error(`${this.className}: setCheckBoxFilter : values is not an array`);
            throw new Error(`${this.className}: setCheckBoxFilter : values is not an array`);
        }
        if (valid.isEmptyArray(values)) {
            log.error(`${this.className}: setCheckBoxFilter : values is empty`);
            throw new Error(`${this.className}: setCheckBoxFilter : values is empty`);
        }

        return this.getCheckBoxesElementsCollect()
            .each((checkbox) => {
                return checkbox.getAttribute('value')
                    .then((text) => {
                        return values.forEach((el) => {
                            if (el === text) {
                                utils.doClick(checkbox, 'click on checkbox');

                                log.step(this.className, 'setCheckBoxFilter', '');
                            }
                        });
                    });
            })
            .catch((errorMessage) => {
                throw new Error(`${this.className} : Error --- setCheckBoxFilter : ${errorMessage}`);
            });
    }

    /**
     * обнулить рейтинги
     * @param typeFilter
     * @returns {*}
     */
    clearRadioFilter(typeFilter) {
        if (!typeFilter) {
            log.error(`${this.className} : clearRadioFilter : typeFilter is undefined`);
            throw new Error(`${this.className} : clearRadioFilter : typeFilter is undefined`);
        }

        let btnClear = this._getRootRadioBtnFilterElement(typeFilter.toLowerCase())
            .$(`ul + a[ng-click="select(null)"]`);
        browser.driver.actions().mouseMove(btnClear).perform();

        return utils.doClick(btnClear, 'click on button Clear')
            .then(() => log.step(this.className, 'clearRadioFilter', ''))
            .catch((errorMessage) => Promise.reject(`${this.className} : Error --- clearRadioFilter : ${errorMessage}`));
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

                    log.step(this.className, 'clearCheckFilter', '');
                }
            })
        })
            .catch((errorMessage) => {
                throw new Error(`${this.className} : Error --- clearCheckFilter: ${errorMessage}`);
            });
    }

    /**
     * вернет массив элементов 'кухни'
     * @returns {ElementArrayFinder | *}
     */
    getCheckBoxesElementsCollect() {
        log.step(this.className, 'getCheckBoxesElementsCollect', '');

        return this.rootCheckBoxFilter.$$(`input[type="checkbox"]`);
    }

    /**
     * вернет массив со значениями атребута value
     * @returns {promise.Promise<any[]>}
     */
    getCheckboxesValues() {
       return this.getCheckBoxesElementsCollect().map((elem) => elem.getAttribute('value'));

    }
}

module.exports = new FilterRestaurantsPanel();
