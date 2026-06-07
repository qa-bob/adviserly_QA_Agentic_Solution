export const BASE_URL = 'https://www.adviserly.com';

export const URLS = {
  HOME: '/',
  LOGIN: '/wp-login.php',
  PRICING: '/pricing/',
  LOST_PASSWORD: '/wp-login.php?action=lostpassword',
} as const;

export const PAGE_TITLES = {
  HOME: 'Create an express lane to sales',
  LOGIN: 'Log In',
  PRICING: 'Pricing',
} as const;

export const TIMEOUTS = {
  SHORT: 5_000,
  MEDIUM: 15_000,
  LONG: 30_000,
} as const;

export const TESTIMONIAL_AUTHORS = {
  TIM_WOODS: { name: 'Tim Woods', role: 'Leadership Team Member' },
  MARIJA: { name: 'Marija Cvetkovska', role: 'Digital Marketing Manager' },
  JEREMY_WOOD: { name: 'Jeremy Wood', role: 'Technology Manager' },
} as const;

export const FEATURE_NAMES = {
  TEAM_PLUGINS: 'Team Plugins',
  ADVISER_PROFILES: 'Adviser Profiles',
  TEAM_SITE: 'Team Site',
} as const;

export const STAT_LABELS = {
  WRITE_REVIEWS: 'Write Reviews',
  RESHARE_CONTENT: 'Re-share Content',
  REFER_FRIENDS: 'Refer Friends',
} as const;

export const HERO_TEXT = {
  HEADING: 'Create an express lane to sales',
  SUBHEADING: 'Help your prospective customers engage with your sales team as fast as possible',
} as const;
