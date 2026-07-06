// Page Object Model - Lead Page
class LeadPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.dashboardButton = page.locator('button:has-text("Dashboard")');
    this.leadMenuItem    = page.locator('a[href="/manage-leads"]');
    this.leadsHeading    = page.locator('span.ant-typography[color="white"]', { hasText: 'Leads' });
    this.addLeadButton   = page.locator('svg[data-icon="plus"]');
    this.leadOption      = page.locator('a.ant-typography:has(svg[data-icon="plus"])');
  }

  /**
   * Click Dashboard button from sidebar/menu
   */
  async clickDashboard() {
    await this.dashboardButton.waitFor({ state: 'visible' });
    await this.dashboardButton.click();
  }

  /**
   * Click Lead menu item
   */
  async clickLeadMenu() {
    await this.leadMenuItem.waitFor({ state: 'visible' });
    await this.leadMenuItem.click();
  }

  /**
   * Wait for Lead page to load
   */
  async waitForLeadPage() {
    await this.page.waitForURL('**/manage-leads**', { timeout: 30000 });
  }

  /**
   * Click Add Lead button (plus icon)
   */
  async clickAddLeadButton() {
    await this.addLeadButton.waitFor({ state: 'visible' });
    await this.addLeadButton.click();
  }

  /**
   * Click Lead option from dropdown
   */
  async clickLeadOption() {
    await this.leadOption.waitFor({ state: 'visible' });
    await this.leadOption.click();
  }
}

module.exports = { LeadPage };
