# .github Folder — GitHub Copilot Configuration Guide

This folder contains all GitHub Copilot configuration files for the Adviserly QA Agentic Solution
repository. Below is a reference for what each file and directory does, when to edit it, and how
the pieces fit together.

---

## Folder Structure

```
.github/
├── copilot-instructions.md          # Repository-wide Copilot instructions
├── instructions/                    # Path-specific Copilot instructions
│   ├── playwright-tests.instructions.md
│   └── page-objects.instructions.md
└── README.md                        # This file
```

Additionally, in the **repository root**:

```
AGENTS.md          # Agent behavioral instructions (read by cloud agent & Copilot CLI)
Skills.md          # Skills reference for contributors and agents
```

---

## File Reference

### `copilot-instructions.md`

**Type:** Repository-wide custom instructions
**Read by:** Copilot Chat (GitHub.com), Copilot cloud agent, Copilot code review, IDE Copilot Chat
**Location required:** `.github/copilot-instructions.md`

Contains the top-level rules and architectural guidance that apply to **every** Copilot request
made in this repository. This is where you put:

- Project summary and tech stack
- Mandatory code architecture rules (POM, OOP)
- Bootstrap and build commands
- Key file locations
- Things Copilot must always / never do

**Edit when:** The project architecture changes, new frameworks are added, or core rules evolve.

---

### `instructions/` — Path-Specific Custom Instructions

**Type:** Path-specific custom instructions
**Read by:** Copilot cloud agent, Copilot code review (for files matching `applyTo` globs)
**Location required:** Must be inside `.github/instructions/` and named `*.instructions.md`

Each file starts with a frontmatter block declaring which file paths it applies to:

```markdown
---
applyTo: "pages/**/*.ts"
---
```

When Copilot works on a file that matches the glob, these instructions are automatically added to
the context — on top of the repo-wide `copilot-instructions.md`.

#### `playwright-tests.instructions.md`
Applies to: `tests/**/*.spec.ts`, `tests/**/*.test.ts`
Rules for writing Playwright test files: naming, structure, assertions, fixtures.

#### `page-objects.instructions.md`
Applies to: `pages/**/*.ts`
Rules for writing Page Object Model classes: locators, methods, OOP conventions.

**Add a new file when:** A new area of the codebase has its own conventions (e.g., `fixtures/`,
`utils/`, or a new test category).

---

### Root `AGENTS.md`

**Type:** Agent instructions (agentsmd standard)
**Read by:** GitHub Copilot cloud agent, Copilot CLI agents, and any AI agent that follows the
[agentsmd/agents.md](https://github.com/agentsmd/agents.md) specification.

This is the most detailed behavioral specification for AI agents working in the repo. It includes:

- Full project layout quick-reference
- Mandatory POM and OOP rules
- Exact build and validation commands
- What agents SHOULD do (patterns)
- What agents MUST NOT do (anti-patterns)
- CI pipeline description
- Hook / setup steps reference

**Edit when:** New mandatory behavioral rules are established, the project layout changes, or new
CI steps are added.

---

### Root `Skills.md`

**Type:** Contributor and agent reference
**Read by:** Human contributors and AI agents learning the repo

Documents available Copilot skills, how to invoke them, prompt templates for common tasks (POM
scaffolding, test generation, accessibility checks), and Copilot Extension recommendations.

**Edit when:** New extensions are added, new prompt templates are standardized, or automation
triggers change.

---

## How These Files Work Together

```
Every Copilot request in this repo
        │
        ├── copilot-instructions.md  ← Always included (repo-wide)
        │
        ├── AGENTS.md                ← Used by cloud agent & Copilot CLI agents
        │
        └── instructions/*.instructions.md  ← Included if the file being worked on
                                               matches the applyTo glob
```

Priority order (highest to lowest): Personal instructions → Repository instructions → Organization instructions.

---

## Hooks

**Copilot Hooks** in this context refer to:

1. **`copilot-setup-steps.yml`** — Configures the GitHub Actions-powered ephemeral environment
   used by Copilot cloud agent. Pre-installs Node, npm dependencies, and Playwright browsers so
   the agent can run tests without manual setup.
   - Location: `.github/copilot-setup-steps.yml`
   - Docs: https://docs.github.com/en/copilot/how-tos/agents/copilot-coding-agent/customizing-the-development-environment-for-copilot-coding-agent

2. **GitHub Actions Workflows** (`.github/workflows/`) — Standard CI/CD pipelines that run on
   push, pull request, or schedule. The Copilot cloud agent respects these as validation gates.

3. **Copilot Automations** — Event-driven triggers (issue labeled, PR opened) that automatically
   invoke the Copilot cloud agent. Configured in repository settings or via the agents panel at
   `github.com/copilot/agents`.

---

## Rules Summary

| Rule | Enforced By |
|------|------------|
| POM: all locators in `pages/` | `copilot-instructions.md`, `AGENTS.md`, `page-objects.instructions.md` |
| OOP: extend BasePage, encapsulate locators | `page-objects.instructions.md`, `AGENTS.md` |
| TypeScript strict mode | `copilot-instructions.md`, `AGENTS.md` |
| No `waitForTimeout` | `playwright-tests.instructions.md`, `AGENTS.md` |
| No hardcoded URLs or credentials | `copilot-instructions.md`, `AGENTS.md` |
| Descriptive test names | `playwright-tests.instructions.md` |
| CI must pass before merge | `AGENTS.md`, branch protection rules |

---

## Docs (Reference Links)

| Topic | URL |
|-------|-----|
| Repository custom instructions | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions |
| AGENTS.md specification | https://github.com/agentsmd/agents.md |
| Copilot cloud agent overview | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent |
| Copilot setup steps | https://docs.github.com/en/copilot/how-tos/agents/copilot-coding-agent/customizing-the-development-environment-for-copilot-coding-agent |
| Copilot automations | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-automations |
| Copilot Extensions / Skills | https://docs.github.com/en/copilot/using-github-copilot/using-extensions-to-integrate-external-tools-with-copilot-chat |
| Playwright documentation | https://playwright.dev/docs/intro |
| agentsmd/agents.md | https://github.com/agentsmd/agents.md |
