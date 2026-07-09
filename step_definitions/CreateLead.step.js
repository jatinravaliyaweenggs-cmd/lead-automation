const { When } = require('@cucumber/cucumber');
const { CreateLeadPage } = require('../pages/CreateLead');
const { leadData } = require('../testdata/credentials');

When('User fills in the lead form details', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);

  await this.createLeadPage.enterCompanyName(leadData.companyName);
  await this.createLeadPage.enterFirstName(leadData.firstName);
  await this.createLeadPage.enterLastName(leadData.lastName);
});
