import { Page } from '@playwright/test';

export class AbstractPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({ state: 'visible' });
        await element.click();
    }
}
