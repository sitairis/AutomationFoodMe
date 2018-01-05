class FilterRestaurantsPanel {

    constructor() {
        // this.rootRadioBtnFilter = null;
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
        // this.EC = protractor.ExpectedConditions;
    }


    setRatingFilter(typeFilter, value) {
        return this._setRootRadioBtnFilterElement(typeFilter)
            .$$(`li[ng-class="style"]`)
            .get(Number.parseInt(value)).click();
    }

    /**
     *
     * @param typeFilter
     * @returns {*}
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

        // browser.actions().mouseMove(browser.findElement(protractor.By.css(`$parent.filter.${typeFilter} ul + a[ng-click="select(null)"]`).perform()));
        return this._setRootRadioBtnFilterElement(typeFilter)
            .$(`ul + a[ng-click="select(null)"]`).click();
        // browser.wait(this.EC.visibilityOf(this._setRootRadioBtnFilterElement(typeFilter)
        //     .$(`ul + a[ng-click="select(null)"]`)), 5000);

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