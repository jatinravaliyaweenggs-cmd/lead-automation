// Page Object Model - Login Page
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"].login-button');
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.page.goto('https://beta-app.cfteam.net/sign-in', {
      waitUntil: 'domcontentloaded'  // networkidle ની જગ્યાએ domcontentloaded
    });
    // username field visible થાય ત્યાં સુધી wait
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  /**
   * Enter username
   * @param {string} username
   */
  async enterUsername(username) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   * @param {string} password
   */
  async enterPassword(password) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  /**
   * Full login action
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}

module.exports = { LoginPage };
