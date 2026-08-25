const { expect } = require('@playwright/test');
class ChangeOrderPageComman {

    constructor(page) {
        this.page = page;

        this.saveButton = page.getByRole('button', {name: 'Save', exact: true });
        this.backButton = page.getByRole('button', {name: 'Back', exact: true
        });
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickBackButton() {
        await this.backButton.click();
    }

   
}

module.exports = ChangeOrderPageComman;