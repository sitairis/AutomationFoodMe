class FilterRestaurants {

    constructor() {
        this.rootRadioBtnFilter = null;
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));
    }


    setRatingFilter(typeFilter, value) {

        this._setRootRadioBtnFilterElement(typeFilter);


        return this.rootRadioBtnFilter.$$(`li[ng-class="style"]`).get(value).click();
    }


    _setRootRadioBtnFilterElement(typeFilter) {

        FilterRestaurants.TYPES_RADIO_FILTERS.forEach((item) => {
            if (typeFilter.toLowerCase() === item) {
                this.rootRadioBtnFilter = element(by.model(`$parent.filter.${item}`));
            }
        });
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

        let rootFilter = this._setRootRadioBtnFilterElement(typeFilter);
        rootFilter.$(`[ng-hide="readonly"]`).click();
    }

}

FilterRestaurants.TYPES_RADIO_FILTERS = [
    `rating`,
    `price`
];

FilterRestaurants.CUISINE = [
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


module.exports = FilterRestaurants;