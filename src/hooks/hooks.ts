import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({ pickle, result }) {
    const scenarioName = pickle.name;
    if (result?.status === Status.FAILED) {
        const img = await pageFixture.page.screenshot({
            path: `./test-result/screenshots/${scenarioName}.png`,
        });
        await this.attach(img, 'image/png');
    }
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});
