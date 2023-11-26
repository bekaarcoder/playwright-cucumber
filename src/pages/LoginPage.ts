import { Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator(
            "//input[@formcontrolname='username']"
        );
        this.passwordInput = page.locator(
            "//input[@formcontrolname='password']"
        );
        this.loginBtn = page.locator(
            "//button[@color='primary']//span[text()='Login']"
        );
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async login() {
        await this.loginBtn.click();
    }
}
