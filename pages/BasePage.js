const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;

    // ✅ Only Save Button
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.logo = this.page.locator('a.logo.px-2\.5.m-auto[href="/"]');

    this.projectOpportunityBtn = this.page.locator('button[name="project_id"]');
    this.newButton = this.page.getByRole('button', { name: 'New' });
    this.projectPlusButton = this.page.getByRole('menuitem', { name: 'Project' });

    this.projectNumberInput = this.page.locator('input[placeholder="Type a Project number"]');
    this.yesBtn =  this.page.getByRole('button', { name: 'Yes', exact: true });
    this.selectCreateCustomerOrLead = page.getByRole('button', {name: 'Select/Create Customer or Lead',exact: true});
    this.noRecordsMessage = this.page.getByText('No Records Available', {exact: true});

    this.leadsButton = this.page.getByRole('button', {name: 'Leads', exact: true});
    this.searchforLead = this.page.getByPlaceholder('Search for Lead');
  }

  async verifyNoRecordsAvailable() {
  await expect(this.noRecordsMessage).toBeVisible({timeout: 5000});
}

async clickSelectCreateCustomerOrLead(){
    await this.selectCreateCustomerOrLead.click();

}
    


  async estimatePageOpenAfterCreate() {
    await this.logoImg.nth(0).click(); // ✅ correct
    await this.menuDashboard.click();
    await this.estimatesMenu.waitFor({ state: 'visible', timeout: 15000 });
  }

  async randomProjectNumbergenerate() {
    const randomProjectNumber = `PRJ-${Date.now().toString().slice(-8)}`;
    await this.projectNumberInput.fill(randomProjectNumber);
  }


  async projectNameInputFill() {
    this.projectNameInput = this.page.locator('input[name="project_name"]');

    await this.projectNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.projectNameInput.click({ force: true });
    await this.projectNameInput.clear();
    await this.projectNameInput.type('Automation Project', { delay: 50 });
  }





  async projectPlusButtonClick() {
    await this.newButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.newButton.click();
    await this.projectPlusButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.projectPlusButton.click();
  }

  async clickProjectOpportunitysTextbox() {
    await this.projectOpportunityBtn.waitFor({ state: 'visible' });
    await this.projectOpportunityBtn.click();

  }


  async randomEstimateNumbergenerate() {
    const uniqueNum = `Est#${Date.now().toString().slice(-6)}`;
    await this.customerEstimateNumber.fill(uniqueNum);
  }

  async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.click();
  }

  async clickLogo() {
    await this.logo.click();
  }

  async selectProjectOpportunity(projectName, searchInputLocator = 'input[placeholder="Search Project/Opportunity-S"]') {
    const searchInput = this.page.locator(searchInputLocator);
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.click();
    await searchInput.fill(projectName);
    await this.page.locator('.ant-drawer, .ant-select-dropdown').first().waitFor({ state: 'visible', timeout: 10000 });
    const project = this.page.locator('.project').filter({ hasText: projectName }).first();
    await project.waitFor({ state: 'visible', timeout: 10000 });
    await project.click();
  }
}

module.exports = BasePage;