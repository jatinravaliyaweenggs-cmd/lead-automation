const { expect } = require('@playwright/test');
const testData = require('../testdata/testData');

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
    this.customerPlusButton = page
      .locator('li').filter({ has: page.getByText('Customers', { exact: true }) }).locator('button.responsive-plus-icon');


    // Customer Creation Locators
// ==================== Create Customer ====================

this.customerCompanyNameInput = this.page.locator('input[name="company_name"]');
this.customerFirstNameInput = this.page.getByPlaceholder('First Name');
this.customerLastNameInput = this.page.getByPlaceholder('Last Name');
this.PrimaryPhoneInput = this.page.getByPlaceholder('Primary phone number');
this.SecondaryPhoneInput = this.page.getByPlaceholder('Secondary phone number');
this.PhoneExtInput = this.page.getByPlaceholder('Extension').nth(0);
this.Phone2ExtInput = this.page.getByPlaceholder('Extension').nth(1);
this.customerPhone2Input = this.page.getByPlaceholder('Phone 2');
this.CellInput = this.page.getByPlaceholder('Cell');
this.EmailInput = this.page.getByPlaceholder('Email');

this.streetAddressInput = this.page.locator('#multi-select-directory-address-overlay');
this.Address2Input = this.page.getByPlaceholder('Suite or unit');
this.City = this.page.getByPlaceholder('City');
this.State = this.page.getByPlaceholder('State/Province');
this.ZipCode = this.page.getByPlaceholder('Zip code');
// this.projectName = this.page.getByPlaceholder('Type a Project name');


this.estimateTitleInput = page.getByRole('textbox', { name: 'Short title for the Estimate-' });

// Leads button

this.estimateLeadsPlusButton = this.page.locator('li').filter({ has: this.page.getByText('Leads', { exact: true }) })
  .locator('button.responsive-plus-icon')
  .first();


this.leadCompanyNameInput = page.getByPlaceholder('Company name');
this.leadFirstNameInput = page.getByPlaceholder('Lead contact first name');
this.leadLastNameInput = page.getByPlaceholder('Lead contact last name');

//this.leadStageInput = this.page.locator('.ant-select[name="stage"]');
this.leadStageInput = this.page.locator('.ant-select[name="stage"]').filter({hasText: 'Click to select the lead stage'});


this.favoritesOnly = this.page.getByLabel('Show Favorites Only');

}




async showFavouritesOnlyCheckBox(){
  await this.clickToSelectACustomerinEstimateText();
  await this.favoritesOnly.check();
  const firstStar = this.page.locator('svg[data-icon="star"]').first();
  await expect(firstStar).toBeVisible();


}


async clickToSelectACustomerinEstimateText(){
 await this.estimatePageOpenAfterCreate();
    await this.estimatesMenu.click();
    await this.newEstimateBtn.click();
    await this.customerBtn.click();
    
    

}

async createLeads(){
  
    await this.leadCompanyNameInput.fill(testData.estimateLead.LeadsCompanyName);
    await this.leadFirstNameInput.fill(testData.estimateLead.firstName);
    await this.leadLastNameInput.fill(testData.estimateLead.lastName);
    await this.leadStageInput.click();
    //this.leadStageSearchInput = this.page.locator('.ant-select[name="stage"] input.ant-select-selection-search-input');
    this.leadStageSearchInput = this.leadStageInput.locator('input.ant-select-selection-search-input');
    await this.leadStageSearchInput.click();
    await this.leadStageSearchInput.fill('Pending');
    await this.page.waitForTimeout(500);
    await this.page.getByText('Pending', { exact: true }).click();
    
    await this.PrimaryPhoneInput.fill(testData.estimateLead.primaryPhone);
    await this.SecondaryPhoneInput.fill(testData.estimateLead.secondaryPhone);

    await this.PhoneExtInput.fill(testData.estimateLead.phoneExt);
    await this.Phone2ExtInput.fill(testData.estimateLead.phone2Ext);
    await this.CellInput.fill(testData.estimateLead.cell);
    await this.EmailInput.fill(testData.estimateLead.email);


    

}



async clickLeadPlusButton() {
  await this.leadsButton.click();
  await this.estimateLeadsPlusButton.waitFor({state: 'visible',timeout: 10000});
  await this.estimateLeadsPlusButton.click();
}

async randomEstimateTitlegenerate(){
    const uniqueNum = `Est#${Date.now().toString().slice(-6)}`;
    await this.estimateTitleInput.fill(uniqueNum);
}
async randomProjectNameGenerate() {
  const randomProjectName = `Automation Project ${Date.now().toString().slice(-6)}`;
  await this.projectNameInput.waitFor({state: 'visible', timeout: 10000});
  await this.projectNameInput.fill(randomProjectName);
}


async enterNewProjectType(){
    await this.projectTypeDropdown.click();
    const randomProjectType = `PType ${Date.now()}`;
    await this.page.keyboard.type(randomProjectType);
    await this.page.keyboard.press('Enter');
    await this.yesBtn.click();
}


async selectProjectType(){
    await this.projectTypeDropdown.click();
    await this.page.keyboard.type('Residential');
    await this.page.keyboard.press('Enter');
}

async selectStreetAddress() {
  await this.streetAddressInput.waitFor({state: 'visible',timeout: 10000});
    await this.streetAddressInput.fill(testData.estimateLead.street);
    await this.Address2Input.fill(testData.estimateLead.street2);
    await this.City.fill(testData.estimateLead.city);
    await this.State.fill(testData.estimateLead.state);
    await this.ZipCode.fill(testData.estimateLead.zip);
  await this.clickSave();
}

async createCustomer() {
  await this.customerCompanyNameInput.waitFor({state: 'visible',timeout: 10000});
  await this.customerCompanyNameInput.fill(testData.customer.companyName);
  await this.customerFirstNameInput.fill(testData.customer.firstName);
  await this.customerLastNameInput.fill(testData.customer.lastName);
  await this.EmailInput.fill(testData.customer.email);
  await this.PrimaryPhoneInput.fill(testData.customer.primaryPhone);
  await this.PhoneExtInput.fill(testData.customer.phoneExtension);
  await this.SecondaryPhoneInput.fill(testData.customer.secondaryPhone);
  await this.Phone2ExtInput.fill(testData.customer.phone2Extension);
  await this.CellInput.fill(testData.customer.cell);

}


    async clickCustomerPlusButton() {
    const plusButton = this.customerPlusButton.first();
    await plusButton.waitFor({ state: 'visible', timeout: 10000 });
    await plusButton.click();
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
    const uniqueNum = `EstNumber-${Date.now().toString().slice(-6)}`;
    await this.customerEstimateNumber.fill(uniqueNum);
  }

  async getUniqueOpportunityData() {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      opportunityNumber: `OPP Number-${uniqueId}`,
      opportunityTitle: `OPP Title-${uniqueId}`,
    };
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