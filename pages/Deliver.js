let Logger = require('../elements/Logger');

class DeliverForm {
    constructor() {
        this.log = new Logger();
        this.deliver = $(`a.pull-right`);
    }

    changeDeliver() {
        this.log.step('DeliverForm', 'changeDeliver','***');
        return this.deliver.click();
    }
}

module.exports = DeliverForm;