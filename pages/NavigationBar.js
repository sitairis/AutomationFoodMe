class NavigationBar {

    constructor() {
        this.root = $(`.navbar-inner`);
        this.btnHowItWorks = this.root.$(`[href="#/how-it-works"]`);
        this.btnWhyWeAre = this.root.$(`[href="#/who-we-are"`);
    }

    clickBtnHowItWorks () {
        return this.btnHowItWorks.click();
    }

    clickBtnWhyWeAre () {
        return this.btnWhyWeAre.click();
    }





}