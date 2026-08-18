const { expect } = require('@playwright/test');
const testData = require('../testdata/testData');

const EstimatePage = require('../pages/EstimatePage');
const BasePage = require('../pages/BasePage');

let estimatePage;

class DashbroadEstimatePage {

  constructor(page) {
    this.page = page;
    estimatePage = new EstimatePage(page);

    // Recent Client Responses Block
    this.recentClientResponses = page.locator('.common-card').filter({ hasText: 'Recent Client Responses' }).first();

    // Estimate title
    this.estimateTitle = page.locator('[role="gridcell"][col-id="subject"]').filter({ hasText: 'This is a testing title' }).first();

    // Recent Client Responses column headers
    this.columnHeaders = this.recentClientResponses.locator('.ag-header-cell[role="columnheader"] .ag-header-cell-text');

    // Estimate row
    this.estimateRow = page.locator('[role="row"]').filter({ hasText: 'This is a testing title' }).first();

    // Estimate status
    this.estimateStatus = this.estimateRow.locator('[col-id="status"]');
  }

  async recentClientResponsesBlock() {
    const expectedTitle = 'This is a testing title';
    await expect(this.estimateTitle).toBeVisible();
    await expect(this.estimateTitle).toHaveText(expectedTitle);
    console.log(`Assertion Passed: Estimate title is "${expectedTitle}"`);
  }

  async verifyRecentClientResponsesColumns() {
    const expectedColumns = ['EST. #','Title','Customer','Status'];
    await expect(this.recentClientResponses).toBeVisible();
    await expect(this.columnHeaders).toHaveText(expectedColumns);
    console.log('Assertion Passed: All Recent Client Responses columns are displayed');
  }

  async verifyEstimateStatus() {
    const expectedStatus = 'Approved';
    await expect(this.estimateRow).toBeVisible();
    await expect(this.estimateStatus).toHaveText(expectedStatus);
    console.log(`Assertion Passed: Estimate status is "${expectedStatus}"`);
  }
}

module.exports = DashbroadEstimatePage;