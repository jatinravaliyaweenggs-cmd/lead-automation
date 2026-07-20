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
  }

  /**
   * Enter company name
   * @param {string} value
   */
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

  /**
   * Enter fax value and press Tab
   * @param {string} value
   */
  async enterFax(value) {
    await this.page.waitForTimeout(1000);
    await this.faxInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.faxInput.click();
    await this.faxInput.fill('');
    await this.faxInput.type(value, { delay: 50 });
  }

  /**
   * Press the Tab key
   */
  async pressTabKey() {
    await this.page.keyboard.press('Tab');
  }

  /**
   * Generic helper — opens any Ant Design dropdown and selects its first option
   * @param {import('@playwright/test').Locator} dropdownSelector - the .ant-select-selector locator
   */
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

  /**
   * Select the first option from the Contact Time dropdown
   */
  async selectFirstContactTime() {
    await this.selectFirstOptionFrom(this.contactTimeDropdown);
  }

  /**
   * Select the first option from the Preferred Contact Method dropdown
   */
  async selectFirstPreferredContactMethod() {
    await this.selectFirstOptionFrom(this.bestTimeToCallDropdown);
  }

  /**
   * Click Create Lead submit button
   */
  async clickCreateLead() {
    await this.createLeadButton.waitFor({ state: 'visible' });
    await this.createLeadButton.click();
  }
}

module.exports = { CreateLeadPage };
