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