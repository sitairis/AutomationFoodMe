let log = require('../lib/Logger');

class DeliverForm {
    constructor() {
        this.btnDeliver = $(`a.pull-right`);
    }

    changeDeliver() {

        return this.btnDeliver.click()
            .then(() => log.step('DeliverForm', 'changeDeliver','click on btnDeliver'));
    }
}

module.exports = DeliverForm;