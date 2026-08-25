class ChangeOrderPage {
    constructor(page) {
        this.page = page;
        this.logo = page.locator('a.logo[href="/"]');
        this.menuDropdown = page.locator('li.header-list-menu button');
        this.changeOrdersMenu = page.locator('a[href="/manage-change-orders"]');
    }

    async openChangeOrderPage() {
        await this.logo.click();
        await this.menuDropdown.nth(1).click();
        await this.changeOrdersMenu.click();
        await this.page.waitForURL('**/manage-change-orders');
    }
}

module.exports = ChangeOrderPage;