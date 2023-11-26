import { Given, Then, When } from '@cucumber/cucumber';
import { Browser, Page, expect } from '@playwright/test';
import { pageFixture } from './../../hooks/pageFixture';
import { LoginPage } from '../../pages/LoginPage';

let loginPage: LoginPage;

Given('User navigates to the application', async function () {
    loginPage = new LoginPage(pageFixture.page);
    await pageFixture.page.goto(process.env.BASEURL);
    pageFixture.logger.info('Navigated to Application');
});

When('User click on the login link', async function () {
    await pageFixture.page.locator("//button//span[text()='Login']").click();
});

When('User enters the username as {string}', async function (username) {
    // await pageFixture.page
    //     .locator("//input[@formcontrolname='username']")
    //     .fill(username);
    await loginPage.enterUsername(username);
    this.username = username;
});

When('User enters the password as {string}', async function (password) {
    // await pageFixture.page
    //     .locator("//input[@formcontrolname='password']")
    //     .fill(password);
    await loginPage.enterPassword(password);
});

When('User clicks on the login button', async function () {
    // await pageFixture.page
    //     .locator("//button[@color='primary']//span[text()='Login']")
    //     .click();
    await loginPage.login();
});

Then('User is logged in successfully', async function () {
    await expect(
        pageFixture.page.locator("//button//span[contains(text(), 'janedoee')]")
    ).toBeVisible();
    console.log('User is logged in as: ', this.username);
    pageFixture.logger.info('User logged in');
});

Then('Login should fail', async function () {
    await expect(
        pageFixture.page.locator("//mat-error[@role='alert']")
    ).toHaveText('Username or Password is incorrect.');
});
