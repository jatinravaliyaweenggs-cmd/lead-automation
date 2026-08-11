class BasePage {
  constructor(page) {
    this.page = page;

    // ✅ Only Save Button
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.logo = this.page.locator('a.logo[href="/"]');

    this.projectOpportunityBtn = this.page.locator('button[name="project_id"]');
    this.newButton = this.page.getByRole('button', { name: 'New' });
    this.projectPlusButton = this.page.getByRole('menuitem', { name: 'Project' });
  }


  async projectCreateForNewEstimate(){
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