import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
import { readFileSync } from 'fs';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
        recordVideo: {
            dir: 'test-results/videos',
        },
    });
    page = await context.newPage();
    pageFixture.page = page;
    pageFixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    const scenarioName = pickle.name;
    if (result?.status === Status.FAILED) {
        img = await pageFixture.page.screenshot({
            path: `./test-results/screenshots/${scenarioName}.png`,
        });
        videoPath = await pageFixture.page.video().path();
        await this.attach(img, 'image/png');
    }
    await pageFixture.page.close();
    await context.close();
    if (result?.status === Status.FAILED) {
        await this.attach(readFileSync(videoPath), 'video/webm');
    }
});

AfterAll(async function () {
    await browser.close();
    // pageFixture.logger.close();
});
