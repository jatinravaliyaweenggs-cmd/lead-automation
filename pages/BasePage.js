class BasePage {
  constructor(page) {
    this.page = page;

    // ✅ Only Save Button
    this.saveButton = page.getByRole('button', { name: 'Save' });
this.logo = this.page.locator('a.logo[href="/"]');
  }

  /**
   * Click Save button (common for all pages)
   */
  async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.click();
  }

  async clickLogo() {
  await this.logo.click();
}

}

module.exports = BasePage;