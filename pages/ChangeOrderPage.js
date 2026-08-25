const { expect } = require('@playwright/test');

class ChangeOrderPage {
    constructor(page) {
        this.page = page;
        this.logo = page.locator('a.logo[href="/"]');
        this.menuDropdown = page.locator('li.header-list-menu button');
        this.changeOrdersMenu = page.locator('a[href="/manage-change-orders"]');

        this.changeOrderDropdown = page.locator('button.add-select-dropdown');
        this.changeOrderPageButton = page.getByRole('menuitem').filter({hasText: 'Change Order'});
    }

    async openChangeOrderPage() {
        await this.logo.click();
        await this.menuDropdown.nth(1).click();
        await this.changeOrdersMenu.click();
        await this.page.waitForURL('**/manage-change-orders');
    }

    async clickAddChangeOrder(){
        await this.changeOrderDropdown.click();
        await this.changeOrderPageButton.first().click();
        await expect(this.page.locator('h5', { hasText: 'Add Change Order' })).toBeVisible();
    }
}

module.exports = ChangeOrderPage;