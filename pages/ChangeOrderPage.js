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

        this.createChangeOrderButton = page.getByRole('button', { name: 'Create Change Order' });
        this.typeAChangeOrderNumber = page.getByPlaceholder('Type a Change Order number');
        this.briefDescriptionOfWhatIsBeingChangedTextbox = 
        page.getByPlaceholder('Brief description of what is being changed');

        this.searchProjectsTextbox = page.getByPlaceholder('Search Project(s)', { exact: true });
        this.filterButton = page.locator('button:has(svg[data-icon="filter"])');
    }

    async clickFilterButton(){
        await this.filterButton.click();
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

    async createChnageOrder(){
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({hasText: changeOrderData.projectName}).click();
        await this.briefDescriptionOfWhatIsBeingChangedTextbox.fill(changeOrderData.description); 
        await this.typeAChangeOrderNumber.fill(changeOrderData.changeOrderNumber); 
        await this.createChangeOrderButton.click();
        await this.page.getByRole('gridcell', {name: changeOrderData.changeOrderNumber});
    }
}

module.exports = ChangeOrderPage;