class EstimatePage {
  constructor(page) {
    this.page = page;

    // Locators
    this.menuDashboard = page.getByRole('button', { name: 'Menu Dashboard' });
    this.estimatesMenu = page.getByRole('link', { name: 'Estimates-plu' });
    this.newEstimateBtn = page.getByRole('button', { name: 'Estimate-sin' });

    this.titleInput = page.getByRole('textbox', { name: 'Short title for the Estimate-' });
    this.customerBtn = page.getByRole('button', { name: 'Click to select a Customer' });
    this.searchCustomer = page.getByRole('searchbox', { name: 'Search for Customer' });
    this.createEstimateBtn = page.getByRole('button', { name: 'Create Estimate-sin' });
    this.NewCreateEstimateRow = page.locator('table tbody tr');

    this.detailMenuPage = page.getByRole('button', { name: 'Details' });
    this.termTextbox = page.locator('#rc_select_2');

    this.projectTypename = page.locator('#rc_select_3');
   
    this.invoicedToButton =  page.getByRole('button', { name: 'Invoiced To' });
    this.selectVendor =  page.getByRole('button', { name: 'Vendors' });
    this.vendorSerchBox = page.getByRole('searchbox', { name: 'Search for Vendor' });
    this.rakeshVendor = page.getByText('Rakesh Raval (Rakesh and son)');
    
    this.addressDroupdown = page.locator('#scrollable-div-id').getByTitle('Customer');
    this.selectProjectAddress = page.getByText('Project', { exact: true });
    this.pencilIconOfAddress = page.locator('.svg-inline--fa.fa-pencil > path');
    this.addressline1 = page.locator('#ignore-input-change');
    this.addressListitem = page.getByRole('listitem').filter({ hasText: /^-$/ });

  }

  async selectAddress(){
    await this.addressDroupdown.click();
    await this.selectProjectAddress.click();
    await this.addressListitem.hover();
    await this.pencilIconOfAddress.click();
    await this.addressline1.click();
    await this.addressline1.fill('Nana varchha');
    await this.addressline1.press('ArrowDown');
    await this.addressline1.press('Enter');
  }

async selectInvoicedTo() {
  await this.invoicedToButton.waitFor({ state: 'visible', timeout: 10000 });
  await this.invoicedToButton.click();
  await this.page.waitForTimeout(500);

  await this.selectVendor.waitFor({ state: 'visible', timeout: 10000 });
  await this.selectVendor.click();
  await this.page.waitForTimeout(500);

  await this.vendorSerchBox.waitFor({ state: 'visible', timeout: 10000 });
  await this.vendorSerchBox.click();
  await this.vendorSerchBox.fill('rakesh');

  // Wait for skeleton/loading to disappear first, then wait for actual result
  await this.page.waitForFunction(() => {
    const skeletons = document.querySelectorAll('.animate-pulse, [class*="skeleton"], [class*="shimmer"]');
    return skeletons.length === 0;
  }, { timeout: 15000 }).catch(() => {});

  // Wait for actual vendor text to appear
  const vendorResult = this.page.getByText("Rakesh Raval (Rakesh and son's company)").nth(0);
  await vendorResult.waitFor({ state: 'visible', timeout: 20000 });
  await vendorResult.click();
  await this.page.waitForTimeout(500);
}


  async selectProjectType() {
    // 1. Open dropdown
    await this.page.locator('.ant-select-selector', { hasText: 'Select Type' }).click();

    // 2. Target ONLY opened input (aria-expanded = true)
    const input = this.page.locator('input.ant-select-selection-search-input[aria-expanded="true"]');

    await input.waitFor({ state: 'visible' });
    await input.fill('Residential');

    // 3. Select option
    await this.page.locator('.ant-select-item-option', { hasText: 'Residential' }).click();
  }

  async selectContact() {
    const dropdown = this.page.locator('.ant-select-selector', { has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Select Contact' }) });
    await dropdown.click();
    await dropdown.press('ArrowDown');
    await dropdown.press('Enter');
  }

  async selectSector() {
    const dropdown = this.page.locator('.ant-select-selector', { has: this.page.locator('.ant-select-selection-placeholder', { hasText: 'Select Sector' }) });
    await dropdown.click();
    await dropdown.press('ArrowDown');
    await dropdown.press('Enter');
  }

  async selectTermValue() {
    await this.detailMenuPage.click();
    const dropdown = this.page.locator('.ant-select-selector').filter({ hasText: 'Select a Term' });
    await dropdown.click();
    const option = this.page.locator('.ant-select-item-option').filter({ hasText: '30' }).first();
    await option.click();
  }

  async openastimateAndEnterDetails() {
    const row = this.page.locator('.ag-row').filter({ hasText: 'This is a testing title' }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.click();
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