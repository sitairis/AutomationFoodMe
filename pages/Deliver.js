let log = require('../lib/Logger');
let protrUtils = require('../lib/utils/protrUtils');

class DeliverForm {
    constructor() {
        this.btnDeliver = $(`a.pull-right`);
    }

    /**
     * нажатие кнопки 'Change'
     * @returns {promise.Promise<any>}
     */
    changeDeliver() {
        return protrUtils.doClick(this.btnDeliver, 'click on btnDeliver')
            .then(() => log.step('DeliverForm', 'changeDeliver','click on btnDeliver'))
            .catch((err) => Promise.reject(new Error(`DeliverForm : Error --- changeDeliver : ${err}`)));
    }
}

module.exports = new DeliverForm();