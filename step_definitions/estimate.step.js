const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const EstimatePage = require('../pages/EstimatePage');
const BasePage = require('../pages/BasePage');

let estimatePage;



Then('Create an estimate from an opportunity for a lead using the plus button', async function name() {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.OpportunityCreateForNewLead();
})

Then('Create an estimate from an opportunity for a customer using the plus button', async function(){
    estimatePage = new EstimatePage(this.page);
    await estimatePage.OpportunityCreateForNewCustomer();
})

Then('Create an estimate from an opportunity by lead', async function () {
      estimatePage = new EstimatePage(this.page);
      await estimatePage.createAnEstimateFromAnOpportunityByLead();
})

Then('Create an estimate from an opportunity by customer', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.opportunitysCreateForExistingCustomerBy();
})

Then('Verify Show Favourites Only functionality', async function () {
  await estimatePage.showFavouritesOnlyCheckBox();
})

Then('User create an estimate for an existing Lead', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.estimateCreateForExistingLeadBy();
})

Then('User click on plus button and create Lead for estimate', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.estimateCreateForNewLeadByPlusButton();
})

Then('User click on plus button and create customer for estimate', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.estimateCreateForNewCustomerByPlusButton();
})

When('User serch not exits customer and lead', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.noRecordFilterSerchForCustomerAndLead();
});

When('User create estimate using existing project', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.createEstimateUsingExistingProject();
});

When('User create new project in estimate', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.userCreateNewProjectForEstimate();
  await estimatePage.EstimaterCreateUsingNewProject();
});

When('User navigates to Estimate page and create estimate', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.openEstimatePage();
  await estimatePage.createEstimate();
});

When('User navigates to Estimate page', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.openEstimatePage();
});

When('User creates a new Estimate', async function () {
  await estimatePage.createEstimate();
});

Then('User verifies mandatory fields for create estimate', async function () {
  await estimatePage.verifyRequiredFieldErrors();
})

When('User navigates to Estimate page and open estimate', async function () {
  estimatePage = new EstimatePage(this.page);
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
});

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

When('User copy selected items', async function () {
  await estimatePage.copyitems();
})

Then('User update tab name', async function () {
  await estimatePage.swapTabsByDrag();
})

Then('User enter scope of detail', async function () {
  await estimatePage.enterScopeOfDetail();
})

Then('Upload files in estimate', async function () {
  await estimatePage.uploadFileInEstimate();
})

Then('Open coversheet page and apply template', async function () {
  await estimatePage.openCoversheetPage();
})

Then('User enter note in estimate', async function () {
  await estimatePage.addNote();
})

Then('User copy the estimate', async function () {
  await estimatePage.estimateCopyButton();
})

Then('User search the estimate', async function name() {
  await estimatePage.searchProject();
})

Then('User open module setting page and apply customized starting number setting', async function () {
  if (!estimatePage) estimatePage = new (require('../pages/EstimatePage'))(this.page);
  await estimatePage.customizedStartingNumber();
});