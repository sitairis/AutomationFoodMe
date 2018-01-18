let log = require('../lib/Logger');

class DeliverForm {
    constructor() {
        this.btnDeliver = $(`a.pull-right`);
    }

    changeDeliver() {
        log.step('DeliverForm', 'changeDeliver','click on btnDeliver');
        return this.btnDeliver.click();
    }
}

module.exports = DeliverForm;