class FilterRestaurantsPanel {

    constructor() {
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
        // this.EC = protractor.ExpectedConditions;
    }


    setRatingFilter(typeFilter, value) {
        return this._setRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(value)).click();
    }

    /**
     * находит root для понели рейтингов
     * @param typeFilter
     * @returns {ElementFinder}
     * @private
     */
    _setRootRadioBtnFilterElement(typeFilter) {
        let root = null;
        FilterRestaurantsPanel.TYPES_RADIO_FILTERS.forEach((item) => {
            if (typeFilter.toLowerCase() === item) {
                 root = element(by.model(`$parent.filter.${item}`));
            }
        });

        return root;
    }


    setCheckBoxFilter(typeFilter, ...values) {

        if (typeFilter.toLowerCase() === 'cuisines') {
            return this.rootCheckBoxFilter.$$(`[type="checkbox"]`).each((checkbox) => {
                checkbox.getText().then((text) => {
                    if (values.includes(text))
                        checkbox.click();
                })
            })
        }
    }

    clearFilter(typeFilter) {
        typeFilter = typeFilter.toLowerCase();
        browser.driver.actions().mouseMove(this._setRootRadioBtnFilterElement(typeFilter)
            .$(`ul + a[ng-click="select(null)"]`)).perform();

        return this._setRootRadioBtnFilterElement(typeFilter)
            .$(`ul + a[ng-click="select(null)"]`).click();

    }

}

FilterRestaurantsPanel.TYPES_RADIO_FILTERS = [
    `rating`,
    `price`
];

FilterRestaurantsPanel.CUISINE = [
    `african`,
    `american`,
    `barbecue`,
    `cafe`,
    `chinese`,
    `czech / slovak`,
    `german`,
    `indian`,
    `japanese`,
    `mexican`,
    `pizza`,
    `thai`,
    `vegetarian`
];


module.exports = FilterRestaurantsPanel;