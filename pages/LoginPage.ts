import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    // Locators
    private username = this.page.getByRole('textbox', { name: /username/i });
    private password = this.page.getByRole('textbox', { name: /password/i });
    private loginButton = this.page.getByRole('button', { name: /login/i });

    // New locator for failed login
    private errorMessage = this.page.locator('[data-test="error"]');

    // Actions
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    // Successful login validation
    async expectSuccessfulLogin() {
        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.page.locator('.inventory_list')).toBeVisible();
    }

    // Failed login validation
    async expectLoginFailure() {
        await expect(this.errorMessage).toBeVisible();
    }
}