const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { validUser } = require('../testdata/credentials');

// ─── Given Steps ────────────────────────────────────────────────────────────

Given('User is on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

// ─── When Steps ─────────────────────────────────────────────────────────────

When('User login with valid credentials', async function () {
  await this.loginPage.login(validUser.username, validUser.password);
});

// ─── Then Steps ─────────────────────────────────────────────────────────────

Then('User should be redirected to the dashboard', async function () {
  const dashboardText = this.page.getByRole('navigation').getByText('Dashboard', { exact: true }).first();
  await dashboardText.waitFor({ state: 'visible', timeout: 30000 });
});
