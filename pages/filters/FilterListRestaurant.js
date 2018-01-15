class FilterListRestaurant {

    constructor() {
        this.root = $(`table`);
    }

    /**
     * получить все рестираны
     * @returns {ElementArrayFinder}
     */
    getAllRestaurants() {
        return this.root.all(by.repeater(`restaurant in restaurants`));
    }

    /**
     * получает массив с "рейтингом"{paring, price} из всех ресторанов
     * @returns {ElementArrayFinder}
     */
    getAllRatings(type) {
        return this.getAllRestaurants()
            .evaluate(`restaurant.${type}`);
    }

    /**
     *
     * @returns {promise.Promise<boolean>}
     */
    thereIs(){
        return this.getAllRestaurants().isPresent();
    }
}
module.exports = FilterListRestaurant;