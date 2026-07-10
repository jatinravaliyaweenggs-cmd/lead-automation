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

    // Stage dropdown locators
    this.stageDropdown    = page.locator('#rc_select_0');

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
    await this.stageDropdown.waitFor({ state: 'visible' });
    await this.stageDropdown.click();
    // Scope to the ant-select dropdown popup to avoid matching other page elements
    await this.page
      .locator('.ant-select-dropdown .ant-select-item-option-content', { hasText: value })
      .filter({ hasText: new RegExp(`^${value}$`) })
      .click();
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
   * Click Create Lead submit button
   */
  async clickCreateLead() {
    await this.createLeadButton.waitFor({ state: 'visible' });
    await this.createLeadButton.click();
  }
}

module.exports = { CreateLeadPage };
