const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const EstimatePage = require('../pages/EstimatePage');

let estimatePage;

When('User navigates to Estimate page', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.openEstimatePage();
});

When('User creates a new Estimate', async function () {
  await estimatePage.createEstimate();
});

When('User navigates to Estimate page and open estimate', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.openEstimatePage();
  await estimatePage.openastimateAndEnterDetails();

});

Then('User open estimate and enter details', async function () {
  await estimatePage.openastimateAndEnterDetails();
   await estimatePage.selectTermValue();
   await estimatePage.selectProjectType();
   await estimatePage.selectSector();
   await estimatePage.selectContact();
   await estimatePage.selectInvoicedTo();
   await estimatePage.selectAddress();
   await estimatePage.enterTermsInclusionsExclusions();
});

Then('User open enter item', async function () {
  await estimatePage.openastimateAndEnterDetails();
  await estimatePage.addItemDetails();
  await estimatePage.clickYesAndValidate();
  await estimatePage.clickNoAndValidate();
}
);

Then('user enter new section', async function(){
await estimatePage.addNewSection();
await estimatePage.addSectionDescription();
const section = this.page.locator('div.flex.items-center.gap-2').getByText('Test Section');
await section.waitFor({ state: 'visible' });
await expect(section).toBeVisible();
})

Then('User import estimate from template', async function(){
  await estimatePage.importFromEstimateTemplate();
  await estimatePage.uploadCSVFile();
  await estimatePage.pasteFromClipboard();
});


When('user enter manual item', async function () {
  await estimatePage.addManualItemTabClick();
});

When('User select Home Depot item from Home Depot page', async function (){
    await estimatePage.homeDepotItemAdd();
})

When('User enter material from material tab', async function (){
  await estimatePage.materialAddFromMaterialPage();
})


When('User enter labor from labor tab', async function (){
await estimatePage.laborAddFromLaborPage();
})


When('User enter equipment from equipment tab', async function () {
await estimatePage.equipmentAddFromLaborPage();
})