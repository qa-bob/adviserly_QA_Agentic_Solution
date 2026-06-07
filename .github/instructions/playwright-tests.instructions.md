---
applyTo: "tests/**/*.spec.ts,tests/**/*.test.ts"
---

# Playwright Test File Instructions

These instructions apply to all Playwright test files (`*.spec.ts`, `*.test.ts`) under `tests/`.

## Test File Rules

- Import page objects from `../../pages/` — never use `page.*` directly in test files.
- Import fixtures from `../../fixtures/` for shared setup and page object instantiation.
- Each `test()` block validates exactly ONE behavior or user flow.
- Test names must be descriptive full sentences in the present tense:
  `'should display the homepage hero section'`
  `'should show validation error when email field is empty'`
- Group related tests in `test.describe()` blocks named after the feature or page.
- Use `test.beforeEach` / `test.afterEach` sparingly — prefer fixtures.
- Do NOT use `page.waitForTimeout()`. Use `await expect(locator).toBeVisible()` or other
  Playwright auto-waiting APIs.
- Sensitive data (passwords, tokens) must come from `process.env`, never hardcoded.
- The `baseURL` is set in `playwright.config.ts` — do not hardcode `https://www.adviserly.com/`.

## Preferred Assertions

```typescript
await expect(page).toHaveTitle(/Adviserly/);
await expect(locator).toBeVisible();
await expect(locator).toHaveText('expected text');
await expect(locator).toBeEnabled();
await expect(page).toHaveURL(/\/dashboard/);
```

## Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { homePageFixture } from '../../fixtures/homePageFixture';

test.describe('Homepage', () => {
  test('should display the navigation bar', async ({ homePage }) => {
    await homePage.goto();
    await homePage.expectNavBarVisible();
  });
});
```
