import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('user receives error for invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'invalid_user',
        'invalid_password'
    );

    await loginPage.expectLoginFailure();

});