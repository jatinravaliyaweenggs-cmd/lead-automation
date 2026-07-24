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

    this.customerSelect = page.getByText("Bhavik Raval (Bhavik and son'").first();
    this.createEstimateBtn = page.getByRole('button', {
      name: 'Create Estimate-sin'
    });
  }

  async openEstimatePage() {
    await this.menuDashboard.click();
    await this.estimatesMenu.click();
  }

  async createEstimate() {
    // Click New Estimate button
    await this.newEstimateBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.newEstimateBtn.click();
    await this.page.waitForTimeout(1500);

    // Fill in the title
    await this.titleInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.titleInput.click();
    await this.titleInput.fill('This is a testing title');
    await this.page.waitForTimeout(500);

    // Select customer
    await this.customerBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.customerBtn.click();
    await this.page.waitForTimeout(800);

    await this.searchCustomer.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchCustomer.fill('bhavik');
    await this.page.waitForTimeout(1000);

    await this.customerSelect.waitFor({ state: 'visible', timeout: 15000 });
    await this.customerSelect.click();
    await this.page.waitForTimeout(500);

    // Click Create Estimate
    await this.createEstimateBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.createEstimateBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async verifyEstimateCreated() {
    // Simple validation (update based on your UI)
    await this.page.waitForTimeout(2000);

    // Example:
    // await expect(this.page.getByText('Estimate Created')).toBeVisible();
  }
}

module.exports = EstimatePage;