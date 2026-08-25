const { When, Then } = require('@cucumber/cucumber');

const ChangeOrderPage = require('../pages/ChangeOrderPage');

let changeOrderPage;

When('user opens the Change Orders page', async function () {
    changeOrderPage = new ChangeOrderPage(this.page);

    await changeOrderPage.openChangeOrderPage();
});

Then('Change Orders page should be displayed', async function () {
    await this.page.waitForURL('**/manage-change-orders');
});