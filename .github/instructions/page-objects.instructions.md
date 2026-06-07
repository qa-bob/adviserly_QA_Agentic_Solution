---
applyTo: "pages/**/*.ts"
---

# Page Object Model Instructions

These instructions apply to all files under `pages/`.

## Page Object Rules

- Every page class MUST extend `BasePage` (import from `./BasePage`).
- Class names follow the pattern `[PageName]Page` — e.g., `HomePage`, `LoginPage`, `DealerProfilePage`.
- Locators are declared as `readonly` class properties at the top of the class.
- Use Playwright's semantic locators in this priority order:
  1. `getByRole()`
  2. `getByLabel()`
  3. `getByTestId()`
  4. `getByPlaceholder()`
  5. `getByText()`
  6. `locator()` with CSS — only as a last resort
- **Do NOT use XPath** unless absolutely unavoidable (and explain why in a comment).
- Locators should be `private` or `protected` unless they need to be accessed externally.
- Public methods should be the only API surface exposed to test files.
- All public methods have explicit TypeScript return types.
- `async` methods return `Promise<void>` (actions) or `Promise<SomeType>` (queries).
- Include a `goto()` method that navigates to the page's URL using `this.page.goto(this.url)`.

## Assertion Helpers

- Assertion methods are prefixed with `expect` — e.g., `expectHeaderVisible()`.
- Assertion methods use Playwright's `expect` API internally.
- Assertion methods return `Promise<void>`.

## Component Composition

- Shared UI components (e.g., NavBar, Footer, Modal) can be modeled as separate classes.
- Compose components as properties of the page class: `readonly navBar = new NavBar(this.page)`.

## Example Page Object

```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator = this.page.getByLabel('Email');
  readonly passwordInput: Locator = this.page.getByLabel('Password');
  private readonly submitButton: Locator = this.page.getByRole('button', { name: 'Sign in' });
  private readonly errorMessage: Locator = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page, '/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectErrorVisible(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
```
