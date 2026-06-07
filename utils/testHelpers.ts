import { expect, Page } from '@playwright/test';

/**
 * Asserts that the page has loaded by checking readyState.
 */
export async function assertPageLoaded(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Checks if an element is in the viewport.
 */
export async function assertElementInViewport(page: Page, selector: string): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toBeInViewport();
}

/**
 * Reads an environment variable with a fallback, throwing if required and missing.
 */
export function getEnvVar(name: string, required: boolean = false): string {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Required environment variable "${name}" is not set. See .env.example.`);
  }
  return value ?? '';
}
