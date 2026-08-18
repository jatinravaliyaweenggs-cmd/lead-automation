const { expect } = require('@playwright/test');

class DashbroadEstimatePage {

  constructor(page) {
    this.page = page;

    // Recent Client Responses Block
    this.recentClientResponses = page.locator('.common-card').filter({ hasText: 'Recent Client Responses' }).first();

    // Estimate Title
    this.estimateTitle = this.recentClientResponses.locator('[role="gridcell"][col-id="subject"]').filter({ hasText: 'This is a testing title' }).first();

    // Column Headers
    this.columnHeaders = this.recentClientResponses.locator('.ag-header-cell[role="columnheader"] .ag-header-cell-text');

    // Estimate Row
    this.estimateRow = this.recentClientResponses.locator('[role="row"]').filter({ hasText: 'This is a testing title' }).first();
    // Estimate Status
    this.estimateStatus = this.estimateRow.locator('[col-id="status"]');

    this.backButton = this.page.getByRole('button', { name: 'Back' });
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
}

}

module.exports = DashbroadEstimatePage;