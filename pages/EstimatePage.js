class EstimatePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.menuDashboard = page.getByRole('button', { name: 'Menu Dashboard' });
    this.estimatesMenu = page.getByRole('link', { name: 'Estimates-plu' });
    this.newEstimateBtn = page.getByRole('button', { name: 'Estimate-sin' });

    this.titleInput = page.getByRole('textbox', { name: 'Short title for the Estimate-' });
    this.customerBtn = page.getByRole('button', { name: 'Click to select a Customer' });
    this.searchCustomer = page.getByRole('searchbox', { name: 'Search for Customer' });
    this.createEstimateBtn = page.getByRole('button', { name: 'Create Estimate-sin' });
    this.NewCreateEstimateRow = page.locator('table tbody tr');

    this.detailMenuPage = page.getByRole('button', { name: 'Details' });
    this.termTextbox = page.locator('#rc_select_2');

    this.projectTypename = page.locator('#rc_select_3');

    this.invoicedToButton = page.getByRole('button', { name: 'Invoiced To' });
    this.selectVendor = page.getByRole('button', { name: 'Vendors' });
    this.vendorSerchBox = page.getByRole('searchbox', { name: 'Search for Vendor' });
    this.rakeshVendor = page.getByText('Rakesh Raval (Rakesh and son)');

    this.addressDroupdown = page.locator('#scrollable-div-id').getByTitle('Customer');
    this.selectProjectAddress = page.getByText('Project', { exact: true });
    this.pencilIconOfAddress = page.locator('.svg-inline--fa.fa-pencil > path');
    this.addressline1 = page.locator('#ignore-input-change');
    this.addressListitem = page.getByRole('listitem').filter({ hasText: /^-$/ });
    this.termPage = page.getByRole('button', { name: 'Terms' });
    this.itemPage = page.getByRole('button', { name: 'Items' });
    this.clickYesButton = page.locator('label:has-text("Yes")');
    this.clickNoButton = page.locator('label:has-text("No")');
    this.addToEstimateSinDroupdown = page.getByRole('button', { name: 'Add Item to Estimate-sin' });
    this.addMenuItemPage = page.getByRole('menuitem', { name: 'Add New Section' });
    this.sectionName = page.locator('#section_name');
    this.sectionDescription = page.locator('#description');
    this.addButton = page.locator('button[type="submit"]');
    this.importFromTemplateOption = page.getByRole('menuitem', { name: 'Import from Estimate-sin or Template' });
    this.ImportItemsfromCsvFilePage = page.getByRole('menuitem', { name: 'Import Items from CSV File' })
    this.importCSVOption = this.page.getByRole('menuitem', { name: 'Import Items from CSV File' });
    this.importButton = page.getByRole('button', { name: 'Import' });

    this.pastefromClipboardPage = page.getByRole('menuitem', { name: 'Paste from Clipboard' })
    this.itemDescriptionTextarea = page.locator('textarea[placeholder*="Item Name"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.selectField = page.locator('div:has-text("Select Field")');
    this.addItemButton = page.getByRole('button', { name: 'Add Items' });

    this.plusItemButton = page.locator('[id^="section-"]').first().getByRole('button', { name: 'Items' });
    this.addManualItemTab = page.getByText('Add Manual Item');

    this.enterItemNameTextBox = page.getByRole('combobox', { name: 'Enter an item name' });
    this.enterSKUName = page.getByRole('textbox', { name: 'Enter SKU' });
    this.selectMaterialType = page.locator('#item_type');
    this.materialTypeValueMaterial = page.getByText('Material');
    this.enterVeriationValue = page.locator('.ant-select[name="itemVariations"] input');
    this.enterCostItem = page.locator('#cost_code_id');

    this.unitCostValue = page.getByPlaceholder('Unit Cost');
    this.selectUnitType = page.locator('.ant-select:has(.ant-select-selection-placeholder:text("Select Unit")) .ant-select-selector');
    this.uploadfilebutton = page.locator('div.cursor-pointer').filter({ hasText: 'Browse Files' });
    this.attachButton = page.getByRole('button', { name: 'Attach' });
    this.addmanualItemButton = this.page.locator('form').getByRole('button', { name: 'Add Manual Item' });

    this.homeDepotSerchBar = this.page.locator('#home-depot-search-bar');

    this.materialPageMenu = page.getByRole('button', { name: 'Material' });
    this.materialSerchbar = page.getByPlaceholder('Search for Materials');

    this.labourPageMenu = page.getByRole('button', { name: 'Labor' });
    this.laborSerchbar = page.getByPlaceholder('Search for Labors');

    this.equipmentPageMenu = page.getByRole('button', { name: 'Equipment' });
    this.equipmentSerchbar = page.getByPlaceholder('Search for Equipments');

    this.subcontractorPageMenu = page.getByRole('button', { name: 'Subcontractor' });
    this.subcontractorSerchbar = page.getByPlaceholder('Search for Subcontractors');

    this.otherItemsPageMenu = page.getByRole('button', { name: 'Other Items' });
    this.otherItemsSerchbar = page.getByPlaceholder('Search for Other Items');

    this.threeDotButtons = page.locator('button:has(svg[data-icon="ellipsis-vertical"])').nth(1);
    this.updateButton = page.getByRole('button', { name: 'Update' });
  }


  async applyBulkMarkUp(){
    await this.threeDotButtons.click();
    await this.page.getByRole('menuitem', { name: 'Apply Automatic/Bulk Markup' }).click();

  }
  async updateSectionDetails() {
  await this.threeDotButtons.click();
  await this.page.getByRole('menuitem', { name: 'View/Edit Section Details' }).click();
      await this.sectionName.fill('Test Section');
    await this.sectionDescription.fill('This is test section description');
    await this.updateButton.click();
}





async updateAddItem() {
  await this.page.waitForLoadState('domcontentloaded');

  const row = this.page.locator('.ag-center-cols-container .ag-row').first();

  await row.scrollIntoViewIfNeeded();
  await row.hover();

  const eyeBtn = row.locator('svg[data-icon="eye"]').locator('..').locator('..');

  await eyeBtn.scrollIntoViewIfNeeded();

  await this.page.waitForTimeout(500); // small wait for hover animation

  await eyeBtn.click();
}

  async otherItemsAddFromOtherItemsPage() {
    await this.plusItemButtonClick();
    await this.otherItemsPageMenu.click();
    await this.otherItemsSerchbar.first().click();
    await this.otherItemsSerchbar.first().fill('Welding machines');
    await this.page.locator('.project:has-text("Welding machines")').click();
    await this.addItemButton.click();
  }

async subcontractorAddFromSubcontractorPage(){
  await this.plusItemButtonClick();
  await this.subcontractorPageMenu.click();
  await this.subcontractorSerchbar.first().click();
  await this.subcontractorSerchbar.first().fill('Surveying equipment');
  await this.page.locator('.project:has-text("Surveying equipment")').click();
  await this.addItemButton.click();
}





async equipmentAddFromLaborPage(){
    await this.plusItemButtonClick();
    await this.equipmentPageMenu.click();
    await this.equipmentSerchbar.first().click();
    await this.equipmentSerchbar.first().fill('Concrete Edger Electric');
    await this.page.locator('.project:has-text("Concrete Edger Electric")').click();
    await this.addItemButton.click(); 


}




async laborAddFromLaborPage() {
  await this.plusItemButtonClick();
  await this.labourPageMenu.click();
  const searchBox = this.page.locator('input[placeholder="Search for Labors"]:visible');
  await searchBox.click();
  await searchBox.fill('Carpenter');
  await this.page.locator('.project').first().click();
  await this.addItemButton.click();
}
  async materialAddFromMaterialPage() {
    await this.plusItemButtonClick();
    await this.materialPageMenu.click();
    await this.materialSerchbar.first().click();
    await this.materialSerchbar.first().fill('Red Clay Bricks');
    await this.page.locator('.project:has-text("Red Clay Bricks")').click();
    await this.addItemButton.click();
  }

  async homeDepotItemAdd() {
    await this.plusItemButtonClick();
    await this.homeDepotSerchBar.fill('(2-Pack) 4 in. Zinc-Plated Hook and Eye');
    const row = this.page.locator(`.ag-row:has-text("(2-Pack) 4 in. Zinc-Plated Hook and Eye")`);
    await row.waitFor({ state: 'visible' });
    await row.locator('.ant-checkbox').first().click(); // ✅ FIX
    await this.addItemButton.click();
  }



  async uploadMaterialImage() {
    await this.page.locator('div.cursor-pointer:has(svg[data-icon="plus"])').click();
    await this.page.locator('input[type="file"]').nth(1).setInputFiles('D:\\Automation\\CreateLead\\testdata\\MaterialItems.csv');
    await this.attachButton.click();
  }

  async plusItemButtonClick() {
    await this.plusItemButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.plusItemButton.click();
  }

  async addManualItemTabClick() {
    await this.plusItemButtonClick();
    await this.addManualItemTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.addManualItemTab.click();
    await this.enterItemNameTextBox.fill('Cement Bags (OPC 53 Grade)');
    await this.enterSKUName.fill('CEM-OPC-53');
    await this.enterVeriationValue.fill('Grade: 53, Brand: UltraTech');
    await this.selectMaterialType.click();
    await this.selectMaterialType.click();
    await this.selectMaterialType.press('Enter');

    await this.enterCostItem.fill('bathroom replacement');
    await this.enterCostItem.press('Enter');

    await this.unitCostValue.fill('10');

    await this.selectUnitType.click();
    const input = this.page.locator('.ant-select-open input.ant-select-selection-search-input');
    await input.fill('Bag');
    await input.press('Enter');
    const quantityInput = this.page.locator('#quantity');
    await quantityInput.fill('5');

    const textareas = this.page.locator('textarea');
    await textareas.nth(0).fill('This is a test description');
    await textareas.nth(1).fill('This is internal notes');

    await this.uploadMaterialImage();
    await this.addmanualItemButton.click();

    console.log('file addes successfull........');
  }



  async pasteFromClipboard() {
    await this.addToEstimateSinDroupdown.click();
    await this.pastefromClipboardPage.click();

    await this.itemDescriptionTextarea.fill(
      'Item,Description,Qty,Rate\nCement Work,High quality cement,10,50\nSteel Rods,TMT steel rods,5,120'
    );
    await this.nextButton.click();
    const modal = this.page.getByRole('dialog', { name: 'Paste Items from Clipboard' });
    await modal.waitFor({ state: 'visible', timeout: 10000 });
    const selectField = modal.locator('.ag-header-cell-comp-wrapper >> text=Select Field').first();
    await selectField.click();
    await this.page.locator('ul li', { hasText: 'Item Name' }).click();

    const selectField2 = modal.locator('.ag-header-cell-comp-wrapper >> text=Description').first();
    await selectField2.click();

    // 👇 only visible dropdown
    const itemType = this.page.locator('.ant-popover:visible li').filter({ hasText: 'Item Type' }).first();
    await itemType.waitFor({ state: 'visible' });
    await itemType.scrollIntoViewIfNeeded();
    await itemType.click();
    await this.addItemButton.click();
  }

  async uploadCSVFile() {
    await this.addToEstimateSinDroupdown.click();
    await this.importCSVOption.click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles('D:\\Automation\\CreateLead\\testdata\\MaterialItems.csv');
    await this.importButton.click();
    await this.page.keyboard.press('Enter');
  }

  async ImportItemsfromCsvFilePageOpen() {
    await this.ImportItemsfromCsvFilePage.click();
  }

  async importFromEstimateTemplate() {
    await this.addToEstimateSinDroupdown.click();
    await this.importFromTemplateOption.waitFor({ state: 'visible' });
    await this.importFromTemplateOption.click();
    await this.addItemButton.click();
    const modal = this.page.locator('[role="dialog"]');
    await modal.getByRole('button', { name: 'Yes' }).click();
  }

  async addSectionDescription() {
    await this.sectionName.fill('Test Section');
    await this.sectionDescription.fill('This is test section description');
    await this.addButton.click();
  }

  async addNewSection() {
    await this.addToEstimateSinDroupdown.click();
    await this.addMenuItemPage.click();

  }

  async addItemDetails() {
    await this.itemPage.click();
  }
  async enterTermsInclusionsExclusions() {
    this.termPage.click();
    const editors = this.page.locator('.fr-element'); // 3 editors
    await editors.nth(0).click();
    await this.page.keyboard.type('This is Terms content', { delay: 20 });
    await editors.nth(1).click();
    await this.page.keyboard.type('This is Inclusions content', { delay: 20 });
    await editors.nth(2).click();
    await this.page.keyboard.type('This is Exclusions content', { delay: 20 });
  }

  async selectAddress() {
    await this.addressDroupdown.click();
    await this.selectProjectAddress.click();
    await this.addressListitem.first().hover();
    await this.pencilIconOfAddress.click();
    await this.addressline1.fill('Nana varchha');
    const suggestion = this.page.locator('.pac-item').first();
    await suggestion.waitFor({ state: 'visible', timeout: 5000 });
    await suggestion.click();
  }

  async selectInvoicedTo() {
    await this.invoicedToButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.invoicedToButton.click();
    await this.page.waitForTimeout(500);

    await this.selectVendor.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectVendor.click();
    await this.page.waitForTimeout(500);

    await this.vendorSerchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.vendorSerchBox.click();
    await this.vendorSerchBox.fill('rakesh');

    await this.page.waitForFunction(() => {
      const skeletons = document.querySelectorAll('.animate-pulse, [class*="skeleton"], [class*="shimmer"]');
      return skeletons.length === 0;
    }, { timeout: 15000 }).catch(() => { });

    const vendorResult = this.page.getByText("Rakesh Raval (Rakesh and son's company)").nth(0);
    await vendorResult.waitFor({ state: 'visible', timeout: 20000 });
    await vendorResult.click();
    await this.page.waitForTimeout(500);
  }

  async getTotals() {
    await this.page.waitForSelector('[col-id="total"]');
    const values = await this.page.locator('[col-id="total"]').allTextContents();
    return values.map(v =>
      parseFloat(v.replace(/[^0-9.-]+/g, '')) || 0
    );
  }

  async clickYesAndValidate() {
    await this.clickYesButton.click();
    await this.page.waitForTimeout(1000); // wait for filter apply
    const totals = await this.getTotals();
    console.log('YES Totals:', totals);
    for (const val of totals) {
      if (val !== 0) {
        throw new Error(`YES selected but found non-zero value: ${val}`);
      }
    }
    console.log('YES working correctly');
  }


  async clickNoAndValidate() {
    await this.clickNoButton.click();
    await this.page.waitForTimeout(1000);
    const totals = await this.getTotals();
    console.log('NO Totals:', totals);
    const hasNonZero = totals.some(v => v !== 0);
    if (!hasNonZero) {
      throw new Error('NO selected but all values are 0');
    }
    console.log('NO working correctly');
  }

  async selectProjectType() {
    await this.page.locator('.ant-select-selector', { hasText: 'Select Type' }).click();
    const input = this.page.locator('input.ant-select-selection-search-input[aria-expanded="true"]');
    await input.waitFor({ state: 'visible' });
    await input.fill('Residential');
    await this.page.locator('.ant-select-item-option', { hasText: 'Residential' }).click();
  }

  async selectContact() {
    const dropdown = this.page.locator('.ant-select-selector', { has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Select Contact' }) });
    await dropdown.click();
    await dropdown.press('ArrowDown');
    await dropdown.press('Enter');
  }

  async selectSector() {
    const dropdown = this.page.locator('.ant-select-selector', { has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Select Sector' }) });
    await dropdown.click();
    await dropdown.press('ArrowDown');
    await dropdown.press('Enter');
  }

  async selectTermValue() {
    await this.detailMenuPage.click();
    const dropdown = this.page.locator('.ant-select-selector').filter({ hasText: 'Select a Term' });
    await dropdown.click();
    const option = this.page.locator('.ant-select-item-option').filter({ hasText: '30' }).first();
    await option.click();
  }

  async openastimateAndEnterDetails() {
    const row = this.page.locator('.ag-row').filter({ hasText: 'This is a testing title' }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.click();
  }

  async openEstimatePage() {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    await this.menuDashboard.waitFor({ state: 'visible', timeout: 30000 });
    await this.menuDashboard.click();
    await this.estimatesMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.estimatesMenu.click();
  }

  async selectCustomer(name) {
    await this.searchCustomer.fill('');
    await this.searchCustomer.fill(name);
    await this.page.waitForTimeout(1500);
    const resultRow = this.page.locator('li').filter({ hasText: "Bhavik Raval (Bhavik and son's company)" }).first();
    const resultRow2 = this.page.locator('[class*="cursor-pointer"]').filter({ hasText: "Bhavik Raval (Bhavik and son's company)" }).first();
    const resultRowDiv = this.page.locator('div[tabindex]').filter({ hasText: "Bhavik Raval (Bhavik and son's company)" }).first();

    // Try each locator strategy
    if (await resultRow.count() > 0) {
      await resultRow.click();
    } else if (await resultRow2.count() > 0) {
      await resultRow2.click();
    } else {
      // Fallback: click by exact text match on the name span/div
      await resultRowDiv.click();
    }
    await this.page.waitForTimeout(500);
  }

  async createEstimate() {
    await this.newEstimateBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.newEstimateBtn.click();
    await this.titleInput.waitFor({ state: 'visible' });
    await this.titleInput.fill('This is a testing title');
    await this.customerBtn.click();
    await this.searchCustomer.waitFor({ state: 'visible' });
    await this.selectCustomer('Bhavik Raval');
    await this.createEstimateBtn.waitFor({ state: 'visible' });
    await this.createEstimateBtn.click();
  }

  async verifyEstimateCreated() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = EstimatePage;