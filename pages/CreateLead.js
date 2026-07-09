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
    await this.page.getByText(value, { exact: true }).click();
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
   * Click Create Lead submit button
   */
  async clickCreateLead() {
    await this.createLeadButton.waitFor({ state: 'visible' });
    await this.createLeadButton.click();
  }
}

module.exports = { CreateLeadPage };
