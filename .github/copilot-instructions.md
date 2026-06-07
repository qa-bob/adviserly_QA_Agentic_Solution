# .github/copilot-instructions.md — Repository-Wide Copilot Instructions

> These instructions apply to **all** GitHub Copilot requests made in the context of this
> repository: Copilot Chat, Copilot cloud agent, Copilot code review, and inline suggestions.
>
> Docs: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions

---

## Repository Summary

This is a **Playwright + TypeScript** end-to-end QA automation framework for
[Adviserly](https://www.adviserly.com/) — a platform that creates marketing pages for automotive
dealership salespersons. Tests are structured using the **Page Object Model (POM)** pattern and
**OOP** principles. The project targets the live web application at `https://www.adviserly.com/`.

**Runtime:** Node.js 18+ | **Language:** TypeScript 5+ | **Framework:** Playwright 1.44+

---

## Architecture Rules

- All page interactions (locators, clicks, fills, navigations) MUST be in `pages/` classes.
- Every page class extends `BasePage` (`pages/BasePage.ts`).
- Tests in `tests/` import page objects from `pages/` and use Playwright fixtures from `fixtures/`.
- Utilities (reusable logic, constants, custom matchers) live in `utils/`.
- Locators use Playwright's recommended methods: `getByRole`, `getByLabel`, `getByTestId`,
  `getByPlaceholder`, `getByText` — in that priority order. Avoid CSS/XPath unless necessary.

---

## Code Style

- TypeScript strict mode is ON — no `any`, no `@ts-ignore` without explanation.
- All public methods on page objects have explicit return types.
- Test names are full descriptive sentences: `'should show error when password is blank'`.
- No `page.waitForTimeout()` — use Playwright auto-waiting, `waitFor`, or `expect().toBeVisible()`.
- No hardcoded base URLs — use `baseURL` from `playwright.config.ts`.
- No hardcoded credentials — use `process.env.TEST_EMAIL`, `process.env.TEST_PASSWORD`, etc.

---

## Bootstrap Commands

```bash
npm install                          # Always run first in a fresh environment
npx playwright install               # Install browsers (run once per environment)
npx tsc --noEmit                     # Type-check
npx playwright test                  # Run full test suite
npx playwright show-report           # View HTML report after a run
```

---

## Key File Locations

| File/Dir | Purpose |
|----------|---------|
| `pages/BasePage.ts` | Abstract base page class — all page objects extend this |
| `pages/*.ts` | Individual page object classes |
| `tests/smoke/` | Smoke tests — fast, critical path |
| `tests/functional/` | Feature-level functional tests |
| `tests/regression/` | Full regression suite |
| `fixtures/` | Playwright fixtures for shared setup |
| `utils/` | Helpers, constants, custom assertions |
| `playwright.config.ts` | Browser config, baseURL, timeouts, reporter |
| `tsconfig.json` | TypeScript configuration |
| `.env` | Environment variables (not committed — see `.env.example`) |
| `.github/instructions/` | Path-specific Copilot instructions |
| `AGENTS.md` | Full agent behavioral instructions |

---

## What Copilot Should Always Do

1. Follow POM — put page interactions in `pages/`, not in test files.
2. Follow OOP — use inheritance, encapsulation, typed interfaces.
3. Use TypeScript — typed, strict, no shortcuts.
4. Use Playwright best practices — role-based locators, auto-waiting, fixture-based setup.
5. Read `AGENTS.md` at the repo root for the complete behavioral specification before making
   structural changes or scaffolding new files.

## What Copilot Must Never Do

- Place raw `page.*` calls in `tests/` files (only via page objects).
- Use `waitForTimeout` for test synchronization.
- Hardcode environment-specific values (URLs, credentials, IDs).
- Disable TypeScript strict mode or add `any` without justification.
- Commit secrets or `.env` files.
