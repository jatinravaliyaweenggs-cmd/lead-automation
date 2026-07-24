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
  // Clear + type
  await this.searchCustomer.fill('');
  await this.searchCustomer.fill(name);

  // Wait for results load
  const row = this.page.locator('.ag-row')
    .filter({ hasText: name })
    .first();

  await row.waitFor({ state: 'visible', timeout: 15000 });

  // Click row
  await row.click();
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