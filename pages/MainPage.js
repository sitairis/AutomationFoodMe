let Page = require('./Page');
let utils = require(`../utils/utils`);
let baseEl = require('../elements/BaseElement');
let button = require('../elements/Button');

class MainPage extends Page {

    constructor() {
        super(`main page`);
        this.rootRestaurantList = new baseEl('a', `div.span9.fm-panel.fm-restaurant-list`);
    }

    /**
     * вернет заголовок с количеством ресторанов
     * @returns {*}
     */
    getListTitle() {
        return this.rootRestaurantList.findElementsByCSS('h4').getText();
    }

    /**
     * перейти на страницу ресторана
     * @param index
     * @returns {*}
     */
    openRestaurant(index) {
        if (!utils.isRightIndex(index)) throw new Error(`MainPage: index is incorrect`);

        let restaurant = this.rootRestaurantList.findElementsByCSS(`img.img-rounded.pull-left`).get(index);
        return restaurant.click();
    }

    /**
     *
     */
    getAllRestaurants() {
        return element.all(by.repeater(`restaurant in restaurants`));
    }



    sortByPriceDesc(allItems){

        return allItems.map((item, index) => {
element(by.css)
            return {
                value: item.evaluate('menuItem.price'),
                name: item.evaluate('menuItem.name'),
                index: index
            };
        })
            .then((unSorted) => unSorted.sort((a, b) => a.value - b.value));
    }

}

module.exports = MainPage;