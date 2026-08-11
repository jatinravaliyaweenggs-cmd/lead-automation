const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');


class EstimatePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.menuDashboard = page.getByRole('button', { name: 'Menu Dashboard' });
    this.estimatesMenu = page.getByRole('link', { name: 'Estimates-plu' });
    this.newEstimateBtn = page.getByRole('button', { name: 'Estimate-sin' });

    this.titleInput = page.getByRole('textbox', { name: 'Short title for the Estimate-' });
    this.customerBtn = page.getByRole('button', { name: 'Click to select a Customer' });
    this.searchCustomer = page.getByRole('searchbox', { name: 'Search for Customer' });
    this.createEstimateBtn = page.getByRole('button', { name: 'Create Estimate-sin1' });
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
    this.addToEstimateSinDroupdown = page.locator('button:has-text("Add Item to Estimate-sin1")');
    this.addMenuItemPage = page.getByRole('menuitem', { name: 'Add New Section' });
    this.sectionName = page.locator('#section_name');
    this.sectionDescription = page.locator('#description');
    this.addButton = page.locator('button[type="submit"]');
    this.importFromTemplateOption = page.getByRole('menuitem', { name: 'Import from Estimate-sin1 or Template' });
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
    this.mainThreeDotButtons = page.locator('button:has(svg[data-icon="ellipsis-vertical"])');
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.entermarkupValue = page.locator('input[name="161"]');
    this.markupradioButton = page.getByText('Apply to all Items (with or without an existing MU)');

    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.copyButton = page.locator('button:has(svg[data-icon="copy"])');

    this.deleteButton = page.locator('button:has(svg[data-icon="trash-can"])');
    this.viewButton = page.locator('button:has(svg[data-icon="eye"])');

    this.addProductImage = page.locator('div:has-text("Add Product Image")');
    this.expandIcon = page.locator('.ant-collapse-expand-icon');

    this.SaveandCloseButton = page.getByRole('button', { name: 'Save & Close' });
    this.hideAndmarkUp = page.locator('[data-icon="eye-slash"]');
    this.personDaddingiCon = page.locator('button:has(svg[data-icon="person-digging"])');

    this.remainderEmail = page.getByPlaceholder('# of Days Before Bidding Deadline');
    this.scopeofWorks = page.getByPlaceholder('Describe the scope of work for this bid');
    this.applyandRemoveButton = page.locator('button:has(svg[data-icon="money-bill-transfer"])');

    this.removeTaxRadio = page.getByLabel('Remove Tax from all selected Items');
    this.applyTaxRadio = page.getByLabel('Collect Tax from all selected Items');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    this.itemCheckBoxInBid = page.locator('.ag-header-cell-comp-wrapper input[type="checkbox"]');

    this.makeOptionalButton = page.locator('button:has(svg[data-icon="clipboard-check"])').first();

    this.makeAllOptionalItemUnselected = page.getByLabel('Make all selected items optional and mark them as unselected.');
    this.makeAllOptionalItemSelected = page.getByLabel('Make all selected items optional and mark them as selected.');
    this.MakeAllItemsNotOptional = page.getByLabel('Make all items not optional.');

    this.applyBulkMarkup = page.locator('button:has(svg[data-icon="tags"])');

    this.markupWithorWithoutExistingItem = page.locator('input[name="increase_all"]');
    this.noMarkup = page.locator('input[name="increase_no_markup"]');

    this.increaseUptoMaximum = page.locator('input[name="increase_conditional"]');
    this.increaseConditionalMax = page.locator('input[name="increase_conditional_max"]');
    this.increaseMarkup = page.locator('input[name="increase_markup_by"]');

    this.ReduceMarkup = this.page.locator('input[name="decrease_conditional"]');
    this.decreaseConditionalMin = page.locator('input[name="decrease_conditional_min"]');
    this.reduceAllmarkup = page.locator('input[name="decrease_all"]');

    this.resetmarkupZero = this.page.locator('input[name="markup_option"][value="reset"]');

    this.updateWithRange = page.locator('input[name="update_with_range"]');
    this.updatewithrangeMarkupLimit = page.locator('input[name="update_with_range_markup_limit"]');
    this.customerEstimateNumber = page.locator('#custom_estimate_id');

    this.CreateProjectOpportunityLater = page.getByRole('Button', { name: 'Create Project/Opportunity Later' });

    this.scopeofWorksPage = page.locator('button:has-text("Scope of Work")');
    this.scopeofWorksEditor = page.locator('div.fr-element[contenteditable="true"]');
    this.scopeofWorkTextarea = page.locator('textarea[placeholder="Add Scope of Work (max 2000 characters)."]').last();

    this.uploadFilePage = page.locator('button:has-text("Files")');

    this.coverSheetPage = page.getByRole('button', { name: 'Cover Sheet' });
    this.generateFromUploadButton = page.getByRole('button', { name: 'Generate from Upload' });
    this.previewCropButton = page.getByRole('button', { name: 'Preview Crop' });

    this.notesPage = page.getByRole('button', { name: 'Notes' });
    this.noteButton = this.page.locator('div.ml-auto button:has-text("Note")');

    this.noteTitleInput = page.getByPlaceholder('Enter a title for this note');
    this.noteDescriptionInput = page.getByPlaceholder('Write short description of note or observation here');

    this.searchInput = page.locator('input[placeholder="Search for Estimates-plu123"]');
    this.filterBtn = page.locator('button:has(svg[data-icon="filter"])');
    this.projecTypeFilter = page.locator('div[name="estimate_project_type"]');

    this.createDateRange = page.locator('[name="created_date_range"]');
    this.thisMonthDateFilterButton = page.locator('.ant-picker-presets').locator('div:has-text("This Month")');

    this.logoImg = this.page.locator('img[src*="logo.svg"]');

    this.selectProjectInEstimate = this.page.getByRole('button', { name: 'Click to select a Project/Opportunity-S' });
    this.searchBarSelectaProject = this.page.locator('input[placeholder="Search Project/Opportunity-S"]')

    this.moduleSettings = page.locator('#moduleSettings');
    this.autoUpdateEstimateNumber = page.getByText('Auto/Custom');
    this.CreateProjectBtn = page.getByRole('button', { name: 'Create Project' });

    this.projectTypeDropdown = page.locator('div.ant-select[name="project_type"]');

  }


  async noRecordFilterSerchForCustomerAndLead(){
        await this.estimatePageOpenAfterCreate();
    await this.estimatesMenu.click();
    await this.newEstimateBtn.click();
    await this.clickProjectOpportunitysTextbox();
    await this.projectPlusButtonClick();
    await this.clickSelectCreateCustomerOrLead();
    await this.searchCustomer.click();
    await this.searchCustomer.fill('This is a not available text');
    await this.verifyNoRecordsAvailable();


  }

  async EstimaterCreateUsingNewProject() {
    //await this.newEstimateBtn.click();
    //await this.clickProjectOpportunitysTextbox();


    await this.projectNameInputFill();
    await this.projectTypeDropdown.click();
    await this.page.keyboard.type('Residential');
    await this.page.keyboard.press('Enter');

    const duplicateNameAlert = this.page.locator('.ant-notification-notice-description');
    await expect(duplicateNameAlert).toBeVisible({ timeout: 5000 });
    await expect(duplicateNameAlert).toHaveText('This name already exists. Please use a different name.');

    const randomProjectType = `PType ${Date.now()}`;

    await this.page.keyboard.type(randomProjectType);
    await this.page.keyboard.press('Enter');
    await this.yesBtn.click();

    // const selectCreateCustomerOrLead = this.page.getByRole('button', {
    //   name: 'Select/Create Customer or Lead',
    //   exact: true
    // });

    // await selectCreateCustomerOrLead.click();
    await this.clickSelectCreateCustomerOrLead();

    await this.searchCustomer.fill('Bhavik Raval');
    await this.selectCustomer('Bhavik Raval');

    await this.projectTypeDropdown.click();
    await this.page.keyboard.type('Residential');
    await this.page.keyboard.press('Enter');


    const CreateProjectBtn = this.page.getByRole('button', { name: 'Create Project', exact: true });
    await CreateProjectBtn.click();
    await this.titleInput.fill('This is a testing title');
    await this.randomEstimateNumbergenerate();
    await this.createEstimateBtn.nth(0).click();

  // Open global project selector
  // const globalProjectButton = this.page.locator('#global_select_project');
  // await globalProjectButton.click();
  // const projectSearch = this.page.getByPlaceholder('Search Projects');
  // await projectSearch.fill(randomProjectNumber);
  // const createdProject = this.page.locator('a.project').filter({hasText: randomProjectNumber});
  // await expect(createdProject).toBeVisible({timeout: 10000});
  // await expect(createdProject).toContainText(randomProjectNumber);
  }



  async userCreateNewProjectForEstimate() {
    await this.estimatePageOpenAfterCreate();
    await this.estimatesMenu.click();
    await this.newEstimateBtn.click();
    await this.clickProjectOpportunitysTextbox();
    await this.projectPlusButtonClick();
    await this.randomProjectNumbergenerate();
  }

  async selectProjectOpportunityS(projectName = 'Residential Villa – Electrical & Plumbing') {
    await this.selectProjectOpportunity(projectName, 'input[placeholder="Search Project/Opportunity-S"]');
  }

  async createEstimateUsingExistingProject() {
    await this.newEstimateBtn.click();
    await this.clickProjectOpportunitysTextbox();
    await this.selectProjectOpportunityS();
    await this.titleInput.fill('This is a testing title');
    await this.randomEstimateNumbergenerate();
    await this.createEstimateBtn.nth(0).click();
  }


  async customizedStartingNumber() {
    await this.moduleSettings.click();
    await this.moduleSettings.click();

    await this.page.waitForSelector('label:has-text("Auto/Custom")', { state: 'visible' });

    await this.page.locator('label:has-text("Auto/Custom")').click({ force: true });
    await this.saveButton.click();
    await this.page.locator('button.close-icon').nth(1).click();
  }


  async searchProject() {
    await this.searchInput.fill('This is a testing title');
    const row = this.page.locator('.ag-center-cols-container .ag-row').filter({ hasText: 'This is a testing title' }).first();
    await expect(row).toBeVisible();
    await this.filterBtn.click();
    const CustomerSearchBox = this.page.locator('li:nth-child(2) > .w-full.md\\:min-w-\\[300px\\] > .common-filter > .flex.items-center.justify-between');
    await CustomerSearchBox.click();
    await this.selectCustomer('Bhavik Raval');
    await this.saveButton.click();
    await this.projecTypeFilter.click();
    await this.projecTypeFilter.type('Residential');
    await this.page.locator('.ant-select-item-option', { hasText: 'Residential' }).click();
    await this.projecTypeFilter.press('Escape');

    await this.page.locator('div[name="approval_type"]').click();
    await this.page.locator('.ant-select-item-option[title="Estimating-ss"]').click();

    await this.projecTypeFilter.press('Escape')
    await this.createDateRange.last().click();
    await this.thisMonthDateFilterButton.click();

    // Visible overlay div par click karo (actual clickable layer)
    await this.page.locator('.z-10.w-full.top-0.h-7.absolute').nth(1).click();
    await this.thisMonthDateFilterButton.nth(1).click();

    await this.applyButton.click();
    // await expect(row).toBeVisible();


  }



  async verifyRequiredFieldErrors() {
    await this.estimatePageOpenAfterCreate();
    await this.newEstimateBtn.click();
    const titleError = this.page.locator('label:has-text("Title")').locator('..')
      .locator('span:has-text("This field is required.")');

    const customerError = this.page.locator('label:has-text("Customer")').locator('..')
      .locator('span:has-text("This field is required.")');

    const estimateError = this.page.locator('label:has-text("EST.")').locator('..')
      .locator('span:has-text("This field is required.")');

    await this.createEstimateBtn.click();

    // 🔹 Assertions
    await Promise.all([
      expect(titleError).toBeVisible(),
      expect(customerError).toBeVisible(),
      expect(estimateError).toBeVisible()
    ]);

    console.log('Testcases 3: Verify mandatory field at estimate time');
  }

  async createEstimate() {
    await this.newEstimateBtn.click();
    await this.titleInput.fill('This is a testing title');
    await this.customerBtn.click();
    await this.searchCustomer.fill('Bhavik Raval');
    await this.selectCustomer('Bhavik Raval');

    await this.selectProjectInEstimate.click();
    await this.page.locator('.ant-drawer, .ant-select-dropdown').nth(0).waitFor();
    const projectName = 'Residential Villa – Electrical & Plumbing';
    const project = this.page.locator('.project').filter({ hasText: projectName }).first();
    await project.click();
    console.log('Testcase 2: customers accociate project selected');

    const uniqueNum = `Est#${Date.now().toString().slice(-6)}`;
    await this.customerEstimateNumber.fill(uniqueNum);
    await this.createEstimateBtn.click();

    console.log('Testcase 1: Estimate Created Successfully!!!!!!!!!!!!!!!');
  }

  async estimateCopyButton() {
    await this.page.locator('button.ant-dropdown-trigger:has(svg[data-icon="ellipsis-vertical"])').last().click();
    await this.page.locator('text=Make a Copy').click();
  }

  async addNote() {
    await this.notesEnterInEstimate();
    await this.noteButton.waitFor({ state: 'visible' });
    await this.noteButton.click();
    await this.noteTitleInput.fill('Test Note Title');
    await this.noteDescriptionInput.fill('This is a estimate note');
    await this.saveButton.click();
  }

  async notesEnterInEstimate() {
    await this.notesPage.click();
  }

  async selectCoverSheet() {
    const dropdown = this.page.locator('[name="cover_sheet_template_id"]');
    await dropdown.locator('.ant-select-selector').click();
    const option = this.page.locator('.ant-select-dropdown .ant-select-item-option[title="Cover Sheet"]');
    await option.click();
    await this.generateFromUploadButton.click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles('D:\\Automation\\CreateLead\\testdata\\plumber.jpg');

    await this.previewCropButton.first().click();
    await this.saveButton.click();


  }

  async openCoversheetPage() {
    await this.coverSheetPage.click();
    await this.page.getByRole('switch').click();
    await this.selectCoverSheet();
  }

  async click3dotButtonOfUploadFile() {
    const fileCard = this.page.locator('div.group\\/upload-file').filter({ hasText: 'MaterialItems_' }).first();
    await fileCard.scrollIntoViewIfNeeded();
    const threeDotBtn = fileCard.locator('button:has(svg[data-icon="ellipsis-vertical"])');
    await threeDotBtn.click({ force: true });
  }

  async downloadUploadFile() {
    this.click3dotButtonOfUploadFile();
    const downloadBtn = this.page.locator('ul[role="menu"] >> text=Download');
    await expect(downloadBtn).toBeVisible();
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      downloadBtn.click()
    ]);

    const filePath = await download.path();
    console.log('Downloaded file:', filePath);
  }

  async viewandMarkupForUploadFile() {
    this.click3dotButtonOfUploadFile();
    const viewAndMarkupBtn = this.page.getByRole('menuitem', { name: 'View & Markup' });
    await expect(viewAndMarkupBtn).toBeVisible();
    await viewAndMarkupBtn.click();
    const title = this.page.locator('h5:has-text("View and Markup")');
    await expect(title).toBeVisible();
    await this.page.keyboard.press('Escape');

  }



  async enterNoteInUploadFile() {
    this.click3dotButtonOfUploadFile();
    const notesBtn = this.page.getByRole('menuitem', { name: 'Notes' });
    await expect(notesBtn).toBeVisible();
    await notesBtn.click();
    const notesInput = this.page.locator('textarea[name="Notes"]');
    await expect(notesInput).toBeVisible();
    await notesInput.fill('This is my test note');
    await this.saveButton.click();

  }


  async deleteButtonOfUploadFile() {
    this.click3dotButtonOfUploadFile();
    const deleteBtn = this.page.getByRole('menuitem', { name: 'Delete' });
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();


  }

  async uploadFileInEstimate() {
    await this.uploadFilePage.click();
    await this.page.locator('.App div.cursor-pointer:has(svg[data-icon="plus"])').click();
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles('D:\\Automation\\CreateLead\\testdata\\MaterialItems.csv');
    await expect(this.page.locator('text=MaterialItems.csv')).toBeVisible();
    await this.attachButton.click();
    await this.downloadUploadFile();
    await this.viewandMarkupForUploadFile();
    await this.enterNoteInUploadFile();
    await this.deleteButtonOfUploadFile();



  }

  async enterScopeOfDetail() {
    await expect(this.scopeofWorksPage).toBeVisible();
    await this.scopeofWorksPage.click();
    await expect(this.page.getByText('Scope of Work (Checked items show on PDF)')).toBeVisible();
    await expect(this.scopeofWorksEditor).toBeVisible();
    await this.scopeofWorksEditor.click();
    await this.scopeofWorksEditor.clear();
    await this.page.keyboard.type('This is a scope of work');

    // Find the empty textarea (last one without any value) and fill it
    const allTextareas = this.page.locator('textarea[placeholder="Add Scope of Work (max 2000 characters)."]');
    const count = await allTextareas.count();

    let targetIndex = count - 1; // fallback: last one
    for (let i = count - 1; i >= 0; i--) {
      const value = await allTextareas.nth(i).inputValue();
      if (value.trim() === '') {
        targetIndex = i;
        break;
      }
    }

    const targetTextarea = allTextareas.nth(targetIndex);
    await targetTextarea.scrollIntoViewIfNeeded();
    await targetTextarea.click();
    await targetTextarea.fill('This is the additional scope of work text.');
    await targetTextarea.press('Enter');

    // Check the checkbox in the same row as this textarea
    // Walk up to nearest ancestor that also contains a checkbox
    const rowContainer = targetTextarea.locator('xpath=ancestor::div[.//input[@type="checkbox"]][1]');
    const checkbox = rowContainer.locator('input[type="checkbox"]').first();
    await checkbox.waitFor({ state: 'attached', timeout: 5000 });
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
    }

    // Locate textarea which already has the value
    const existingTextarea = this.page.locator(
      'textarea[placeholder="Add Scope of Work (max 2000 characters)."]'
    ).filter({ hasText: 'This is the additional scope of work text.' });

    await existingTextarea.click();
    await existingTextarea.press('Control+A');   // Mac → Meta+A
    await existingTextarea.press('Backspace');
    await this.page.keyboard.type('This is UPDATED additional scope of work text.');
    await targetTextarea.press('Enter');
  }



  async swapTabsByDrag() {

    // 🔹 Source (Material)
    const source = this.page.locator('.ant-collapse-item')
      .filter({ hasText: 'Material' })
      .locator('button.cursor-move')
      .first();   // ✅ FIX

    // 🔹 Target (Copy of Material)
    const target = this.page.locator('.ant-collapse-item')
      .filter({ hasText: 'Copy of Material' })
      .locator('button.cursor-move')
      .first();   // ✅ FIX

    await source.waitFor({ state: 'visible' });
    await target.waitFor({ state: 'visible' });

    await this.page.waitForTimeout(500);

    // 🔥 Drag & Drop
    await source.dragTo(target);

    console.log('Swapped Material with Copy of Material');
  }

  async copyitems() {
    await this.itemCheckBoxInBid.first().check();
    await this.copyButton.click();
    const itemNameCells = this.page.locator('.ag-center-cols-container .ag-row .ag-cell[col-id="item_name"]');
  }


  async UpdateTheMarkupOfSelectedItemsFrom() {
    await this.openApplyBulkMarkupPopup();
    await this.updateWithRange.fill('0');
    await this.updatewithrangeMarkupLimit.fill('55');
    await this.applyButton.click();
    const muColumnCells = this.page.locator('.ag-center-cols-container .ag-row .ag-cell[col-id="markup"]');
    await expect(muColumnCells).toHaveText(Array(await muColumnCells.count()).fill('55'));

  }

  async resetTheMarkupForSelectedItemsToZero() {
    await this.openApplyBulkMarkupPopup();
    await this.resetmarkupZero.click()
    await this.applyButton.click();

    const muColumnCells = this.page.locator('.ag-center-cols-container .ag-row .ag-cell[col-id="markup"]');
    await expect(muColumnCells).toHaveText(Array(await muColumnCells.count()).fill('0'));
  }



  async reduceTheMarkupofSelectedItemsBy() {
    await this.openApplyBulkMarkupPopup();
    await this.reduceAllmarkup.fill('5');
    await this.applyButton.click();

  }

  async reduceTheMarkupOfSelectedItemsBy() {
    await this.openApplyBulkMarkupPopup();
    await this.ReduceMarkup.fill('10');
    await this.decreaseConditionalMin.fill('7');
    await this.applyButton.click();

  }

  async increaseMarkupBy() {
    await this.openApplyBulkMarkupPopup();
    await this.increaseMarkup.click();
    await this.increaseMarkup.fill('10');
    await this.applyButton.click();
  }

  async openApplyBulkMarkupPopup() {
    await this.itemCheckBoxInBid.first().check();
    await this.applyBulkMarkup.click();
  }

  async openApplyBulkMarkupPopupMinMax() {
    await this.openApplyBulkMarkupPopup();
    await this.increaseUptoMaximum.click();
    await this.increaseUptoMaximum.fill('10');
    await this.increaseConditionalMax.click();
    await this.increaseConditionalMax.fill('20');
    await this.applyButton.click();
  }

  async applyBulkMarkUpToSelectedItem() {
    await this.openApplyBulkMarkupPopup();
    await this.markupWithorWithoutExistingItem.click();
    await this.markupWithorWithoutExistingItem.fill('10');
    await this.applyButton.click();
    const muColumnCells = this.page.locator('.ag-center-cols-container .ag-row .ag-cell[col-id="markup"]');
    await expect(muColumnCells.nth(0)).toHaveText('10');
    const count = await muColumnCells.count();
    for (let i = 0; i < count; i++) {
      await expect(muColumnCells.nth(i)).toHaveText('10');
    }

  }

  async applyBulkMarkUpToSelectedItemWithNoMarkup() {
    await this.openApplyBulkMarkupPopup();
    await this.noMarkup.fill('10');
    await this.applyButton.click();
  }







  async makeItemOptional() {
    //await this.expandIcon.first().click();
    await this.itemCheckBoxInBid.first().check();
    await this.makeOptionalButton.click();
    await this.makeAllOptionalItemUnselected.check();
    await this.saveButton.click();
    await expect(this.page.locator('text=AED0.00').first()).toBeVisible();

    await this.makeOptionalButton.click();
    await this.makeAllOptionalItemSelected.check();
    await this.saveButton.click();
    await expect(this.page.locator('.optional-button-icon').first()).toBeVisible();

    await this.makeOptionalButton.click();
    await this.MakeAllItemsNotOptional.click();
    await this.saveButton.click();
    await expect(this.page.locator('.optional-button-icon').first()).not.toBeVisible();


  }







  async applyTax() {
    //await this.expandIcon.first().click();
    await this.applyandRemoveButton.click();
    await this.applyTaxRadio.check();
    await expect(this.applyTaxRadio).toBeChecked();
    await this.saveButton.click();

    const checkboxes = this.page.locator('input[name="apply_global_tax"]');
    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).toBeChecked();  // ✅ FIX HERE
    }

  }

  async removeTax() {
    await this.expandIcon.first().click();
    const headerCheckbox = this.page.locator('.ag-header-cell-comp-wrapper input[type="checkbox"]');
    await headerCheckbox.first().check();
    await this.applyandRemoveButton.click();
    await this.removeTaxRadio.check();
    await expect(this.removeTaxRadio).toBeChecked();
    await this.saveButton.click();

    const checkboxes = this.page.locator('input[name="apply_global_tax"]');
    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked();  // ✅ FIX HERE
    }
  }


  async addBidders() {
    await this.page.getByRole('button', { name: 'Bidders' }).click();
    await this.page.getByRole('button', { name: 'Add Bidder' }).click();


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
    await this.saveButton.click();
    await this.addButton.click();
  }

  async createBidPackage() {
    await this.expandIcon.first().click();
    await this.itemCheckBoxInBid.first().check();  // best practice
    await this.personDaddingiCon.click();
    await this.remainderEmail.fill('5');
    await this.scopeofWorks.fill('This is a scope of work');
    await this.selectDateFromCalendar();
    await this.addButton.click();


  }






  async uploadFileinBid() {
    // await this.expandIcon.first().click();
    // await this.itemCheckBoxInBid.first().check(); 
    // await this.personDaddingiCon.click();

    await this.page.locator('button:has-text("Files")').nth(1).click();

    await this.page.locator('.App div.cursor-pointer:has(svg[data-icon="plus"])').click();

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles('D:\\Automation\\CreateLead\\testdata\\MaterialItems.csv');

    await this.attachButton.click();

    await this.addBidders();
  }


  async termsValueEnterInBidPackage() {
    await this.itemCheckBoxInBid.first().check();
    await this.personDaddingiCon.click();
    await this.page.locator('button:has-text("Terms")').nth(1).click();

    await this.page.locator('.fr-element[contenteditable="true"]').nth(0).click();
    await this.page.keyboard.type('This is a Term text');

    await this.page.locator('.fr-element[contenteditable="true"]').nth(1).click();
    await this.page.keyboard.type('This is a Inclusions text');

    await this.page.locator('.fr-element[contenteditable="true"]').nth(2).click();
    await this.page.keyboard.type('This is a Exclusions text');

    await this.page.locator('.fr-element[contenteditable="true"]').nth(3).click();
    await this.page.keyboard.type('This is a Clarification text');


  }




  async selectDateFromCalendar() {
    const input = this.page.locator('input[name="deadline_date"]');
    await input.click();
    await this.page.locator('.ant-picker-header-view').click();
    await this.page.locator('.ant-picker-year-panel').getByText('2026').click();
    await this.page.locator('.ant-picker-month-panel').getByText('Jul').click();
    await this.page.locator('.ant-picker-cell-inner', { hasText: '31' }).click();
  }

  async hideandmarkupCheck() {
    await this.hideAndmarkUp.click();
    await this.page.waitForSelector('[col-id="markup"]', { timeout: 10000 });
    const muHeader = this.page.locator('[col-id="markup"] .font-semibold');
    await expect(muHeader).toHaveText('MU%');
  }

  async updateItemDetails() {
    await this.expandIcon.first().click();
    await this.viewButton.first().click();
    const drawer = this.page.getByRole('dialog');
    await drawer.getByText('Add Product Image').click();
    await this.page.locator('input[type="file"]').nth(1).setInputFiles('D:\\Automation\\CreateLead\\testdata\\plumber.jpg');
    await this.attachButton.click();
    await this.SaveandCloseButton.click();
    await this.deleteItem();
  }

  async deleteItem() {
    await this.deleteButton.first().click();
    const modal = this.page.locator('[role="dialog"]');
    await modal.getByRole('button', { name: 'Yes' }).click();
  }



  async applyBulkMarkUp() {
    await this.threeDotButtons.click();
    await this.page.getByRole('menuitem', { name: 'Apply Automatic/Bulk Markup' }).click();
    await this.entermarkupValue.fill('20');
    await this.markupradioButton.click();
    await this.applyButton.click();
    await this.threeDotButtons.click();
    await this.copyButton.click();
    await this.copyButton.press('Enter');
    await this.threeDotButtons.click();
    await this.deleteButton.click();
    await this.deleteButton.press('Enter');

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

  async subcontractorAddFromSubcontractorPage() {
    await this.plusItemButtonClick();
    await this.subcontractorPageMenu.click();
    await this.subcontractorSerchbar.first().click();
    await this.subcontractorSerchbar.first().fill('Surveying equipment');
    await this.page.locator('.project:has-text("Surveying equipment")').click();
    await this.addItemButton.click();
  }

  async equipmentAddFromLaborPage() {
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
    // If already inside an estimate detail page, no need to navigate again
    if (this.page.url().includes('/manage-estimates/')) {
      return;
    }
    // Wait for the app to fully load after login
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { });
    await this.menuDashboard.waitFor({ state: 'visible', timeout: 45000 });
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



}

module.exports = EstimatePage;