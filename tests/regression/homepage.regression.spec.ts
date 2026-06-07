import { test } from '../../fixtures';

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
    await homePage.expectTestimonialAuthorVisible('Tim Woods');
  });

  test('should display the 92% Write Reviews statistic', async ({ homePage }) => {
    await homePage.expectWriteReviewsCounterVisible();
  });
});
