const { Then } = require('@cucumber/cucumber');

const DashbroadEstimatePage = require('../pages/dashbroadEstimatePage');

Then('Verify estimate in Recent Client Responses block visible', async function () {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.recentClientResponsesBlock();
});

Then('Verify estimate in Recent Client Responses block column visible', async function () {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.verifyRecentClientResponsesColumns();
});

Then('Verify estimate in Recent Client Responses block status visible', async function () {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.verifyEstimateStatus();
});

Then('Verify estimate title after click on estimate link and verify title', async function () {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.VerifyEstimateTitleInRecentalyVisibleBlock();
});

Then('Click customer profile for estimate {string}', async function (title) {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.clickCustomerProfileFromEstimate(title);
});

Then('Verify ResetButton is visible on Estimate page and working', async function () {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.verifyResetButton();
});