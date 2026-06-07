import { test } from '../../fixtures';

test.describe('Pricing Page Smoke Tests', () => {
  test.beforeEach(async ({ pricingPage }) => {
    await pricingPage.goto();
  });

  test('should load the pricing page at the correct URL', async ({ pricingPage }) => {
    await pricingPage.expectOnPricingPage();
  });

  test('should display the navigation bar', async ({ pricingPage }) => {
    await pricingPage.navBar.expectNavBarVisible();
  });

  test('should display the Adviserly logo', async ({ pricingPage }) => {
    await pricingPage.navBar.expectLogoVisible();
  });

  test('should display visible page content', async ({ pricingPage }) => {
    await pricingPage.expectPageLoaded();
  });
});
