const { When, Then } = require('@cucumber/cucumber');
const { LeadPage } = require('../pages/LeadPage');

// ─── When Steps ─────────────────────────────────────────────────────────────

When('User navigates to Lead page via Dashboard', async function () {
  this.leadPage = new LeadPage(this.page);
  await this.leadPage.clickDashboard();
  await this.leadPage.clickLeadMenu();
  await this.leadPage.waitForLeadPage();
});

// ─── Then Steps ─────────────────────────────────────────────────────────────

Then('Lead page should be opened', async function () {
  await this.leadPage.waitForLeadPage();
});

Then('User should see Leads heading', async function () {
  await this.leadPage.leadsHeading.waitFor({ state: 'visible', timeout: 15000 });
});

Then('User clicks on Add Lead button', async function () {
  await this.leadPage.clickAddLeadButton();
});

Then('User clicks on Lead option', async function () {
  await this.leadPage.clickLeadOption();
});
