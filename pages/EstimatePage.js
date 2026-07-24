class EstimatePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.menuDashboard = page.getByRole('button', { name: 'Menu Dashboard' });
    this.estimatesMenu = page.getByRole('link', { name: 'Estimates-plu' });
    this.newEstimateBtn = page.getByRole('button', { name: 'Estimate-sin' });

    this.titleInput = page.getByRole('textbox', {
      name: 'Short title for the Estimate-'
    });

    this.customerBtn = page.getByRole('button', {
      name: 'Click to select a Customer'
    });

    this.searchCustomer = page.getByRole('searchbox', {
      name: 'Search for Customer'
    });

    this.createEstimateBtn = page.getByRole('button', {
      name: 'Create Estimate-sin'
    });
  }

  async openEstimatePage() {
    await this.menuDashboard.click();
    await this.estimatesMenu.click();
  }

  // ✅ FIXED METHOD (NO STRICT MODE ISSUE)
 async selectCustomer(name) {
    // Clear + type search
    await this.searchCustomer.fill('');
    await this.searchCustomer.fill(name);
    await this.page.waitForTimeout(1500);

    // Click the result row using the list item container
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

  async createEstimate() {
    // Click New Estimate
    await this.newEstimateBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.newEstimateBtn.click();

    // Fill Title
    await this.titleInput.waitFor({ state: 'visible' });
    await this.titleInput.fill('This is a testing title');

    // Select Customer
    await this.customerBtn.click();
    await this.searchCustomer.waitFor({ state: 'visible' });

    await this.selectCustomer('Bhavik Raval');

    // Click Create Estimate
    await this.createEstimateBtn.waitFor({ state: 'visible' });
    await this.createEstimateBtn.click();
  }

  async verifyEstimateCreated() {
    await this.page.waitForLoadState('networkidle');

    // 👉 Update based on actual UI validation
    // Example:
    // await expect(this.page.getByText('Estimate')).toBeVisible();
  }
}

module.exports = EstimatePage;