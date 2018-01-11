class DeliverForm {
    constructor() {
        this.deliver = $(`a.pull-right`);
    }

    changeDeliver() {
        return this.deliver.click();
    }
}

module.exports = DeliverForm;