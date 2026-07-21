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
  }

    async sleasPageOpen(){
      await this.salesPageName.waitFor({state: 'visible'});
      await this.salesPageName.click();
    }

  async fillupSalesDetails() {
    // Locate the Project Type selector by its placeholder text
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

  async clickCreateLead() {
    await this.createLeadButton.waitFor({ state: 'visible' });
    await this.createLeadButton.click();
  }
}

module.exports = { CreateLeadPage };
