import { test, expect } from '../../fixtures';
import { TESTIMONIAL_AUTHORS } from '../../utils/constants';

test.describe('Homepage Regression Suite', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should have a canonical URL pointing to the root domain', async ({ homePage }) => {
    await homePage.expectCanonicalUrl();
  });

  test('should display a page title that is not empty', async ({ homePage }) => {
    await homePage.expectTitleNotEmpty();
  });

  test('should have the Adviserly logo visible in the navigation', async ({ homePage }) => {
    await homePage.navBar.expectLogoVisible();
  });

  test('should display the hero heading containing "express lane"', async ({ homePage }) => {
    await homePage.expectHeroHeadingContainsExpressLane();
  });

  test('should display Tim Woods as a testimonial author', async ({ homePage }) => {
    await homePage.expectTestimonialAuthorVisible(TESTIMONIAL_AUTHORS.TIM_WOODS.name);
  });

  test('should display Marija Cvetkovska as a testimonial author', async ({ homePage }) => {
    await homePage.expectTestimonialAuthorVisible(TESTIMONIAL_AUTHORS.MARIJA.name);
  });

  test('should display Jeremy Wood as a testimonial author', async ({ homePage }) => {
    await homePage.expectTestimonialAuthorVisible(TESTIMONIAL_AUTHORS.JEREMY_WOOD.name);
  });

  test('should display the Write Reviews engagement statistic', async ({ homePage }) => {
    await homePage.expectWriteReviewsCounterVisible();
  });

  test('should display the Re-share Content engagement statistic', async ({ page }) => {
    await expect(page.getByText('Re-share Content')).toBeVisible();
  });

  test('should display the Refer Friends engagement statistic', async ({ page }) => {
    await expect(page.getByText('Refer Friends')).toBeVisible();
  });

  test('should display the referrals, reviews, and credibility section', async ({ homePage }) => {
    await homePage.expectReferralsSectionVisible();
  });
});
