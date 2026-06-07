import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavBar } from './components/NavBar';
import { HERO_TEXT, PAGE_TITLES, STAT_LABELS, TESTIMONIAL_AUTHORS } from '../utils/constants';

export class HomePage extends BasePage {
  readonly navBar: NavBar;
  private readonly heroHeading: Locator;
  private readonly heroSubheading: Locator;
  private readonly testimonialCarousel: Locator;
  private readonly teamPluginsHeading: Locator;
  private readonly adviserProfilesHeading: Locator;
  private readonly teamSiteHeading: Locator;
  private readonly yourTeamEverywhereHeading: Locator;
  private readonly referralsSectionHeading: Locator;
  private readonly writeReviewsCounter: Locator;
  private readonly reshareContentCounter: Locator;
  private readonly referFriendsCounter: Locator;
  private readonly canonicalLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.navBar = new NavBar(page);
    this.heroHeading = page.getByRole('heading', { name: /create an express lane to sales/i });
    this.heroSubheading = page.getByText(HERO_TEXT.SUBHEADING);
    this.testimonialCarousel = page.locator('[data-flickity]');
    this.teamPluginsHeading = page.getByRole('heading', { name: 'Team Plugins' });
    this.adviserProfilesHeading = page.getByRole('heading', { name: 'Adviser Profiles' });
    this.teamSiteHeading = page.getByRole('heading', { name: 'Team Site' });
    this.yourTeamEverywhereHeading = page.getByRole('heading', { name: /your team.*everywhere/i });
    this.referralsSectionHeading = page.getByRole('heading', { name: /referrals.*reviews.*credibility/i });
    this.writeReviewsCounter = page.getByText(STAT_LABELS.WRITE_REVIEWS);
    this.reshareContentCounter = page.getByText(STAT_LABELS.RESHARE_CONTENT);
    this.referFriendsCounter = page.getByText(STAT_LABELS.REFER_FRIENDS);
    this.canonicalLink = page.locator('link[rel="canonical"]');
  }

  async expectHomePageTitle(): Promise<void> {
    await this.expectTitle(new RegExp(PAGE_TITLES.HOME, 'i'));
  }

  async expectHeroHeadingVisible(): Promise<void> {
    await expect(this.heroHeading).toBeVisible();
  }

  async expectHeroSubheadingVisible(): Promise<void> {
    await expect(this.heroSubheading).toBeVisible();
  }

  async expectHeroHeadingContainsExpressLane(): Promise<void> {
    await expect(this.heroHeading).toContainText(/express lane/i);
  }

  async expectTestimonialCarouselVisible(): Promise<void> {
    await expect(this.testimonialCarousel).toBeVisible();
  }

  async expectYourTeamEverywhereHeadingVisible(): Promise<void> {
    await expect(this.yourTeamEverywhereHeading).toBeVisible();
  }

  async expectReferralsSectionVisible(): Promise<void> {
    await expect(this.referralsSectionHeading).toBeVisible();
  }

  async expectTeamPluginsFeatureVisible(): Promise<void> {
    await expect(this.teamPluginsHeading).toBeVisible();
  }

  async expectAdviserProfilesFeatureVisible(): Promise<void> {
    await expect(this.adviserProfilesHeading).toBeVisible();
  }

  async expectTeamSiteFeatureVisible(): Promise<void> {
    await expect(this.teamSiteHeading).toBeVisible();
  }

  async expectWriteReviewsCounterVisible(): Promise<void> {
    await expect(this.writeReviewsCounter).toBeVisible();
  }

  async expectAllKeyFeaturesVisible(): Promise<void> {
    await this.expectTeamPluginsFeatureVisible();
    await this.expectAdviserProfilesFeatureVisible();
    await this.expectTeamSiteFeatureVisible();
  }

  async expectAllStatsVisible(): Promise<void> {
    await this.expectWriteReviewsCounterVisible();
    await expect(this.reshareContentCounter).toBeVisible();
    await expect(this.referFriendsCounter).toBeVisible();
  }

  async expectAllTestimonialAuthorsVisible(): Promise<void> {
    await expect(this.page.getByText(TESTIMONIAL_AUTHORS.TIM_WOODS.name)).toBeVisible();
    await expect(this.page.getByText(TESTIMONIAL_AUTHORS.MARIJA.name)).toBeVisible();
    await expect(this.page.getByText(TESTIMONIAL_AUTHORS.JEREMY_WOOD.name)).toBeVisible();
  }

  async expectCanonicalUrl(): Promise<void> {
    await expect(this.canonicalLink).toHaveAttribute('href', 'https://www.adviserly.com/');
  }

  async expectTitleNotEmpty(): Promise<void> {
    const title = await this.getTitle();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  }

  async expectTestimonialAuthorVisible(authorName: string): Promise<void> {
    await expect(this.page.getByText(authorName)).toBeVisible();
  }

  async expectOnHomePage(): Promise<void> {
    await this.expectUrl(/https:\/\/www\.adviserly\.com\/?$/);
  }
}
