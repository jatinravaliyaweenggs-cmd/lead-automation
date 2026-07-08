// Page Object Model - Opportunity Page

class OpportunityPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / Menu locators
    this.menuButton      = page.locator('div.md\\:flex').filter({ hasText: 'Dashboard' }).first();
    this.opportunityMenu = page.locator('div.leading-5').filter({ hasText: 'Opportunities(P)' });

    // Opportunity page locator
    this.opportunityHeading = page.locator('div.leading-5', { hasText: 'Opportunities(P)' });
  }

  /**
   * Click the Dashboard menu button to expand/open the nav
   */
  async clickMenuButton() {
    await this.menuButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.menuButton.click();
  }

  /**
   * Click "Opportunities(P)" menu item from sidebar
   */
  async clickOpportunityMenu() {
    await this.opportunityMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.opportunityMenu.click();
  }

  /**
   * Wait until Opportunity page URL is active
   */
  async waitForOpportunityPage() {
    await this.page.waitForURL('**/manage-opportunities**', { timeout: 30000 });
  }

  /**
   * Full navigation: click Dashboard → click Opportunities(P) → wait for page
   */
  async navigateToOpportunityPage() {
    await this.clickMenuButton();
    await this.clickOpportunityMenu();
    await this.waitForOpportunityPage();
  }
}

module.exports = { OpportunityPage };
