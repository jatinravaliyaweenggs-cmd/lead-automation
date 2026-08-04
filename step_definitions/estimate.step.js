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

Then('user enter new section', async function () {
  await estimatePage.addNewSection();
  await estimatePage.addSectionDescription();
  const section = this.page.locator('div.flex.items-center.gap-2').getByText('Test Section');
  await section.waitFor({ state: 'visible' });
  await expect(section).toBeVisible();
})

Then('User import estimate from template', async function () {
  await estimatePage.importFromEstimateTemplate();
  await estimatePage.uploadCSVFile();
  await estimatePage.pasteFromClipboard();
});


When('user enter manual item', async function () {
  await estimatePage.addManualItemTabClick();
});

When('User select Home Depot item from Home Depot page', async function () {
  await estimatePage.homeDepotItemAdd();
})

When('User enter material from material tab', async function () {
  await estimatePage.materialAddFromMaterialPage();
})


When('User enter labor from labor tab', async function () {
  await estimatePage.laborAddFromLaborPage();
})


When('User enter equipment from equipment tab', async function () {
  await estimatePage.equipmentAddFromLaborPage();
})

When('User enter subcontractor from subcontractor tab', async function () {
  await estimatePage.subcontractorAddFromSubcontractorPage();
});

When('User enter other item from other item tab', async function () {
  await estimatePage.otherItemsAddFromOtherItemsPage();
});


When('User update View Edit Section Details', async function () {
  await estimatePage.updateSectionDetails();
const section = this.page.locator('span.ant-typography', { hasText: 'Test Section' }).first();
await expect(section).toBeVisible();
});

When('User apply Automatic Bulk Markup', async function () {
  await estimatePage.applyBulkMarkUp();
  const section = this.page.locator('span.ant-typography', { hasText: 'Copy of Test Section' }).first();
await expect(section).toBeVisible();
})


When('User update item details and delete item', async function () {
  await estimatePage.updateItemDetails();
})

Then('User verify hide markup functionality', async function () {
await estimatePage.hideandmarkupCheck();

})

When('User apply bid package', async function () {
await estimatePage.createBidPackage();
await estimatePage.termsValueEnterInBidPackage();
await estimatePage.uploadFileinBid();



})

Then('User apply and remove tax', async function () {
  await estimatePage.removeTax();
  await estimatePage.applyTax();
})


When('Make item optional', async function () {
  await estimatePage.makeItemOptional();
})

When('user apply markup and verify value', async function () {
await estimatePage.applyBulkMarkUpToSelectedItem();
await estimatePage.applyBulkMarkUpToSelectedItemWithNoMarkup();
await estimatePage.openApplyBulkMarkupPopupMinMax();
await estimatePage.increaseMarkupBy();
await estimatePage.reduceTheMarkupOfSelectedItemsBy();
await estimatePage.reduceTheMarkupofSelectedItemsBy();
await estimatePage.resetTheMarkupForSelectedItemsToZero();
await estimatePage.UpdateTheMarkupOfSelectedItemsFrom();
})

When('User copy selected items', async function (){
await estimatePage.copyitems();
})

Then('User update tab name', async function () {
  await estimatePage.swapTabsByDrag();
})

Then('User enter scope of detail', async function(){
await estimatePage.enterScopeOfDetail();
})

Then('Upload files in estimate', async function () {
  await estimatePage.uploadFileInEstimate();
})

Then('Open coversheet page and apply template', async function () {
  await estimatePage.openCoversheetPage();
})