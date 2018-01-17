let Logger = require('../../elements/Logger');

class FilterListRestaurant {

    constructor() {
        this.log = new Logger();
        this.root = $(`table`);
    }

    /**
     * получить все рестираны
     * @returns {ElementArrayFinder}
     */
    getAllRestaurants() {
        this.log.step('FilterListRestaurant', 'getAllRestaurants','***');
        return this.root.all(by.repeater(`restaurant in restaurants`));
    }

    /**
     * получает массив с "рейтингом"{paring, price} из всех ресторанов
     * @returns {ElementArrayFinder}
     */
    getAllRatings(type) {
        this.log.step('FilterListRestaurant', 'getAllRatings','***');

        return this.getAllRestaurants()
            .evaluate(`restaurant.${type}`);
    }



    // /**
    //  *
    //  * @returns {promise.Promise<boolean>}
    //  */
    // thereIs(){
    //     return this.getAllRestaurants().isPresent();
    // }
}
module.exports = FilterListRestaurant;