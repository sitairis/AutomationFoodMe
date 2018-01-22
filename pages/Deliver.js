let log = require('../lib/Logger');
let utils = require('../lib/utils');

class DeliverForm {
    constructor() {
        this.btnDeliver = $(`a.pull-right`);
    }

    /**
     * нажатие кнопки 'Change'
     * @returns {promise.Promise<any>}
     */
    changeDeliver() {
        return utils.doClick(this.btnDeliver, 'click on btnDeliver')
            .then(() => log.step('DeliverForm', 'changeDeliver','click on btnDeliver'))
            .catch(() => Promise.reject(`DeliverForm : Error --- changeDeliver`));
    }
}

module.exports = DeliverForm;