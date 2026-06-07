import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavBar } from './components/NavBar';

export class PricingPage extends BasePage {
  readonly navBar: NavBar;
  private readonly pageContent: Locator;
  private readonly enterpriseAdminText: Locator;
  private readonly adminControlText: Locator;

  constructor(page: Page) {
    super(page, '/pricing/');
    this.navBar = new NavBar(page);
    this.pageContent = page.locator('main, .elementor, body');
    this.enterpriseAdminText = page.getByText(/enterprise/i);
    this.adminControlText = page.getByText(/enterprise grade administrative control/i);
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.pageContent).toBeVisible();
  }

  async expectEnterpriseContentVisible(): Promise<void> {
    await expect(this.enterpriseAdminText).toBeVisible();
  }

  async expectAdminControlTextVisible(): Promise<void> {
    await expect(this.adminControlText).toBeVisible();
  }

  async expectOnPricingPage(): Promise<void> {
    await this.expectUrl(/pricing/);
  }
}
