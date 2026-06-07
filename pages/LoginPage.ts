import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly lostPasswordLink: Locator;
  private readonly goToAdvizerlyLink: Locator;
  private readonly loginError: Locator;
  private readonly loginForm: Locator;

  constructor(page: Page) {
    super(page, '/wp-login.php');
    this.usernameInput = page.getByLabel(/username or email address/i).or(page.locator('#user_login'));
    this.passwordInput = page.getByLabel(/^password$/i).or(page.locator('#user_pass'));
    this.submitButton = page.getByRole('button', { name: /log in/i }).or(page.locator('#wp-submit'));
    this.lostPasswordLink = page.getByRole('link', { name: /lost your password/i });
    this.goToAdvizerlyLink = page.getByRole('link', { name: /go to adviserly/i });
    this.loginError = page.locator('.login-error, #login_error');
    this.loginForm = page.locator('#loginform');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async clickLostPassword(): Promise<void> {
    await this.lostPasswordLink.click();
  }

  async clickGoToAdviserly(): Promise<void> {
    await this.goToAdvizerlyLink.click();
  }

  async getLoginErrorText(): Promise<string> {
    return this.loginError.innerText();
  }

  async expectOnLoginPage(): Promise<void> {
    await this.expectUrl(/wp-login\.php/);
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.loginForm).toBeVisible();
  }

  async expectUsernameInputVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
  }

  async expectPasswordInputVisible(): Promise<void> {
    await expect(this.passwordInput).toBeVisible();
  }

  async expectSubmitButtonVisible(): Promise<void> {
    await expect(this.submitButton).toBeVisible();
  }

  async expectLostPasswordLinkVisible(): Promise<void> {
    await expect(this.lostPasswordLink).toBeVisible();
  }

  async expectGoToAdvizerlyLinkVisible(): Promise<void> {
    await expect(this.goToAdvizerlyLink).toBeVisible();
  }

  async expectLoginErrorVisible(): Promise<void> {
    await expect(this.loginError).toBeVisible();
  }

  async expectLoginErrorContains(text: string): Promise<void> {
    await expect(this.loginError).toContainText(text);
  }

  async expectRedirectedAwayFromLogin(): Promise<void> {
    await expect(this.page).not.toHaveURL(/wp-login\.php/);
  }

  async expectOnLostPasswordPage(): Promise<void> {
    await this.expectUrl(/action=lostpassword/);
  }
}
