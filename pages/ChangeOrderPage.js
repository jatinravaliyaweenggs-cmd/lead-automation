const { expect } = require('@playwright/test');
const changeOrderData = require('../testdata/chnageOrderData');

class ChangeOrderPage {
    constructor(page) {
        this.page = page;
        this.logo = page.locator('a.logo[href="/"]');
        this.menuDropdown = page.locator('li.header-list-menu button');
        this.changeOrdersMenu = page.locator('a[href="/manage-change-orders"]');

        this.changeOrderDropdown = page.locator('button.add-select-dropdown');
        this.changeOrderPageButton = page.getByRole('menuitem').filter({hasText: 'Change Order'});
        this.changeOrderRequestPageButton = page.getByRole('menuitem').filter({hasText: 'Change Order Request'});

        this.createChangeOrderButton = page.getByRole('button', { name: 'Create Change Order' });
        this.typeAChangeOrderNumber = page.getByPlaceholder('Type a Change Order number');
        
        this.typeAChangeOrderRequestNumber = page.getByPlaceholder('Type a Change Order Request number');
        this.briefDescriptionOfWhatIsBeingChangedTextbox = 
        page.getByPlaceholder('Brief description of what is being changed');

        this.searchProjectsTextbox = page.getByPlaceholder('Search Project(s)', { exact: true });
        this.filterButton = page.locator('button:has(svg[data-icon="filter"])');
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });

        this.createChangeOrderRequestButton = page.getByRole('button', { name: 'Create Change Order Request' });
    }

    async clickFilterButton(){
        await this.filterButton.click();
        await this.page.getByText('Change Orders Filter', { exact: true });
        await this.page.locator('#date_range').click();
        await this.page.locator('.ant-picker-presets li').getByText('Today', { exact: true }).click();
        await this.page.locator('.flex.items-center.justify-between.\\!max-w-full').click();

        await this.page.getByPlaceholder('Search Projects plu', { exact: true }).fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({hasText: changeOrderData.projectName}).click();
        await this.saveButton.click();

        await this.page.locator('div.ant-select[name="billing_status"]').click(); 
        await this.page.keyboard.type('Proposed Change Order-ss (CO)'); 
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Escape');
        await this.page.getByRole('gridcell', {name: changeOrderData.changeOrderNumber});

    }


    async openChangeOrderPage() {
        await this.logo.click();
        await this.menuDropdown.nth(1).click();
        await this.changeOrdersMenu.click();
        await this.page.waitForURL('**/manage-change-orders');
    }

    async clickAddChangeOrderButton(){
        await this.changeOrderDropdown.click();
        await this.changeOrderPageButton.first().click();
        await expect(this.page.locator('h5', { hasText: 'Add Change Order' })).toBeVisible();
    }

    async createChnageOrderRequest(){
        await this.changeOrderDropdown.click();
        await this.changeOrderRequestPageButton.first().click();
        await expect(this.page.locator('h5', { hasText: 'Add Change Order Request' })).toBeVisible();
        await this.selectProject();
        await this.enterSubject();
        await this.typeAChangeOrderRequestNumber.fill(changeOrderData.changeOrderRequestNumber); 
        await this.createChangeOrderRequestButton.click();
        await this.page.getByRole('gridcell', {name: changeOrderData.changeOrderRequestNumber});

    }


    async selectProject(){
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({hasText: changeOrderData.projectName}).click();
    }

    async enterSubject(){
        await this.briefDescriptionOfWhatIsBeingChangedTextbox.fill(changeOrderData.subject); 
    }

    async createChnageOrder(){
        await this.selectProject();
        await this.enterSubject();
        await this.typeAChangeOrderNumber.fill(changeOrderData.changeOrderNumber); 

        await this.page.locator('#rc_select_9').click(); 
        await this.page.locator('#rc_select_9').fill('Template - Bathroom Plumbing'); 
        await this.page.keyboard.press('Enter');




        await this.createChangeOrderButton.click();
        await this.page.getByRole('gridcell', {name: changeOrderData.changeOrderNumber});
    }


async verifyMandatoryData() {
    await this.clickAddChangeOrderButton();
    await this.createChangeOrderButton.click();
    await expect(this.page.getByText('This field is required.', { exact: true })).toHaveCount(3);
}



    async createChnageOrderForMaxProjectLenght(){
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({hasText: changeOrderData.projectName}).click();
        await this.briefDescriptionOfWhatIsBeingChangedTextbox.fill(changeOrderData.subjectMax); 
        await this.typeAChangeOrderNumber.fill(changeOrderData.changeOrderNumber); 
        await this.createChangeOrderButton.click();
        await expect(this.page.locator('.ant-notification-notice-message')).toHaveText('Alert');
    }




}

module.exports = ChangeOrderPage;