import { test, expect } from '../../fixtures';

test.describe('Pricing Page Regression Suite', () => {
  test.beforeEach(async ({ pricingPage }) => {
    await pricingPage.goto();
  });

  test('should load the pricing page at the correct URL', async ({ pricingPage }) => {
    await pricingPage.expectOnPricingPage();
  });

  test('should display a non-empty page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should display the Adviserly logo in the navigation', async ({ pricingPage }) => {
    await pricingPage.navBar.expectLogoVisible();
  });

  test('should display the navigation bar', async ({ pricingPage }) => {
    await pricingPage.navBar.expectNavBarVisible();
  });

  test('should display the pricing link in the navigation', async ({ pricingPage }) => {
    await pricingPage.navBar.expectPricingLinkVisible();
  });

  test('should display enterprise-related content', async ({ pricingPage }) => {
    await pricingPage.expectEnterpriseContentVisible();
  });

  test('should display enterprise grade administrative control copy', async ({ pricingPage }) => {
    await pricingPage.expectAdminControlTextVisible();
  });

  test('should navigate to the homepage from the pricing page via the logo', async ({ pricingPage, homePage }) => {
    await pricingPage.navBar.clickLogo();
    await homePage.expectOnHomePage();
  });
});
