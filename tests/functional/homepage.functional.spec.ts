import { test } from '../../fixtures';

test.describe('Homepage Functional Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should display all three key features (Team Plugins, Adviser Profiles, Team Site)', async ({ homePage }) => {
    await homePage.expectAllKeyFeaturesVisible();
  });

  test('should display all three engagement stat counters', async ({ homePage }) => {
    await homePage.expectAllStatsVisible();
  });

  test('should display all three testimonial authors', async ({ homePage }) => {
    await homePage.expectAllTestimonialAuthorsVisible();
  });

  test('should display the referrals, reviews and credibility section', async ({ homePage }) => {
    await homePage.expectReferralsSectionVisible();
  });

  test('should display the "Your team, everywhere" section', async ({ homePage }) => {
    await homePage.expectYourTeamEverywhereHeadingVisible();
  });

  test('should navigate to the pricing page when pricing link is clicked', async ({ homePage, pricingPage }) => {
    await homePage.navBar.clickPricing();
    await pricingPage.expectOnPricingPage();
  });

  test('should navigate back to homepage when logo is clicked from another page', async ({ homePage, pricingPage }) => {
    await homePage.navBar.clickPricing();
    await pricingPage.expectOnPricingPage();
    await pricingPage.navBar.clickLogo();
    await homePage.expectOnHomePage();
  });
});
