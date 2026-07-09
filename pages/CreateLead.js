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
}

module.exports = { CreateLeadPage };
