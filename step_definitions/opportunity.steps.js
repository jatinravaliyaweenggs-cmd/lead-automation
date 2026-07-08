const { When } = require('@cucumber/cucumber');
const { OpportunityPage } = require('../pages/OpportunityPage');

When('User navigates to Opportunity page', async function () {
  this.opportunityPage = new OpportunityPage(this.page);
  await this.opportunityPage.navigateToOpportunityPage();
});
