const { When, Then, And } = require('@cucumber/cucumber');

const ChangeOrderPage = require('../pages/ChangeOrderPage');

let changeOrderPage;

When('User opens the Change Orders page and verify chnage oder page open', async function () {
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.openChangeOrderPage();
    await this.page.waitForURL('**/manage-change-orders');
});

When('User click on the create change order button and create chnage order', async function(){
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.clickAddChangeOrderButton();
    await changeOrderPage.createChnageOrder();
})


When('User click on filter and verify filter data', async function () {
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.clickFilterButton();
    //await changeOrderPage.verifyFilterData();
    
})

When('User click on a chnage order button and verify mandatory data', async function() {
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.verifyMandatoryData();
    
})



When('User click on the create change order button and verify project name maximum lenght', async function(){
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.clickAddChangeOrderButton();
    await changeOrderPage.createChnageOrderForMaxProjectLenght();
})


When('User click on the create change order request button and create chnage order request', async function(){
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.createChnageOrderRequest();
})

Then('User verify mandatory fields', async function () {
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.verifyMandatoryForChangeOrderRequest();
})

When('Verify maximum project subject lenght for chnage order request', async function(){
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.createChnageOrderRequestForMaxProjectLenght();
})

When('User verifies the Set as Default View functionality', async function(){
    changeOrderPage = new ChangeOrderPage(this.page);
    await changeOrderPage.verifyKanbanView();

})

When('User verifies selected project remove', async function(){
    await changeOrderPage.verifySelectedProjectRemove();
})

When('User verifies start at Number seeting functionality', async function(){

    
    await changeOrderPage.verifyStartAtNumberSetting();

})