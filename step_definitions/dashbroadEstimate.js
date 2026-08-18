const DashbroadEstimatePage = require("../pages/dashbroadEstimatePage");

const EstimatePage = require('../pages/EstimatePage');
const BasePage = require('../pages/BasePage');

let estimatePage;

const { Then } = require('@cucumber/cucumber');

Then('Verify estimate in Recent Client Responses block', async function () {
  this.dashbroadEstimatePage = new DashbroadEstimatePage(this.page);
  await this.dashbroadEstimatePage.recentClientResponsesBlock();
  await this.dashbroadEstimatePage.verifyRecentClientResponsesColumns()
});