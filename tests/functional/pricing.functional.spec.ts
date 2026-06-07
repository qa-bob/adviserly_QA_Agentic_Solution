import { test } from '../../fixtures';

test.describe('Pricing Page Functional Tests', () => {
  test.beforeEach(async ({ pricingPage }) => {
    await pricingPage.goto();
  });

  test('should display enterprise grade administrative control content', async ({ pricingPage }) => {
    await pricingPage.expectAdminControlTextVisible();
  });

  test('should display enterprise-related content on the pricing page', async ({ pricingPage }) => {
    await pricingPage.expectEnterpriseContentVisible();
  });

  test('should display the pricing link in the navigation bar', async ({ pricingPage }) => {
    await pricingPage.navBar.expectPricingLinkVisible();
  });

  test('should navigate back to the homepage when the logo is clicked', async ({ pricingPage, homePage }) => {
    await pricingPage.navBar.clickLogo();
    await homePage.expectOnHomePage();
  });
});
