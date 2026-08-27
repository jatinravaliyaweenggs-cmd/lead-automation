const { expect } = require('@playwright/test');
const changeOrderData = require('../testdata/chnageOrderData');
const changeOrdercommanData = require('../pages/CommanForCO');


class ChangeOrderPage {
    constructor(page) {
        this.page = page;
        this.changeOrdercommanData = new changeOrdercommanData(page);

        this.logo = page.locator('a.logo[href="/"]');
        this.menuDropdown = page.locator('li.header-list-menu button');
        this.changeOrdersMenu = page.locator('a[href="/manage-change-orders"]');

        this.changeOrderDropdown = page.locator('button.add-select-dropdown');
        this.changeOrderPageButton = page.getByRole('menuitem').filter({ hasText: 'Change Order' });
        this.changeOrderRequestPageButton = page.getByRole('menuitem').filter({ hasText: 'Change Order Request' });

        this.createChangeOrderButton = page.getByRole('button', { name: 'Create Change Order' });
        this.typeAChangeOrderNumber = page.getByPlaceholder('Type a Change Order number');

        this.typeAChangeOrderRequestNumber = page.getByPlaceholder('Type a Change Order Request number');
        this.briefDescriptionOfWhatIsBeingChangedTextbox =
            page.getByPlaceholder('Brief description of what is being changed');

        this.searchProjectsTextbox = page.getByPlaceholder('Search Project(s)', { exact: true });
        this.filterButton = page.locator('button:has(svg[data-icon="filter"])');
        this.createChangeOrderRequestButton = page.getByRole('button', { name: 'Create Change Order Request' });

        this.trelloButton = page.locator('button:has(svg[data-icon="trello"])');
        this.defaultViewCheckBox = page.getByLabel('Set as Default View');


    }



      async createNewChnageOrderRequestForDuplicateNumber() {
    await this.selectProject();
    await this.enterSubject();
    await this.typeAChangeOrderRequestNumber.fill(changeOrderData.newChangeOrderRequstNumber);

    // Open template dropdown
    const dropdown = this.page.locator('.ant-select-selector');
    await dropdown.click();

    // Search template
    const templateSearch = this.page.locator(
        'input.ant-select-selection-search-input'
    );

    await templateSearch.fill('Template - Bathroom Plumbing');

    await this.page.keyboard.press('Enter');
    // Click switch
    await this.page.getByRole('switch').click();
    await this.createChangeOrderRequestButton.click();
    await this.changeOrdercommanData.clickBackButton();
    await this.page.getByRole('button', { name: 'close-circle' }).click();
    await expect(
    this.page.locator('[role="gridcell"][col-id="project_name"]')
        .filter({ hasText: changeOrderData.projectName }).first()).toBeVisible();

}



   async createNewChnageOrderForNoRecordAvailbale() {
    await this.ClickOnTheClickHereLinkButton();
    await this.clickAddChangeOrderButton();

    await this.selectProject();
    await this.enterSubject();
    await this.typeAChangeOrderNumber.fill(changeOrderData.newChangeOrderNumber);

    // Open template dropdown
    const dropdown = this.page.locator('.ant-select-selector');
    await dropdown.click();

    // Search template
    const templateSearch = this.page.locator(
        'input.ant-select-selection-search-input'
    );

    await templateSearch.fill('Template - Bathroom Plumbing');

    await this.page.keyboard.press('Enter');
    // Click switch
    await this.page.getByRole('switch').click();
    await this.createChangeOrderButton.click();
    await this.changeOrdercommanData.clickBackButton();
    await this.page.getByRole('button', { name: 'close-circle' }).click();
    await expect(
    this.page.locator('[role="gridcell"][col-id="project_name"]')
        .filter({ hasText: changeOrderData.projectName }).first()).toBeVisible();

}







    async selectProject() {
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({ hasText: changeOrderData.projectName }).click();
    }

    async verifyChangeOrderSearch() {
    const searchBox = this.page.getByRole('searchbox', { name: 'Change Orders' });
    const coNumber = changeOrderData.projectName;
    await searchBox.fill(coNumber);
    await expect(this.page.getByRole('gridcell', {name: coNumber, exact: true}).first()).toBeVisible();

}


async ClickOnTheClickHereLinkButton(){

    const searchBox = this.page.getByRole('searchbox', { name: 'Change Orders' });
    await searchBox.fill('This is a randomly text');
    await this.page.mouse.wheel(0, -1000);
    await this.page.waitForTimeout(500);
    await expect(this.page.getByText('to Create a New Record')).toBeVisible();

    await this.page.locator('button').filter({ hasText: 'Click here' }).click();

}

async verifyRandomlyChangeOrderRequestSearch() {
    await this.ClickOnTheClickHereLinkButton();
    await this.page.getByRole('menu').getByText('Change Order Request', {exact: true}).click();
    await expect(this.page.getByRole('heading', { name: 'Add  Change Order Request' })).toBeVisible();

    await this.createNewChnageOrderRequestForDuplicateNumber();

}




async verifyRandomlyChangeOrderSearch() {
    await this.ClickOnTheClickHereLinkButton();
    await this.page.getByRole('menu').getByText('Change Order', {exact: true}).click();
    await expect(this.page.getByRole('heading', { name: 'Add Change Order' })).toBeVisible();

    await this.createNewChnageOrderForDuplicateNumber();

}



    async verifyProjectSelectionOption() {
        const moduleSettings = this.page.locator('#moduleSettings');
        await moduleSettings.waitFor({state: 'visible', timeout: 10000});
        await moduleSettings.scrollIntoViewIfNeeded();
        await expect(moduleSettings).toBeEnabled();
        await moduleSettings.click();
        const switchButton = this.page.getByRole('switch');

        if (await switchButton.isChecked()) {
            await this.page.locator('.md\\:relative > button.close-icon').click();
        } else {
            await switchButton.click();
            await this.page.getByRole('button', { name: 'Save' }).click();
        }

        await this.clickAddChangeOrderButton();
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.completedProjectName);
        await expect(this.page.getByText('No Records Available', { exact: true })).toBeVisible();

    }


    async verifyCustomTextAppliedManuallyPerItem() {
        await this.page.locator('#moduleSettings').click();
        const customTextRadio = this.page.getByRole('radio', { name: 'Custom Text (Applied Manually per Item)' });

        if (await customTextRadio.isChecked()) {
            await this.page.locator('.md\\:relative > button.close-icon').click();

        } else {
            await customTextRadio.check();
            await this.page.getByRole('button', { name: 'Save' }).click();
        }
    }

    async verifyStartAtNumberSetting() {
        await this.page.locator('#moduleSettings').click();
        const startAtNumber = this.page.getByRole('radio', { name: 'Start at Number' });

        if (await startAtNumber.isChecked()) {
            await this.page.locator('.md\\:relative > button.close-icon').click();
        } else {
            await startAtNumber.check();
            await this.page.getByRole('button', { name: 'Save' }).click();
        }


    }



    async startAtNumberSetting() {
        await this.page.locator('#moduleSettings').click();
        const startAtNumber = this.page.getByRole('radio', { name: 'Start at Number' });

        // Check current state
        if (await startAtNumber.isChecked()) {
            await this.page.locator('button.close-icon').click();
        } else {
            await startAtNumber.check();
            await this.page.getByRole('button', { name: 'Save' }).click();
        }
    }


    async removeProject(projectName) {
        const project = this.page.locator('.group\\/selectItems', { hasText: projectName });
        await project.hover();
        await project.locator('button.close-icon').click();
    }

    async verifySelectedProjectRemove() {
        await this.clickAddChangeOrderButton();
        await this.selectProject();
        const projectName = changeOrderData.projectName;
        await this.page.getByRole('button', { name: projectName }).click();
        await this.removeProject(projectName);
    }


    async verifyKanbanView() {
        await this.trelloButton.click();
        await this.defaultViewCheckBox.click();
        await this.page.keyboard.press('F5');
        await expect(this.page.getByRole('button', { description: 'Return to Dashboard', exact: true })).toBeVisible();
        await this.defaultViewCheckBox.click();
    }


    async clickFilterButton() {
        await this.filterButton.click();
        await this.page.getByText('Change Orders Filter', { exact: true });
        await this.page.locator('#date_range').click();
        await this.page.locator('.ant-picker-presets li').getByText('Today', { exact: true }).click();
        await this.page.locator('.flex.items-center.justify-between.\\!max-w-full').click();

        await this.page.getByPlaceholder('Search Projects plu', { exact: true }).fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({ hasText: changeOrderData.projectName }).click();
        await this.changeOrdercommanData.clickSaveButton();

        await this.page.locator('div.ant-select[name="billing_status"]').click();
        await this.page.keyboard.type('Proposed Change Order-ss (CO)');
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Escape');
        await this.page.getByRole('gridcell', { name: changeOrderData.changeOrderNumber });

    }


    async openChangeOrderPage() {
        await this.logo.click();
        await this.menuDropdown.nth(1).click();
        await this.changeOrdersMenu.click();
        await this.page.waitForURL('**/manage-change-orders');
    }

    async clickAddChangeOrderButton() {
        await this.changeOrderDropdown.click();
        await this.changeOrderPageButton.first().click();
        await expect(this.page.locator('h5', { hasText: 'Add Change Order' })).toBeVisible();
    }

    async openChnageOrderRequestPage() {
        await this.changeOrderDropdown.click();
        await this.changeOrderRequestPageButton.first().click();
        await expect(this.page.locator('h5', { hasText: 'Add Change Order Request' })).toBeVisible();
    }

    async createChnageOrderRequest() {
        await this.openChnageOrderRequestPage()
        await this.selectProject();
        await this.enterSubject();
        await this.typeAChangeOrderRequestNumber.fill(changeOrderData.changeOrderRequestNumber);

        // Open template dropdown
    const dropdown = this.page.locator('.ant-select-selector');
    await dropdown.click();

    // Search template
    const templateSearch = this.page.locator(
        'input.ant-select-selection-search-input'
    );

    await templateSearch.fill('Template - Bathroom Plumbing Request');

    await this.page.keyboard.press('Enter');
    // Click switch
    await this.page.getByRole('switch').click();


        await this.createChangeOrderRequestButton.click();
        await this.changeOrdercommanData.clickBackButton();
        await this.page.getByRole('gridcell', { name: changeOrderData.changeOrderRequestNumber });

    }


    async createChnageOrderRequestForMaxProjectLenght() {
        await this.openChnageOrderRequestPage()
        await this.selectProject();
        await this.briefDescriptionOfWhatIsBeingChangedTextbox.fill(changeOrderData.subjectMax);
        await this.typeAChangeOrderRequestNumber.fill(changeOrderData.changeOrderRequestNumber);
        await this.createChangeOrderRequestButton.click();
        await expect(this.page.locator('.ant-notification-notice-message')).toHaveText('Alert');



    }

    async verifyMandatoryForChangeOrderRequest() {
        await this.openChnageOrderRequestPage()
        await this.createChangeOrderRequestButton.click();
        await expect(this.page.getByText('This field is required.', { exact: true })).toHaveCount(3);
    }





    async newChangeOrderNumberForDuplicate() {
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({ hasText: changeOrderData.projectName }).click();
    }

    async enterSubject() {
        await this.briefDescriptionOfWhatIsBeingChangedTextbox.fill(changeOrderData.subject);
    }


    async createChnageOrder() {
    await this.selectProject();

    await this.enterSubject();

    await this.typeAChangeOrderNumber.fill(
        changeOrderData.changeOrderNumber
    );

    // Open template dropdown
    const dropdown = this.page.locator('.ant-select-selector');
    await dropdown.click();

    // Search template
    const templateSearch = this.page.locator(
        'input.ant-select-selection-search-input'
    );

    await templateSearch.fill('Template - Bathroom Plumbing');

    await this.page.keyboard.press('Enter');
    // Click switch
    await this.page.getByRole('switch').click();
    await this.createChangeOrderButton.click();


    await expect(this.page.getByRole('gridcell', {name: changeOrderData.changeOrderNumber})).toBeVisible();
}


    async verifyMandatoryData() {
        //await this.changeOrdercommanData.clickBackButton();
        await this.clickAddChangeOrderButton();
        await this.createChangeOrderButton.click();
        await expect(this.page.getByText('This field is required.', { exact: true })).toHaveCount(3);
    }




    async createChnageOrderForMaxProjectLenght() {
        await this.page.getByText('Click to select a Project(s)', { exact: true }).click();
        await this.searchProjectsTextbox.fill(changeOrderData.projectName);
        await this.page.locator('.project').filter({ hasText: changeOrderData.projectName }).click();
        await this.briefDescriptionOfWhatIsBeingChangedTextbox.fill(changeOrderData.subjectMax);
        await this.typeAChangeOrderNumber.fill(changeOrderData.changeOrderNumber);
        await this.createChangeOrderButton.click();
        await expect(this.page.locator('.ant-notification-notice-message')).toHaveText('Alert');
    }




}

module.exports = ChangeOrderPage;