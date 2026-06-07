import { expect, Locator, Page } from '@playwright/test';

export class NavBar {
  private readonly navbar: Locator;
  readonly logo: Locator;
  private readonly pricingLink: Locator;

  constructor(page: Page) {
    this.navbar = page.locator('nav.navbar, .navbar');
    this.logo = page.locator('.navbar-brand');
    this.pricingLink = page.getByRole('link', { name: /pricing/i });
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async clickPricing(): Promise<void> {
    await this.pricingLink.click();
  }

  async expectNavBarVisible(): Promise<void> {
    await expect(this.navbar).toBeVisible();
  }

  async expectLogoVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async expectPricingLinkVisible(): Promise<void> {
    await expect(this.pricingLink).toBeVisible();
  }
}
