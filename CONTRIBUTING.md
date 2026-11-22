# Contributing to Cyber Abyss

This document defines the collaboration and Git workflow for the Cyber Abyss development team.

## 1. Team Structure

The project is developed by two developers using one shared GitHub repository.

### Developer 1 — Game Core Developer

- Tool: Google Antigravity
- Branch: `feature/game-core`
- Responsible for gameplay logic, physics, entities and world generation.

### Developer 2 — UI & Visual Developer

- Tool: OpenAI Codex
- Branch: `feature/ui-design`
- Responsible for UI, visual effects, animations and assets.

## 2. Branch Strategy

The project uses the following branches:

- `main` — stable and integrated version.
- `feature/game-core` — gameplay development.
- `feature/ui-design` — UI and visual development.

Rules:

- Never work directly on `main`.
- Each developer works in their assigned branch.
- Do not commit directly to another developer's branch.
- All completed features must be integrated through Pull Requests.

## 3. Initial Setup

Clone the repository:

```bash
git clone https://github.com/anastasiialisniak/cyber-abyss.git
cd cyber-abyss
```

Create your assigned branch if it does not exist:

```bash
git switch -c feature/game-core
```

For the second developer:

```bash
git switch -c feature/ui-design
```

## 4. Daily Git Workflow

Before starting work:

```bash
git status
git fetch origin
```

Update your local main branch when necessary:

```bash
git switch main
git pull origin main
```

Return to your feature branch and integrate the latest main:

```bash
git switch feature/game-core
git merge main
```

The second developer uses `feature/ui-design` instead.

## 5. Saving Changes

Check modified files:

```bash
git status
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Implement player movement"
```

Push your branch:

```bash
git push -u origin feature/game-core
```

For subsequent pushes:

```bash
git push
```

Use descriptive commit messages.

Examples:

- `Initialize
