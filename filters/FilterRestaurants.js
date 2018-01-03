class FilterRestaurants {

    constructor() {

        this.rootRadioFilter = 0;
        this.rootCheckBoxFilter = element(by.model(`filter.cuisine`));

    }

    setFilter(typeFilter, ...value) {

        typeFilter = typeFilter.toLowerCase();
        this._setRootRadioBtnFilterElement(typeFilter);
        let filterItems = this.rootRadioFilter.$$(`li.style`);

        value--;

        for (let item of filterItems) {

            if (item === value) {
                item.click();
            }

        }

        if (typeFilter === `cuisine`) this.setCheckBoxFilter(value);

    }


    _setRootRadioBtnFilterElement(typeFilter) {

        for (let i = 0; i < FilterRestaurants.TYPES_RADIO_FILTERS.length; i++) {

            if (typeFilter === FilterRestaurants.TYPES_RADIO_FILTERS[i]) {
                this.rootRadioFilter = element(by.model(`$parent.filter.${FilterRestaurants.TYPES_RADIO_FILTERS[i]}`));
            }

        }
    }

    setCheckBoxFilter(values){

        let cuisines = this.rootCheckBoxFilter.$$(`[type="checkbox"]`);

        values.forEach((value) => {

            cuisines.forEach((checkBox) => {

                if(checkBox.getValue() === value) {
                    checkBox.click();
                }

            })

        });
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