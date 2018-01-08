class FilterListRestaurant {

    constructor() {
        this.root = $(`table`);
    }

    /**
     * получить все рестираны
     * @returns {ElementArrayFinder}
     */
    getAllRestaurants() {
        return this.root.all(by.css(`[ng-repeat="restaurant in restaurants"]`));
    }

    /**
     * получает массив элементов с "рейтингом" из всех ресторанов
     * @returns {ElementArrayFinder}
     */
    getAllSelectedRatings() {
        return this.getAllRestaurants()
            .all(by.model(`$parent.restaurant.rating`));
    }

    /**
     * получает количество выбраных "звездочек"
     * @param rating
     * @returns {promise.Promise<number>}
     */
    getCount(rating) {
        if (!rating) throw new Error(`FilterListRestaurant: rating is undefined`);

        return rating.$$('li[class~=fm-selected]').count();
    }

    /**
     * получает массив элементов с "ценой" из всех ресторанов
     * @returns {ElementArrayFinder}
     */
    getAllSelectedPrices() {
        return this.getAllRestaurants()
            .all(by.model(`$parent.restaurant.price`));
    }
}
module.exports = FilterListRestaurant;