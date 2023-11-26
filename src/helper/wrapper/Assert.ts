import { Page, expect } from '@playwright/test';

export default class Assert {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assertTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(url: string) {
        const pageURL = this.page.url();
        expect(pageURL).toContain(url);
    }
}
