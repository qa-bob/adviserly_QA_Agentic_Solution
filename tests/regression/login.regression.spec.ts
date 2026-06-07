import { test, expect } from '../../fixtures';

test.describe('Login Page Regression Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should load the login page at the correct URL', async ({ loginPage }) => {
    await loginPage.expectOnLoginPage();
  });

  test('should display a non-empty page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should display the username input field', async ({ loginPage }) => {
    await loginPage.expectUsernameInputVisible();
  });

  test('should display the password input field', async ({ loginPage }) => {
    await loginPage.expectPasswordInputVisible();
  });

  test('should display the submit button', async ({ loginPage }) => {
    await loginPage.expectSubmitButtonVisible();
  });

  test('should display the "Lost your password?" link', async ({ loginPage }) => {
    await loginPage.expectLostPasswordLinkVisible();
  });

  test('should display a link back to the Adviserly site', async ({ loginPage }) => {
    await loginPage.expectGoToAdvizerlyLinkVisible();
  });

  test('should show the lost password page at the expected URL', async ({ loginPage }) => {
    await loginPage.clickLostPassword();
    await loginPage.expectOnLostPasswordPage();
  });

  test('should remain on the login page after navigating back from lost password', async ({ loginPage }) => {
    await loginPage.clickLostPassword();
    await loginPage.expectOnLostPasswordPage();
    await loginPage.goto();
    await loginPage.expectOnLoginPage();
  });
});
