const { setWorldConstructor, World, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Global timeout for all steps - 60 seconds
setDefaultTimeout(60 * 1000);

/**
 * Custom World class for Cucumber
 * Manages browser and page instances
 */
class CustomWorld extends World {
  async init() {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 800  // દરેક action વચ્ચે 800ms wait
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(60000);
    this.page.setDefaultNavigationTimeout(60000);
  }

  async cleanup() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.init();
});

After(async function () {
  await this.cleanup();
});
