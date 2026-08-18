const { expect } = require('@playwright/test');

class DashbroadEstimatePage {

  constructor(page) {
    this.page = page;
    this.recentClientResponses = page.locator('.common-card').filter({ hasText: 'Recent Client Responses' }).first();
    this.estimateTitle = this.recentClientResponses.locator('[role="gridcell"][col-id="subject"]').filter({ hasText: 'This is a testing title' }).first();
    this.columnHeaders = this.recentClientResponses.locator('.ag-header-cell[role="columnheader"] .ag-header-cell-text');
    this.estimateRow = this.recentClientResponses.locator('[role="row"]').filter({ hasText: 'This is a testing title' }).first();
    this.estimateStatus = this.estimateRow.locator('[col-id="status"]');
    this.backButton = this.page.getByRole('button', { name: 'Back' });
    this.resetButton = this.page.locator('button:has(svg[data-icon="arrow-rotate-right"])');
    this.recentClientResponses = page.locator('.common-card').filter({ hasText: 'Recent Client Responses' }).first();
    this.resetButton = this.recentClientResponses.locator('button:has(svg[data-icon="arrow-rotate-right"])');
  }

  async clickBackButton() {
  const backButton = this.page.getByRole('button', { name: 'Back' });
  await expect(backButton).toBeVisible();
  await backButton.click();
}

  async recentClientResponsesBlock() {
    const expectedTitle = 'This is a testing title';
    await expect(this.recentClientResponses).toBeVisible();
    await expect(this.estimateTitle).toBeVisible();
    await expect(this.estimateTitle).toHaveText(expectedTitle);
    console.log(`Assertion Checked: Estimate title is "${expectedTitle}"`);
  }

  async verifyRecentClientResponsesColumns() {
    const expectedColumns = ['EST. #','Title','Customer','Status'];
    await expect(this.recentClientResponses).toBeVisible();
    await expect(this.columnHeaders).toHaveText(expectedColumns);
    console.log('Assertion Checked: Recent Client Responses columns are displayed');
  }

  async verifyEstimateStatus() {

    const expectedStatus = 'Approved';
    await expect(this.estimateRow).toBeVisible();
    await expect(this.estimateStatus).toHaveText(expectedStatus);
    console.log(`Assertion Checked: Estimate status is "${expectedStatus}"`);
  }

async VerifyEstimateTitleInRecentalyVisibleBlock(){
    const estimateRow = this.page.locator('[role="row"]').filter({ hasText: 'Est#348642' });
    await estimateRow.locator('[role="gridcell"][col-id="subject"]').click();
    await expect(this.page.locator('#custom_estimate_id')).toHaveValue('EST. #Est#348642');

}

async clickCustomerProfileFromEstimate(title) {
await this.clickBackButton();
  const row = this.page.locator('[role="row"]').filter({has: this.page.getByText(title, { exact: true })}).first();
    await expect(row).toBeVisible();
  const customerCell = row.locator('[role="gridcell"][col-id="customer"]');
  await expect(customerCell).toBeVisible();
  await customerCell.click();

  // Customer profile assertion
  const customerProfile = this.page.getByRole('button', {name: "Bhavik Raval (Bhavik and son's company)"});
  await expect(customerProfile).toBeVisible();
  console.log('Assertion Checked: Customer profile "Bhavik Raval (Bhavik and son\'s company)" is visible');
}


async verifyResetButton() {
    await this.clickBackButton();
  await expect(this.resetButton).toBeVisible();
  await expect(this.resetButton).toBeEnabled();
  await this.resetButton.click();
  await expect(this.resetButton).toBeVisible();
  console.log('Assertion Checked: Reset button is visible, enabled, and clickable');
}




}

module.exports = DashbroadEstimatePage;