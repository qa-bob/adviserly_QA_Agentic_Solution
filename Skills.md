# Skills.md — GitHub Copilot Skills Reference

> This file documents the **Copilot skills** available for contributors and agents working in this
> repository. Skills extend Copilot's capabilities with specialized tools and integrations.
>
> Skills are accessed via `/skills` in the Copilot CLI or through Copilot Chat in VS Code / GitHub.

---

## What Are Copilot Skills?

Copilot **skills** are specialized capabilities — either built-in to GitHub Copilot or provided
by Copilot Extensions — that allow Copilot to perform tasks beyond standard chat and code
completion. In this repository, skills are especially useful for:

- Generating Playwright tests from natural language descriptions
- Scaffolding new Page Object Model classes
- Querying live documentation or API references
- Running CI checks and interpreting results

---

## Built-In Skills (Always Available)

| Skill | Trigger | Description |
|-------|---------|-------------|
| **Code generation** | Natural language prompt | Generate TypeScript, Playwright tests, or POM classes |
| **Code explanation** | `Explain this code` | Break down complex Playwright selectors or async patterns |
| **Code review** | `Review this PR` / `@copilot review` | Review test quality, POM adherence, type safety |
| **Bug fix** | `Fix the failing test` | Diagnose and patch selector issues or async race conditions |
| **Refactoring** | `Refactor to use POM` | Migrate inline locators to Page Object classes |
| **Test generation** | `Write a test for...` | Scaffold `*.spec.ts` files using existing page objects |
| **Documentation** | `Document this class` | Add JSDoc to page object methods and utilities |

---

## Repository-Specific Skills to Use

### 1. Generate a Page Object

Prompt Copilot with:
```
Create a Page Object for the Adviserly login page at https://www.adviserly.com/login
following the BasePage pattern in pages/BasePage.ts
```

### 2. Scaffold a Smoke Test

```
Write a Playwright smoke test for the homepage at https://www.adviserly.com/
that verifies the page title, navigation links, and hero section are visible.
Use the HomePage page object.
```

### 3. Fix a Flaky Test

```
This test is flaky due to a timing issue. Refactor it to use proper Playwright
auto-waiting instead of waitForTimeout.
```

### 4. Accessibility Check Helper

```
Generate a Playwright accessibility audit using @axe-core/playwright for the
homepage and output failures as a Playwright test.
```

---

## Copilot Extensions (Optional / Install as Needed)

> Extensions add domain-specific skills to Copilot Chat. Install from the GitHub Marketplace.

| Extension | Use Case | Install |
|-----------|---------|---------|
| **GitHub Actions** | Query workflow run results, interpret CI failures | GitHub Marketplace |
| **Sentry** | Correlate test failures with production error reports | GitHub Marketplace |
| **Datadog** | Pull performance metrics to inform baseline tests | GitHub Marketplace |
| **Playwright MCP** | Use Playwright's MCP server for live browser interaction during test authoring | `@playwright/mcp` |

---

## How to Enable a Skill in the Copilot CLI

```bash
# List available skills
/skills

# Browse agents (which bundle specific skill sets)
/agent

# Manage MCP servers (which power tool-based skills)
/mcp
```

---

## Custom Skill: POM Scaffolding Prompt Template

Use the following prompt template when asking Copilot to scaffold new Page Objects:

```
You are a QA engineer working on the Adviserly Playwright TypeScript test framework.

Task: Create a Page Object Model class for [PAGE NAME] at [URL].

Requirements:
- Class name: [ClassName]Page
- Extend: BasePage (import from '../pages/BasePage')
- Locators: declare as readonly class properties using Playwright locator methods
- Methods: include [list actions, e.g., "clickSignIn", "fillEmailAndPassword"]
- Export: named export
- TypeScript: strict mode, explicit return types, no `any`
- Do NOT include test assertions inside the page object

Output only the TypeScript class file content.
```

---

## Skill Hooks (Automation Triggers)

Copilot skills can be triggered automatically via **Copilot Automations** on a schedule or in
response to GitHub events (issue opened, PR opened, etc.). See
[About Copilot Automations](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations).

Recommended automations for this repo:

| Trigger | Agent Task |
|---------|-----------|
| Issue labeled `test-needed` | Generate a Playwright spec file for the described feature |
| PR opened | Run Copilot code review focused on POM adherence and TypeScript types |
| Issue labeled `bug` | Research failing selector and propose a POM fix |
