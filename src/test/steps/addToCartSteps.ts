import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

When('User search for {string} book', async function (keyword) {
    await pageFixture.page.locator("input[type='search']").fill(keyword);
    await pageFixture.page
        .locator(
            `//span[@class='mat-option-text'][contains(text(), '${keyword}')]`
        )
        .click();
});

When('User click on Add to cart button', async function () {
    await pageFixture.page
        .locator("//span[contains(text(), 'Add to Cart')]")
        .click();
    await pageFixture.page.waitForTimeout(2000);
});

Then('Cart badge should get updated', async function () {
    const count = await pageFixture.page
        .locator('#mat-badge-content-0')
        .textContent();
    expect(Number(count)).toBeGreaterThan(100);
    pageFixture.logger.info(`Actual count is ${count}`);
});
