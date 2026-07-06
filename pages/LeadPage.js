// Page Object Model - Lead Page
const { expect } = require('@playwright/test');

class LeadPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.dashboardButton = page.locator('button:has-text("Dashboard")');
    this.leadMenuItem    = page.locator('a[href="/manage-leads"]');
    this.leadsHeading    = page.locator('span.ant-typography[color="white"]', { hasText: 'Leads' });
    this.addLeadButton   = page.locator('svg[data-icon="plus"]');
    this.leadOption      = page.locator('a.ant-typography:has(svg[data-icon="plus"])');
  }

  /**
   * Click Dashboard button from sidebar/menu
   */
  async clickDashboard() {
    await this.dashboardButton.waitFor({ state: 'visible' });
    await this.dashboardButton.click();
  }

  /**
   * Click Lead menu item
   */
  async clickLeadMenu() {
    await this.leadMenuItem.waitFor({ state: 'visible' });
    await this.leadMenuItem.click();
  }

  /**
   * Wait for Lead page to load
   */
  async waitForLeadPage() {
    await this.page.waitForURL('**/manage-leads**', { timeout: 30000 });
  }

  /**
   * Click Add Lead button (plus icon)
   */
  async clickAddLeadButton() {
    await this.addLeadButton.waitFor({ state: 'visible' });
    await this.addLeadButton.click();
  }

  /**
   * Click Lead option from dropdown
   */
  async clickLeadOption() {
    await this.leadOption.waitFor({ state: 'visible' });
    await this.leadOption.click();
  }

  /**
   * Highlight a failing element with red border + light red background
   * @param {import('@playwright/test').Locator} locator
   */
  async highlightElement(locator) {
    try {
      await locator.evaluate((el) => {
        el.style.outline          = '3px solid red';
        el.style.outlineOffset    = '2px';
        el.style.backgroundColor  = '#ffe0e0';
      });
    } catch (_) {
      // element not found — skip highlight
    }
  }

  /**
   * Remove highlight styling from all input elements
   */
  async clearHighlights() {
    await this.page.evaluate(() => {
      document.querySelectorAll('input').forEach((el) => {
        el.style.outline         = '';
        el.style.outlineOffset   = '';
        el.style.backgroundColor = '';
      });
    });
  }

  /**
   * Verify all Lead form input field placeholders.
   * - Checks every field without stopping at first failure
   * - Highlights all failing fields in red
   * - Takes a screenshot with highlights visible
   * - Attaches screenshot to Cucumber HTML report
   * - Throws a combined error listing all failures
   *
   * @param {function} attachFn - Cucumber's this.attach for embedding screenshot in report
   */
  async verifyFormPlaceholders(attachFn) {
    const page = this.page;

    // All fields to verify: locator, expected placeholder, human-readable label
    const fields = [
      { locator: page.locator('input[name="company_name"]'),     expected: 'Company name',            label: 'Company'     },
      { locator: page.locator('input[name="first_name"]'),       expected: 'Lead contact first name', label: 'First Name'  },
      { locator: page.locator('input[name="last_name"]'),        expected: 'Lead contact last name',  label: 'Last Name'   },
      { locator: page.locator('input[name="phone"]'),            expected: 'Primary phone number',    label: 'Phone'       },
      { locator: page.locator('input[name="phone_ext"]'),        expected: 'Extension',               label: 'Phone Ext'   },
      { locator: page.locator('input[name="phone2"]'),           expected: 'Secondary phone number',  label: 'Phone 2'     },
      { locator: page.locator('input[name="phone_ext2"]'),       expected: 'Extension',               label: 'Phone 2 Ext' },
      { locator: page.locator('input[name="cell"]'),             expected: 'Mobile/Cell number',      label: 'Cell'        },
      { locator: page.locator('input[name="email"]'),            expected: 'Email address',           label: 'Email'       },
      { locator: page.locator('input[name="address1"]').first(), expected: 'Street address',          label: 'Street'      },
      { locator: page.locator('input[name="address2"]'),         expected: 'Suite or unit',           label: 'Street 2'    },
      { locator: page.locator('input[name="city"]'),             expected: 'City',                    label: 'City'        },
      { locator: page.locator('input[name="state"]'),            expected: 'State/Province',          label: 'State'       },
      { locator: page.locator('input[name="zip"]'),              expected: 'Zip code',                  label: 'Zip'         },
    ];

    const failures = [];

    // Check every field — do NOT stop at first failure
    for (const field of fields) {
      try {
        await expect(field.locator).toHaveAttribute('placeholder', field.expected);
      } catch (err) {
        // Highlight this failing field in red immediately
        await this.highlightElement(field.locator);
        failures.push({ label: field.label, error: err.message });
      }
    }

    // If any field failed — screenshot with highlights, then throw
    if (failures.length > 0) {
      // Small pause so highlight renders before screenshot
      await page.waitForTimeout(300);

      const screenshot = await page.screenshot({ fullPage: true });

      // Embed screenshot in Cucumber HTML report
      if (attachFn) {
        await attachFn(screenshot, 'image/png');
      }

      // Clean up highlights after screenshot is taken
      await this.clearHighlights();

      // Build a clear error summary for all failed fields
      const errorSummary = failures
        .map((f) => `  ❌ [${f.label}] ${f.error}`)
        .join('\n');

      throw new Error(
        `Placeholder verification failed for ${failures.length} field(s):\n${errorSummary}`
      );
    }
  }
}

module.exports = { LeadPage };
