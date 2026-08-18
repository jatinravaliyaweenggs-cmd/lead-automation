const { expect } = require('@playwright/test');
const testData = require('../testdata/testData');

const EstimatePage = require('../pages/EstimatePage');
const BasePage = require('../pages/BasePage');

let estimatePage;

class DashbroadEstimatePage {

  constructor(page) {
    this.page = page;
    estimatePage = new EstimatePage(page);

  }

  async recentClientResponsesBlock() {
    const expectedTitle = 'This is a testing title';
    const estimateTitle = this.page.locator('[role="gridcell"][col-id="subject"]').filter({ hasText: expectedTitle }).first();
    await expect(estimateTitle).toBeVisible();
    await expect(estimateTitle).toHaveText(expectedTitle);
    console.log(`Assertion Passed: Estimate title is "${expectedTitle}"`);
  }

async verifyRecentClientResponsesColumns() {
  const recentClientResponses = this.page.locator('.common-card').filter({ hasText: 'Recent Client Responses' }).first();
  await expect(recentClientResponses).toBeVisible();
  const expectedColumns = ['EST. #', 'Title', 'Customer', 'Status'];
  const columnHeaders = recentClientResponses.locator('.ag-header-cell[role="columnheader"] .ag-header-cell-text');
  await expect(columnHeaders).toHaveText(expectedColumns);
  console.log('Assertion Passed: All Recent Client Responses columns are displayed');
}

async verifyEstimateStatus() {
  const expectedTitle = 'This is a testing title';
  const expectedStatus = 'Approved';
  const estimateRow = this.page.locator('[role="row"]').filter({ hasText: expectedTitle }).first();
  await expect(estimateRow).toBeVisible();
  const status = estimateRow.locator('[col-id="status"]');
  await expect(status).toHaveText(expectedStatus);
  console.log(`Assertion Passed: "${expectedTitle}" status is "${expectedStatus}"`);
}

}

module.exports = DashbroadEstimatePage;