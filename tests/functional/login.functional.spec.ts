import { test } from '../../fixtures';

test.describe('Login Page Functional Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should show an error when submitting with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user_test', 'wrong_password_test');
    await loginPage.expectLoginErrorVisible();
  });

  test('should show an error that contains a descriptive message for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user_test', 'wrong_password_test');
    await loginPage.expectLoginErrorContains('incorrect');
  });

  test('should show a validation error when username is empty', async ({ loginPage }) => {
    await loginPage.fillPassword('some_password');
    await loginPage.clickSubmit();
    await loginPage.expectLoginErrorVisible();
  });

  test('should show a validation error when both username and password are empty', async ({ loginPage }) => {
    await loginPage.clickSubmit();
    await loginPage.expectLoginErrorVisible();
  });

  test('should navigate to the lost password page when "Lost your password?" is clicked', async ({ loginPage }) => {
    await loginPage.clickLostPassword();
    await loginPage.expectOnLostPasswordPage();
  });

  test('should navigate to the Adviserly homepage when "Go to Adviserly" is clicked', async ({ loginPage, homePage }) => {
    await loginPage.clickGoToAdviserly();
    await homePage.expectOnHomePage();
  });
});
