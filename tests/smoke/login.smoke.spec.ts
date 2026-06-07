import { test } from '../../fixtures';

test.describe('Login Page Smoke Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should load the WordPress login page', async ({ loginPage }) => {
    await loginPage.expectOnLoginPage();
  });

  test('should display the login form', async ({ loginPage }) => {
    await loginPage.expectLoginFormVisible();
  });

  test('should display a "Lost your password?" link', async ({ loginPage }) => {
    await loginPage.expectLostPasswordLinkVisible();
  });
});
