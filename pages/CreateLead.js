// Page Object Model - Create Lead Page

class CreateLeadPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Form field locators
    this.companyNameInput = page.getByPlaceholder('Company name');
    this.firstNameInput   = page.getByPlaceholder('Lead contact first name');
    this.lastNameInput    = page.getByPlaceholder('Lead contact last name');

    // Phone field locators
    this.phoneInput       = page.getByPlaceholder('Primary phone number');
    this.phoneExt1Input   = page.locator('input[name="phone_ext"]').first();
    this.phone2Input      = page.getByPlaceholder('Secondary phone number');
    this.phoneExt2Input   = page.locator('input[name="phone_ext2"]');

    // Stage dropdown — located via its placeholder text, stable against runtime ID changes
    this.stageDropdown    = page
      .locator('.ant-select-selector', {
        has: page.locator('.ant-select-selection-placeholder', { hasText: 'select the lead stage' })
      });

    // Mobile and Email locators
    this.cellInput        = page.locator('input[name="cell"]');
    this.emailInput       = page.getByPlaceholder('Email address');

    // Address locators
    this.addressInput      = page.locator('#directory-module-address-overlay');
    this.addressFirstItem  = page.locator('.pac-item').first();

    // Row and detail field locators
    this.firstTableRow     = page.locator('table tbody tr').first();
    this.projectNameInput  = page.getByPlaceholder('Project Name').first();
    this.titleInput        = page.getByPlaceholder('Title').first();
    this.faxInput          = page.locator('input[name="fax"]').first();

    // Gate Code field
    this.gateCodeInput = page.getByPlaceholder('Access/Gate Code');

    // Tags field — type to search, press Enter to select
    this.tagsInput = page.getByPlaceholder('Select Tags');

    // Contact Time dropdown — located via placeholder text, stable against runtime ID changes
    this.contactTimeDropdown = page
      .locator('.ant-select-selector', {
        has: page.locator('.ant-select-selection-placeholder', { hasText: 'Select Contact Time' })
      });

    // Best Time to Call dropdown (rc_select_8) — next dropdown after Contact Time
    this.bestTimeToCallDropdown = page
      .locator('.ant-select-selector', {
        has: page.locator('.ant-select-selection-placeholder', { hasText: 'Select Contact Method' })
      });

    // Submit button
    this.createLeadButton  = page.getByRole('button', { name: 'Create Lead' });
    this.additionalContactButton = page.getByRole('button', { name: 'Additional Contact' });

    // Additional contact form locators
    this.contactFirstNameInput = page.getByPlaceholder('Contact first name (required)');
    this.contactLastNameInput = page.getByPlaceholder('Contact last name (required)');
    this.contactJobTitleInput = page.getByPlaceholder('Enter job title');
    this.contactPrimaryPhoneInput = page.getByPlaceholder('Primary phone number');
    this.contactExtensionInput = page.getByPlaceholder('Extension');
    this.contactMobileInput = page.getByPlaceholder('Mobile/Cell number');
    this.contactEmailInput = page.getByPlaceholder('Work email address');
    this.contactNotesInput = page.getByPlaceholder('Add any additional notes about this contact');
    this.contactSaveButton = page.getByRole('button', { name: 'Save' });
    this.salesPageName = page.getByRole('Button', {name: 'Sales'})
    this.projectType = page.getByText('Select Project Type');

    // Date picker locators
    this.datePickerInput = page.getByRole('textbox', { name: 'Select Date' });
    this.dateTodayButton = page.getByText('Today', { exact: true });

    // Lead value input and save button
    this.leadValueInput = page.getByRole('spinbutton', { name: '0.00' });
    this.saveFloppy = page.locator('.svg-inline--fa.fa-floppy-disk');

    // Referred By field and save button
    this.referredByInput = page.getByRole('textbox', { name: 'Referred By' });
    this.saveFloppyPath = page.locator('.svg-inline--fa.fa-floppy-disk > path').first();

    // Lead Source dropdown (searchable Ant Design select)
    this.leadSourceDropdown = page.locator('.ant-select-selector', {
      has: page.locator('.ant-select-selection-placeholder', { hasText: 'Lead Source' })
    });

    // Copy from Contact Address button and Yes confirmation
    this.copyFromContactAddressButton = page.getByRole('button', { name: 'Copy from Contact Address?' });
    this.confirmYesButton = page.getByRole('button', { name: 'Yes' });

    // Task button and form locators
    this.taskButton          = page.getByRole('button', { name: 'Task', exact: true });
    this.taskSubjectInput    = page.getByRole('textbox', { name: 'Short description of the task' });
    this.taskAddressOverlay  = page.locator('#directory-activity-address-overlay');
    this.taskAddressInput    = page.locator('#directory-activity-address');

    // Files tab locators
    this.filesButton         = page.getByRole('button', { name: 'Files' });
    this.filesDropZone       = page.locator('.top-0.w-full.h-full');
    this.chooseFileButton    = page.getByRole('button', { name: 'Choose File' });
    this.attachButton        = page.getByRole('button', { name: 'Attach' });
  }

  async sleasPageOpen() {
    // Wait for page to fully load after row click (navigation/re-render)
    await this.page.waitForTimeout(2000);
    await this.salesPageName.waitFor({ state: 'visible', timeout: 15000 });
    await this.salesPageName.click();
    // Wait for Sales tab content to render
    await this.page.waitForTimeout(1500);
  }

  /**
   * Enter lead value and click the floppy disk save button
   * @param {string} value - e.g. '15'
   */
  async enterLeadValue(value) {
    await this.leadValueInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.leadValueInput.click();
    await this.leadValueInput.fill(value);
    await this.saveFloppy.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveFloppy.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Enter Referred By value and save
   * @param {string} value - e.g. 'jayaben'
   */
  async enterReferredBy(value) {
    await this.referredByInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.referredByInput.click();
    await this.referredByInput.fill(value);
    await this.saveFloppyPath.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveFloppyPath.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Select Lead Source from searchable Ant Design dropdown
   * Tries multiple locator strategies with scroll fallback
   * @param {string} value - e.g. 'previous customer'
   */
  async selectLeadSource(value) {
    // Wait for page to settle after previous actions
    await this.page.waitForTimeout(1000);

    // Strategy 1: Try locating by placeholder text 'Lead Source'
    let leadSourceSelector = this.page.locator('.ant-select-selector', {
      has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Lead Source' })
    });

    let selectorVisible = await leadSourceSelector.isVisible().catch(() => false);

    // Strategy 2: Try alternate placeholder text variations
    if (!selectorVisible) {
      const alternates = ['Select Lead Source', 'Source', 'lead source'];
      for (const alt of alternates) {
        leadSourceSelector = this.page.locator('.ant-select-selector', {
          has: this.page.locator('.ant-select-selection-placeholder', { hasText: alt })
        });
        selectorVisible = await leadSourceSelector.isVisible().catch(() => false);
        if (selectorVisible) break;
      }
    }

    // Strategy 3: Fallback to input with specific id pattern (last resort)
    if (!selectorVisible) {
      leadSourceSelector = this.page.locator('input[id^="rc_select_"]').last();
    }

    // Scroll into view and click
    await leadSourceSelector.scrollIntoViewIfNeeded();
    await leadSourceSelector.waitFor({ state: 'visible', timeout: 10000 });
    await leadSourceSelector.click();
    await this.page.waitForTimeout(800);

    // Locate input inside selector or page-level active input
    let searchInput = leadSourceSelector.locator('input').first();
    const inputVisible = await searchInput.isVisible().catch(() => false);

    if (!inputVisible) {
      searchInput = this.page.locator('input:focus, input.ant-select-selection-search-input').first();
    }

    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.focus();
    await searchInput.fill('');
    await searchInput.pressSequentially(value, { delay: 120 });
    await this.page.waitForTimeout(800);

    // Click matching option from dropdown
    const option = this.page
      .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-content')
      .filter({ hasText: value })
      .first();

    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Click Copy from Contact Address button and confirm with Yes
   */
  async copyFromContactAddress() {
    await this.copyFromContactAddressButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.copyFromContactAddressButton.click();
    await this.confirmYesButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmYesButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Select today's date from the date picker
   * Click the date input to open the calendar, then click 'Today'
   */
  async selectTodayDate() {
    await this.datePickerInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.datePickerInput.click();
    await this.dateTodayButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.dateTodayButton.click();
    await this.page.waitForTimeout(500);
  }

  async fillupSalesDetails() {    // Locate the Project Type selector by its placeholder text
    const projectTypeSelector = this.page.locator('.ant-select-selector', {
      has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Select Project Type' })
    });

    // Step 1: Click the selector to open dropdown and activate search input
    await projectTypeSelector.waitFor({ state: 'visible', timeout: 10000 });
    await projectTypeSelector.click();

    // Step 2: Locate the search input inside the selector and type value
    const searchInput = projectTypeSelector.locator('input');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.pressSequentially('Residential', { delay: 100 });
    await this.page.waitForTimeout(500);

    // Step 3: Click the matching option from the dropdown
    const option = this.page
      .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-content')
      .filter({ hasText: 'Residential' })
      .first();

    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();

    await this.page.waitForTimeout(500);
  }


  async enterCompanyName(value) {
    await this.companyNameInput.waitFor({ state: 'visible' });
    await this.companyNameInput.fill(value);
  }

  /**
   * Enter first name
   * @param {string} value
   */
  async enterFirstName(value) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(value);
  }

  /**
   * Enter last name
   * @param {string} value
   */
  async enterLastName(value) {
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(value);
  }

  /**
   * Enter primary phone number
   * @param {string} value
   */
  async enterPhone(value) {
    await this.phoneInput.waitFor({ state: 'visible' });
    await this.phoneInput.fill(value);
  }

  /**
   * Enter primary phone extension
   * @param {string} value
   */
  async enterPhoneExt1(value) {
    await this.phoneExt1Input.waitFor({ state: 'visible' });
    await this.phoneExt1Input.fill(value);
  }

  /**
   * Enter secondary phone number
   * @param {string} value
   */
  async enterPhone2(value) {
    await this.phone2Input.waitFor({ state: 'visible' });
    await this.phone2Input.fill(value);
  }

  /**
   * Enter secondary phone extension
   * @param {string} value
   */
  async enterPhoneExt2(value) {
    await this.phoneExt2Input.waitFor({ state: 'visible' });
    await this.phoneExt2Input.click();
      await this.page.waitForTimeout(500);

    await this.phoneExt2Input.fill(value);
      await this.page.waitForTimeout(500);

    // fallback: if fill doesn't work, use type
    const entered = await this.phoneExt2Input.inputValue();
    if (entered !== value) {
      await this.phoneExt2Input.clear();
      await this.phoneExt2Input.type(value);
    }
  }

  /**
   * Select stage from dropdown
   * @param {string} value - e.g. 'Pending'
   */
  async selectStage(value) {
    // Click the Stage selector to open dropdown
    await this.stageDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await this.stageDropdown.click();

    // Wait for dropdown list to become visible, then click exact match
    const option = this.page
      .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-content')
      .filter({ hasText: new RegExp(`^${value}$`) })
      .first();

    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();

    // Confirm selection took effect
    await this.page.waitForTimeout(500);
  }

  /**
   * Enter mobile/cell number
   * @param {string} value
   */
  async enterCell(value) {
    await this.cellInput.waitFor({ state: 'visible' });
    await this.cellInput.fill(value);
  }

  /**
   * Enter email address
   * @param {string} value
   */
  async enterEmail(value) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(value);
  }

  /**
   * Enter address and select first suggestion from Google autocomplete
   * Uses type() instead of fill() to trigger Google Places autocomplete
   * @param {string} value - e.g. 'Raval'
   */
  async enterAddress(value) {
    await this.addressInput.waitFor({ state: 'visible' });
    await this.addressInput.click();
    await this.addressInput.clear();
    await this.addressInput.type(value, { delay: 100 });
    // Wait for Google autocomplete suggestions to appear
    await this.addressFirstItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.addressFirstItem.click();
  }

  /**
   * Click the first row in the table
   */
  async clickFirstTableRow() {
    const rowCandidates = [
      this.page.locator('table tbody tr').first(),
      this.page.locator('.ag-row').first(),
      this.page.locator('tr').filter({ has: this.page.locator('td') }).first()
    ];

    for (const row of rowCandidates) {
      try {
        await row.waitFor({ state: 'visible', timeout: 5000 });
        await row.scrollIntoViewIfNeeded();
        await row.click({ force: true });
        return;
      } catch (err) {
        // Try the next candidate locator
      }
    }

    throw new Error('First table row was not found');
  }

  async clickFirstRow() {
    await this.clickFirstTableRow();
  }

  /**
   * Enter project name in the Project Name field
   * @param {string} value
   */
  async enterProjectName(value) {
    await this.page.waitForTimeout(1000);
    await this.projectNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.projectNameInput.click();
    await this.projectNameInput.fill('');
    await this.projectNameInput.type(value, { delay: 50 });
  }

  /**
   * Enter title in the Title field
   * @param {string} value
   */
  async enterTitle(value) {
    await this.page.waitForTimeout(1000);
    await this.titleInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.titleInput.click();
    await this.titleInput.fill('');
    await this.titleInput.type(value, { delay: 50 });
  }

  async enterFax(value) {
    await this.page.waitForTimeout(1000);
    await this.faxInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.faxInput.click();
    await this.faxInput.fill('');
    await this.faxInput.type(value, { delay: 50 });
  }

  async pressTabKey() {
    await this.page.keyboard.press('Tab');
  }

  async selectFirstOptionFrom(dropdownSelector) {
    await dropdownSelector.waitFor({ state: 'visible', timeout: 10000 });
    await dropdownSelector.click();
    const firstOption = this.page
      .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-content')
      .first();
    await firstOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstOption.click();
    await this.page.waitForTimeout(500);
  }

  async enterGateCode(value) {
    await this.gateCodeInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.gateCodeInput.fill(value);
    await this.page.keyboard.press('Tab');
  }

  async selectTag(tagName) {
    const tagsSelector = this.page.locator('.ant-select-selector', {
      has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Select Tags' })
    });
    await tagsSelector.waitFor({ state: 'visible', timeout: 10000 });
    await tagsSelector.click();
    const tagsSearchInput = tagsSelector.locator('input');
    await tagsSearchInput.waitFor({ state: 'visible', timeout: 10000 });
    await tagsSearchInput.focus();
    await tagsSearchInput.pressSequentially(tagName, { delay: 100 });
    const option = this.page
      .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-content')
      .filter({ hasText: tagName })
      .first();
    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();
    await this.page.waitForTimeout(500);
  }

  async selectFirstContactTime() {
    await this.selectFirstOptionFrom(this.contactTimeDropdown);
  }

  async selectFirstPreferredContactMethod() {
    await this.selectFirstOptionFrom(this.bestTimeToCallDropdown);
  }

  async clickAdditionalContact() {
    await this.additionalContactButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.additionalContactButton.click();
  }

  async enterContactFirstName(value) {
    await this.contactFirstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactFirstNameInput.fill(value);
  }

  async enterContactLastName(value) {
    await this.contactLastNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactLastNameInput.fill(value);
  }

  async enterContactJobTitle(value) {
    await this.contactJobTitleInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactJobTitleInput.fill(value);
  }

  async enterContactPrimaryPhone(value) {
    await this.contactPrimaryPhoneInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactPrimaryPhoneInput.fill(value);
  }

  async enterContactExtension(value) {
    await this.contactExtensionInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactExtensionInput.fill(value);
  }

  async enterContactMobile(value) {
    await this.contactMobileInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactMobileInput.fill(value);
  }

  async enterContactEmail(value) {
    await this.contactEmailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactEmailInput.fill(value);
  }

  async scrollToContactNotes() {
    await this.contactNotesInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactNotesInput.scrollIntoViewIfNeeded();
  }

  async enterContactNotes(value) {
    await this.contactNotesInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactNotesInput.scrollIntoViewIfNeeded();
    await this.contactNotesInput.fill(value);
  }

  async clickSaveContact() {
    await this.contactSaveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactSaveButton.click();
  }

  async deleteContactEntry() {
    const deleteButton = this.page.locator('button:has(svg[data-icon="trash-can"])').first();
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
    await deleteButton.click();

    const confirmButton = this.page.getByRole('button', { name: 'Yes' });
    await confirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await confirmButton.click();
  }

  async clickListItemByText(value) {
    const item = this.page.locator('li', { hasText: value }).first();
    await item.waitFor({ state: 'visible', timeout: 10000 });
    await item.click();
    await this.page.waitForTimeout(1000);
  }

  async clickAndEnterListItemValue(value) {
    // Step 1: Click the li row that contains the field label (City, etc.)
    const item = this.page.locator('li').filter({ hasText: value }).first();
    await item.waitFor({ state: 'visible', timeout: 10000 });
    await item.click();
    await this.page.waitForTimeout(800);

    // Step 2: Try multiple strategies to locate the input that appears after click

    // Strategy A: input inside the same li
    const inputInLi = item.locator('input').first();
    if (await inputInLi.isVisible().catch(() => false)) {
      await inputInLi.triple_click?.().catch(() => inputInLi.click());
      await inputInLi.fill('');
      await inputInLi.pressSequentially(value, { delay: 80 });
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('ArrowDown');
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(500);
      return;
    }

    // Strategy B: focused input anywhere on page (document.activeElement)
    const focusedInput = this.page.locator('input:focus');
    if (await focusedInput.isVisible().catch(() => false)) {
      await focusedInput.fill('');
      await focusedInput.pressSequentially(value, { delay: 80 });
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('ArrowDown');
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(500);
      return;
    }

    // Strategy C: any visible text/search input on page
    const visibleInput = this.page.locator(
      'input[type="text"]:visible, input[type="search"]:visible, input:not([type]):visible'
    ).last();
    await visibleInput.waitFor({ state: 'visible', timeout: 5000 });
    await visibleInput.click();
    await visibleInput.fill('');
    await visibleInput.pressSequentially(value, { delay: 80 });
    await this.page.waitForTimeout(500);
    await this.page.keyboard.press('ArrowDown');
    await this.page.waitForTimeout(300);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async searchDropdownAndSelect(searchText) {
    const searchInput = this.page.locator(
      'input[placeholder*="Search" i], input[aria-label*="Search" i], input[type="search"], .ant-select-selection-search-input input'
    ).first();

    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.click();
    await searchInput.fill('');
    await searchInput.pressSequentially(searchText, { delay: 100 });
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  /**
   * Upload a file via the Files tab
   * @param {string} filePath - absolute path to the file e.g. 'D:\\Automation\\CreateLead\\testdata\\file.pdf'
   */
  async uploadFile(filePath) {
    // Step 1: Click the Files button/tab
    await this.filesButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.filesButton.click();
    await this.page.waitForTimeout(800);

    // Step 2: Click the drop zone area to activate the upload panel
    await this.filesDropZone.waitFor({ state: 'visible', timeout: 10000 });
    await this.filesDropZone.click();
    await this.page.waitForTimeout(500);

    // Step 3: Set the file using the Choose File input button
    await this.chooseFileButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.chooseFileButton.setInputFiles(filePath);
    await this.page.waitForTimeout(500);

    // Step 4: Click Attach to upload
    await this.attachButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.attachButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickCreateLead() {
    await this.createLeadButton.waitFor({ state: 'visible' });
    await this.createLeadButton.click();
  }

  /**
   * Create a task by clicking Task button, entering subject and address
   * @param {string} subject  - e.g. 'This is a subject'
   * @param {string} address  - e.g. 'nana varchha'
   */
  async createTask(subject, address) {
    // Step 1: Click the Task button to open the task form
    await this.taskButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskButton.click();
    await this.page.waitForTimeout(800);

    // Step 2: Fill in the subject/description field
    await this.taskSubjectInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskSubjectInput.click();
    await this.taskSubjectInput.fill(subject);
    await this.page.waitForTimeout(300);

    // Step 3: Fill in the address using the overlay input (triggers autocomplete)
    await this.taskAddressOverlay.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskAddressOverlay.click();
    await this.taskAddressOverlay.fill(address);
    await this.page.waitForTimeout(800);

    // Step 4: ArrowDown to select first suggestion, then Enter to confirm
    await this.taskAddressInput.press('ArrowDown');
    await this.page.waitForTimeout(300);
    await this.taskAddressInput.press('Enter');
    await this.page.waitForTimeout(500);
  }

  // ─── Company Column Sorting Methods ────────────────────────────────────────

  async getCompanyColumnValues() {
    return await this.page.locator('tbody tr td:nth-child(3)').allTextContents();
  }

  isSortedAsc(arr) {
    return [...arr].sort((a, b) => a.localeCompare(b)).every((val, i) => val === arr[i]);
  }

  isSortedDesc(arr) {
    return [...arr].sort((a, b) => b.localeCompare(a)).every((val, i) => val === arr[i]);
  }


  async testCompanyColumnSorting() {
    console.log('\n========================================');
    console.log('🔍 Starting Company Column Sorting Test');
    console.log('========================================\n');

    // Step 1: Verify Company column is visible
    const companyHeader = this.page.getByRole('columnheader', { name: 'Company' });
    
    try {
      await companyHeader.waitFor({ state: 'visible', timeout: 10000 });
      console.log('✅ Company column header is VISIBLE');
    } catch (error) {
      console.log('Company column header is NOT VISIBLE');
      throw new Error('Company column header not found on the page');
    }

    // Get initial data before sorting
    const initialData = await this.getCompanyColumnValues();

    // Step 2: Click for Ascending sort
    await companyHeader.click();
    await this.page.waitForTimeout(1000);
    const ascData = await this.getCompanyColumnValues();

    // Ascending check
    if (!this.isSortedAsc(ascData)) {
      throw new Error('Company column is NOT sorted in ascending order');
    }
    console.log(' SUCCESS: Company column is sorted in ASCENDING order (A → Z)');

    // Step 3: Click again for Descending sort
    await companyHeader.click();
    await this.page.waitForTimeout(1000);

    const descData = await this.getCompanyColumnValues();

    // Descending check
    if (!this.isSortedDesc(descData)) {
      throw new Error('Company column is NOT sorted in descending order');
    }
    console.log(' SUCCESS: Company column is sorted in DESCENDING order (Z → A)');

  }

  async getCompanyColumnValuesByIndex() {
    const columnIndex = await this.page.locator('th')
      .allTextContents()
      .then(headers => headers.indexOf('Company') + 1);

    if (columnIndex === 0) {
      throw new Error('Company column header not found');
    }

    const values = await this.page.locator(`tbody tr td:nth-child(${columnIndex})`).allTextContents();
    return values;
  }
}

module.exports = { CreateLeadPage };
