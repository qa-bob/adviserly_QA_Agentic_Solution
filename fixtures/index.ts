import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { PricingPage } from '../pages/PricingPage';

type AdviserlyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  pricingPage: PricingPage;
};

export const test = base.extend<AdviserlyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  pricingPage: async ({ page }, use) => {
    const pricingPage = new PricingPage(page);
    await use(pricingPage);
  },
});

export { expect } from '@playwright/test';
