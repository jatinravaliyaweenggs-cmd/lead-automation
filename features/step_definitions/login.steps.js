const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');

// ─── Given Steps ────────────────────────────────────────────────────────────

Given('User is on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

// ─── When Steps ─────────────────────────────────────────────────────────────

When('User login with {string} and {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

// ─── Then Steps ─────────────────────────────────────────────────────────────

Then('User should be redirected to the dashboard', async function () {
  // "Dashboard" text visible thay tyar sudhi wait karo
  const dashboardText = this.page.locator('span.ant-typography', { hasText: 'Dashboard' });
  await dashboardText.waitFor({ state: 'visible', timeout: 30000 });
});
