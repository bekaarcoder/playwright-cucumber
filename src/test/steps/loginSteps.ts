import { Given, Then, When } from '@cucumber/cucumber';
import { Browser, Page, expect } from '@playwright/test';
import { pageFixture } from './../../hooks/pageFixture';

Given('User navigates to the application', async function () {
    await pageFixture.page.goto(process.env.BASEURL);
    pageFixture.logger.info('Navigated to Application');
});

When('User click on the login link', async function () {
    await pageFixture.page.locator("//button//span[text()='Login']").click();
});

When('User enters the username as {string}', async function (username) {
    await pageFixture.page
        .locator("//input[@formcontrolname='username']")
        .fill(username);
});

When('User enters the password as {string}', async function (password) {
    await pageFixture.page
        .locator("//input[@formcontrolname='password']")
        .fill(password);
});

When('User clicks on the login button', async function () {
    await pageFixture.page
        .locator("//button[@color='primary']//span[text()='Login']")
        .click();
});

Then('User is logged in successfully', async function () {
    await expect(
        pageFixture.page.locator("//button//span[contains(text(), 'janedoee')]")
    ).toBeVisible();
    pageFixture.logger.info('User logged in');
});

Then('Login should fail', async function () {
    await expect(
        pageFixture.page.locator("//mat-error[@role='alert']")
    ).toHaveText('Username or Password is incorrect.');
});
