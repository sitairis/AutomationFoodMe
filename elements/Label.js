let BaseElement = require('./BaseElement');

class Label extends BaseElement {

    constructor(name, selector) {
        super(name, selector);
    }

    getEvaluateText(prop) {
        return this.selector.evaluate(prop)
            .then((err) => console.log(err));
    }


}
module.exports = Label;