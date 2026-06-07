# Adviserly — QA Agentic Solution

> Automated QA framework for [Adviserly](https://www.adviserly.com/) built with **Playwright + TypeScript**, following the **Page Object Model (POM)** design pattern and **OOP** principles.

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Enabled-8a2be2)](https://github.com/features/copilot)

---

## 🏢 About Adviserly

| Field | Details |
|-------|---------|
| **Company** | Adviserly |
| **Description** | Salesperson marketing pages for automotive dealerships |
| **Website** | [https://www.adviserly.com/](https://www.adviserly.com/) |
| **LinkedIn** | [View Profile](https://www.linkedin.com/company/adviserly/) |
| **City** | Mesa, AZ |
| **Founded** | 2015 |
| **Leaders** | Ted Carpenter (CEO), Thad Smith (CTO) |

---

## 🧪 Purpose

This repository contains a Playwright TypeScript end-to-end test automation framework for the **Adviserly** web application. It is structured as a **QA Agentic Solution**, meaning GitHub Copilot agents assist in writing, maintaining, and expanding test coverage.

### Test Coverage Goals

- [ ] Smoke tests — critical path validation
- [ ] Functional tests — feature-level verification
- [ ] Regression suite — prevent regressions across releases
- [ ] Accessibility checks — WCAG compliance
- [ ] Performance baselines — page load and interaction timing

---

## 🚀 Getting Started

### Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | 18.x |
| npm | 9.x |
| Playwright | 1.44+ |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/qa-bob/adviserly_QA_Agentic_Solution.git
cd adviserly_QA_Agentic_Solution

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install

# 4. Copy environment template and fill in values
cp .env.example .env
```

### Running Tests

```bash
# Run the full test suite (headless)
npx playwright test

# Run with Playwright UI (headed, interactive)
npx playwright test --ui

# Run a specific test file
npx playwright test tests/smoke/homepage.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium

# Run with debug mode
npx playwright test --debug

# View HTML test report
npx playwright show-report
```

---

## 📁 Project Structure

```
adviserly_QA_Agentic_Solution/
├── .github/
│   ├── copilot-instructions.md      # Repo-wide Copilot instructions
│   ├── instructions/                # Path-specific Copilot instructions
│   │   ├── playwright-tests.instructions.md
│   │   └── page-objects.instructions.md
│   └── README.md                    # .github folder guide
├── pages/                           # Page Object Models (POM)
│   ├── BasePage.ts                  # Abstract base class
│   ├── HomePage.ts
│   └── ...
├── tests/
│   ├── smoke/                       # Critical path tests
│   ├── functional/                  # Feature tests
│   └── regression/                  # Regression suite
├── fixtures/                        # Test data and Playwright fixtures
├── utils/                           # Shared helpers and utilities
├── AGENTS.md                        # GitHub Copilot agent instructions
├── Skills.md                        # Copilot skills reference
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json
└── README.md
```

---

## 🏗️ Architecture: Page Object Model (POM)

All page interactions are encapsulated in **Page Object classes** under `pages/`. Each page class:

- Extends `BasePage` (OOP inheritance)
- Declares **locators** as class properties
- Exposes **action methods** (e.g., `clickLogin()`, `fillSearchForm()`)
- Exposes **assertion helpers** (e.g., `expectHeaderVisible()`)
- Does **not** contain `expect()` calls in `test()` blocks directly

```typescript
// Example Page Object
export class HomePage extends BasePage {
  readonly searchInput = this.page.getByPlaceholder('Search dealers');

  async searchForDealer(name: string) {
    await this.searchInput.fill(name);
    await this.searchInput.press('Enter');
  }
}
```

Tests import and use page objects, keeping test files clean and readable.

---

## 📐 Contributor Rules

### Code Standards

1. **TypeScript only** — no `.js` files in `pages/`, `tests/`, or `utils/`
2. **POM strictly enforced** — all locators and interactions live in `pages/`
3. **OOP principles** — use inheritance, encapsulation, and composition
4. **No hardcoded URLs** — use `playwright.config.ts` `baseURL`
5. **No hardcoded credentials** — use `.env` + `process.env`
6. **Descriptive test names** — use full sentences: `'should display login form when unauthenticated'`
7. **One concern per test** — tests should validate a single behavior
8. **Use Playwright fixtures** (`fixtures/`) for shared setup/teardown

### Branching & Commits

- Branch naming: `feature/`, `fix/`, `chore/`, `test/`
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `test: add smoke test for homepage`, `fix: update selector for login button`
- PRs require at least one review before merging to `main`
- All CI checks must pass before merging

### Working with GitHub Copilot

- Read `AGENTS.md` before delegating tasks to Copilot agents
- Read `Skills.md` to understand available Copilot skills
- Copilot-generated code must still follow all POM and OOP rules above
- Review all AI-generated tests before merging — Copilot is a collaborator, not an approver

---

## 🤖 GitHub Copilot Setup

This repo is pre-configured for GitHub Copilot. See:

- [`AGENTS.md`](./AGENTS.md) — agent behavioral instructions
- [`Skills.md`](./Skills.md) — available Copilot skills
- [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) — repo-wide instructions
- [`.github/README.md`](./.github/README.md) — full guide to the `.github` folder

---

## 🏢 Company Profile

*Generated as part of the Phoenix Startup QA Agentic Solutions project.*
