const { When } = require('@cucumber/cucumber');
const { CreateLeadPage } = require('../pages/CreateLead');
const { leadData } = require('../testdata/credentials');

When('User fills in the lead form details', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);

  await this.createLeadPage.enterCompanyName(leadData.companyName);
  await this.createLeadPage.enterFirstName(leadData.firstName);
  await this.createLeadPage.enterLastName(leadData.lastName);
  await this.createLeadPage.selectStage(leadData.stage);
  await this.createLeadPage.enterPhone(leadData.phone);
  await this.createLeadPage.enterPhoneExt1(leadData.phoneExt1);
  await this.createLeadPage.enterPhone2(leadData.phone2);
  //await this.createLeadPage.enterPhoneExt2(leadData.phoneExt2);
  await this.createLeadPage.enterCell(leadData.cell);
  await this.createLeadPage.enterEmail(leadData.email);
  await this.createLeadPage.enterAddress(leadData.address);
  await this.createLeadPage.clickCreateLead();
});

When('User clicks the first row in the table', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.clickFirstTableRow();
});

When('User enters project name, title, and fax details in one step', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.enterProjectName('Project 001');
  await this.createLeadPage.enterTitle('Sample Title');
  await this.createLeadPage.enterFax('1234567890');
  await this.createLeadPage.pressTabKey();
});

When('User selects the first Contact Time option', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.selectFirstContactTime();
});

When('User clicks the Additional Contact button', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.clickAdditionalContact();
});

When('User clicks the value {string}', async function (value) {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.clickAndEnterListItemValue(value);
});

When('User fills in the additional contact details', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.enterContactFirstName('Jatin');
  await this.createLeadPage.enterContactLastName('Ravaliya');
  await this.createLeadPage.enterContactJobTitle('QA Engineer');
  await this.createLeadPage.enterContactPrimaryPhone('9876543210');
  await this.createLeadPage.enterContactExtension('101');
  await this.createLeadPage.enterContactMobile('9876501234');
  await this.createLeadPage.enterContactEmail('jatin.ravaliya@test.com');
  await this.createLeadPage.scrollToContactNotes();
  await this.createLeadPage.enterContactNotes('This is test contact created via automation');
  await this.createLeadPage.clickSaveContact();
  await this.createLeadPage.deleteContactEntry();
});

When('User selects the first Best Time to Call option', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.selectFirstPreferredContactMethod();
});

When('User enters the gate code', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.enterGateCode('12345');
});

When('User selects a tag', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.selectTag('Bhagu');
});

When('user open sales tab', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.sleasPageOpen();
  console.log("page open successfully");
  await this.createLeadPage.fillupSalesDetails();
})

When('User selects today date', async function () {
  this.createLeadPage = new CreateLeadPage(this.page);
  await this.createLeadPage.selectTodayDate();
});
