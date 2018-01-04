class RestaurantFilter {

    constructor() {
        this.root = $(`.table.table-hover.table-striped`);
    }

    getPrice() {

    }

    getRating() {

    }

    getAllRestaurants () {
        return this.root.$$(`tr.ng-scope`);
    }
}