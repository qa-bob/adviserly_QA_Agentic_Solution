# AGENTS.md — GitHub Copilot Agent Instructions

> This file provides behavioral instructions for GitHub Copilot agents (cloud agent, coding agent,
> and any AI agent that reads `AGENTS.md`). Instructions here take precedence over general Copilot
> behavior when working in this repository.
>
> Reference: https://github.com/agentsmd/agents.md

---

## Repository Overview

This repo is a **Playwright + TypeScript** end-to-end QA automation framework for
[Adviserly](https://www.adviserly.com/), a salesperson marketing page platform for automotive
dealerships. Tests follow the **Page Object Model (POM)** design pattern and **OOP** principles.

**Stack:** Node.js 18+, TypeScript 5+, Playwright 1.44+, GitHub Actions CI

---

## Project Layout (Quick Reference)

```
pages/                  ← Page Object Model classes (BasePage + page-specific)
tests/
  smoke/                ← Critical path tests
  functional/           ← Feature-level tests
  regression/           ← Full regression suite
fixtures/               ← Playwright fixtures and shared test data
utils/                  ← Helper functions, constants, custom assertions
.github/
  copilot-instructions.md
  instructions/         ← Path-specific Copilot instructions
playwright.config.ts    ← Playwright config (browsers, baseURL, timeouts)
tsconfig.json           ← TypeScript config
package.json
```

---

## Mandatory Rules for All Agents

### Architecture — Page Object Model (POM)

1. **All page interactions MUST live in `pages/`** — never put locators or `page.*` calls inside test files directly.
2. **Every page class MUST extend `BasePage`** located at `pages/BasePage.ts`.
3. **Locators are class properties** declared using `this.page.getByRole(...)`, `this.page.locator(...)`, etc.
4. **Action methods** encapsulate multi-step interactions (e.g., `fillAndSubmitLoginForm()`).
5. **Assertion helpers** can live in page objects but must use Playwright's `expect` API.

### OOP Principles

- Use **inheritance**: specialized pages extend `BasePage` or a relevant parent (e.g., `FormPage`).
- Use **encapsulation**: page internals (raw locators) are `private` or `protected`; only expose public methods.
- Use **composition** where a page contains reusable components (e.g., `NavBar`, `Footer`) as injected class instances.

### TypeScript

- **All files must be `.ts`** — no `.js` files in `pages/`, `tests/`, or `utils/`.
- Enable strict mode — do not disable `strict` in `tsconfig.json`.
- Use explicit return types on all public methods.
- No `any` — use proper types or generics.

### Tests

- One concern per `test()` block.
- Descriptive names in sentence form: `'should redirect to login when session expires'`.
- Use **Playwright fixtures** from `fixtures/` for page object setup and shared state.
- Never use `page.waitForTimeout()` — use proper Playwright auto-waiting (locators, `waitFor`, network).
- No hardcoded credentials or PII — read from `process.env` variables defined in `.env`.
- No hardcoded base URL — use `baseURL` from `playwright.config.ts`.

### Environment & Configuration

- Always run `npm install` before any build or test step.
- Always run `npx playwright install` before running tests in a fresh environment.
- Use `npx playwright test` to run the full suite.
- Use `npx playwright test --project=chromium` to target a single browser.
- Secrets live in `.env` (not committed). Check for `.env.example` for required keys.

---

## Build & Validation Commands

```bash
# Install dependencies
npm install

# Install Playwright browsers (required in fresh environments)
npx playwright install

# Type-check without running tests
npx tsc --noEmit

# Run all tests (headless)
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run a specific test file
npx playwright test tests/smoke/homepage.spec.ts

# Open HTML report after a run
npx playwright show-report

# Debug a specific test
npx playwright test tests/smoke/homepage.spec.ts --debug
```

---

## What Agents Should Do

- **When creating a new page**: add a class in `pages/` extending `BasePage`. Export it. Add a
  corresponding fixture entry in `fixtures/` if needed.
- **When creating a new test**: import the relevant page object(s), use the fixture, write one
  concern per `test()`.
- **When fixing a failing test**: check if a locator has changed by inspecting the live site
  (`https://www.adviserly.com/`). Update the locator in the page object, not the test.
- **When adding a utility**: place it in `utils/` and export it. Document parameters with JSDoc.
- **Before opening a PR**: run `npx tsc --noEmit` and `npx playwright test` to confirm no
  TypeScript errors and no test failures.

## What Agents Must NOT Do

- ❌ Do not place locators or `page.*` calls directly in test files.
- ❌ Do not hardcode URLs, credentials, or environment-specific values.
- ❌ Do not use `page.waitForTimeout()` for synchronization.
- ❌ Do not disable TypeScript strict mode or use `// @ts-ignore` without a comment explaining why.
- ❌ Do not commit `.env` files.
- ❌ Do not modify `playwright.config.ts` global timeouts without discussion.

---

## CI / GitHub Actions

The CI pipeline (`.github/workflows/`) runs:
1. `npm install`
2. `npx playwright install --with-deps`
3. `npx tsc --noEmit`
4. `npx playwright test`

All checks must pass before any PR can be merged to `main`.

---

## Hooks

Copilot automation hooks can be configured in `.github/copilot-setup-steps.yml` to pre-install
dependencies and browsers in the cloud agent's ephemeral environment. See
[Copilot Setup Steps docs](https://docs.github.com/en/copilot/how-tos/agents/copilot-coding-agent/customizing-the-development-environment-for-copilot-coding-agent).

Example hook that agents should assume is in place:

```yaml
# .github/copilot-setup-steps.yml
steps:
  - name: Install Node dependencies
    run: npm install
  - name: Install Playwright browsers
    run: npx playwright install --with-deps chromium
```
