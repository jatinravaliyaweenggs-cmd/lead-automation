const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LeadPage } = require('../pages/LeadPage');

// ─── When Steps ─────────────────────────────────────────────────────────────

When('User navigates to Lead page and opens Add Lead form', async function () {
  this.leadPage = new LeadPage(this.page);
  await this.leadPage.clickDashboard();
  await this.leadPage.clickLeadMenu();
  await this.leadPage.waitForLeadPage();
  await this.leadPage.leadsHeading.waitFor({ state: 'visible', timeout: 15000 });
  await this.leadPage.clickAddLeadButton();
  await this.leadPage.clickLeadOption();
});

Then('Lead form should be opened', async function () {
  await this.page.waitForTimeout(2000);
});

Then('Lead form fields should have correct placeholders', async function () {
  await this.leadPage.verifyFormPlaceholders(this.attach.bind(this));
});

Then('The following mandatory fields should display an asterisk symbol', async function (dataTable) {
  const fieldNames = dataTable.hashes().map((row) => row['Field']);
  await this.leadPage.verifyMandatoryAsterisk(fieldNames, this.attach.bind(this));
});
