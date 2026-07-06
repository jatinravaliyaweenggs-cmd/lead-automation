const { setWorldConstructor, World, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

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

After(async function (scenario) {
  // Scenario fail થઈ હોય તો screenshot લો
  if (scenario.result.status === 'FAILED') {
    const screenshotDir = path.join(__dirname, '..', 'reports', 'screenshots');

    // Folder ન હોય તો બનાવો
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // File name: scenario name + timestamp
    const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${scenarioName}_${timestamp}.png`;
    const filePath = path.join(screenshotDir, fileName);

    // Screenshot લો અને Cucumber report માં attach કરો
    if (this.page) {
      const screenshot = await this.page.screenshot({ path: filePath, fullPage: true });
      await this.attach(screenshot, 'image/png');
      console.log(`Screenshot saved: ${filePath}`);
    }
  }

  await this.cleanup();
});
