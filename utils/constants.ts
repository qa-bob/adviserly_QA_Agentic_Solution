export const BASE_URL = 'https://www.adviserly.com';

export const URLS = {
  HOME: '/',
  LOGIN: '/wp-login.php',
  PRICING: '/pricing/',
} as const;

export const PAGE_TITLES = {
  HOME: 'Create an express lane to sales',
} as const;

export const TIMEOUTS = {
  SHORT: 5_000,
  MEDIUM: 15_000,
  LONG: 30_000,
} as const;
