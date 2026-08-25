const { When, Then } = require('@cucumber/cucumber');

const ChangeOrderPage = require('../pages/ChangeOrderPage');

let changeOrderPage;

When('User opens the Change Orders page and Change Orders page should be displayed', async function () {
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.openChangeOrderPage();
    await this.page.waitForURL('**/manage-change-orders');
});