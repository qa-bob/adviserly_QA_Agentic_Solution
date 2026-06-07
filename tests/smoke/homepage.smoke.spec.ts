import { test } from '../../fixtures';

test.describe('Homepage Smoke Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load the homepage with the correct title', async ({ homePage }) => {
    await homePage.expectHomePageTitle();
  });

  test('should display the navigation bar', async ({ homePage }) => {
    await homePage.navBar.expectNavBarVisible();
  });

  test('should display the Adviserly logo', async ({ homePage }) => {
    await homePage.navBar.expectLogoVisible();
  });

  test('should display the hero heading', async ({ homePage }) => {
    await homePage.expectHeroHeadingVisible();
  });

  test('should display the hero subheading', async ({ homePage }) => {
    await homePage.expectHeroSubheadingVisible();
  });

  test('should display the testimonial carousel', async ({ homePage }) => {
    await homePage.expectTestimonialCarouselVisible();
  });

  test('should display the "Your team, everywhere" section heading', async ({ homePage }) => {
    await homePage.expectYourTeamEverywhereHeadingVisible();
  });
});
