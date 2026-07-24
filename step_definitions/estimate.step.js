const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const EstimatePage = require('../pages/EstimatePage');

let estimatePage;

When('User navigates to Estimate page', async function () {
  estimatePage = new EstimatePage(this.page);
  await estimatePage.openEstimatePage();
});

When('User creates a new Estimate', async function () {
  await estimatePage.createEstimate();
});

Then('Estimate should be created successfully', async function () {
  await estimatePage.verifyEstimateCreated();
});