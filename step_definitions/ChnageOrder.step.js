const { When, Then, And } = require('@cucumber/cucumber');

const ChangeOrderPage = require('../pages/ChangeOrderPage');

let changeOrderPage;

When('User opens the Change Orders page and verify chnage oder pahe open', async function () {
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.openChangeOrderPage();
    await this.page.waitForURL('**/manage-change-orders');
});

When('User click on the create change order button', async function(){
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.clickAddChangeOrder();
})


