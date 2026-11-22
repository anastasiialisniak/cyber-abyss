# Contributing to Cyber Abyss

This document defines the collaboration and Git workflow for the Cyber Abyss development team.

## 1. Team Structure

The project is developed by four developers using one shared GitHub repository.

### Developer 1 — Core Gameplay

- Tool: Google Antigravity
- Branch: `feature/game-core`
- Responsible for the player, physics, camera and `GameScene` (integration of all modules).

### Developer 2 — World & Level Systems

- Branch: `feature/world-systems`
- Responsible for platforms, obstacles and procedural world generation.

### Developer 3 — UI/UX & Visual Design

- Tool: OpenAI Codex
- Branch: `feature/ui-design`
- Responsible for the main menu, Game Over screen, HUD, CSS, visual design and assets.

### Developer 4 — Game Systems, Effects & QA

- Branch: `feature/game-systems`
- Responsible for score, game state, audio, particle/screen effects and testing.

File ownership per developer is defined in [AGENTS.md](AGENTS.md).

## 2. Branch Strategy

The project uses the following branches:

- `main` — stable and integrated version.
- `feature/game-core` — Core Gameplay (Developer 1).
- `feature/world-systems` — World & Level Systems (Developer 2).
- `feature/ui-design` — UI/UX & Visual Design (Developer 3).
- `feature/game-systems` — Game Systems, Effects & QA (Developer 4).

Rules:

- Never work directly on `main`.
- Each developer works in their assigned branch.
- Do not commit directly to another developer's branch.
- All completed features must be integrated through Pull Requests into `main`.
- Never force-push or overwrite another developer's work.

## 3. Initial Setup

Clone the repository:

```bash
git clone https://github.com/anastasiialisniak/cyber-abyss.git
cd cyber-abyss
npm install
```

Create your assigned branch if it does not exist (replace the name with your branch from section 2):

```bash
git switch -c feature/game-core
```

Other branches: `feature/world-systems`, `feature/ui-design`, `feature/game-systems`.

If the branch already exists on GitHub, use:

```bash
git switch feature/ui-design
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

Other developers use their own branch instead of `feature/game-core`.

## 5. Saving Changes

Check modified files:

```bash
git status
```

Stage changes (prefer adding only your own files; check `git status` first):

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

- `Initialize Phaser and Vite project structure`
- `Implement player horizontal movement`
- `Add platform generation below the camera`
- `Implement Game Over screen layout`
- `Add ScoreManager best score persistence`

## 6. File Ownership

- Edit primarily the files assigned to you in [AGENTS.md](AGENTS.md).
- Two developers must not edit the same file at the same time without agreement.
- Shared files — `src/utils/constants.js`, `index.html`, `package.json`, `package-lock.json`, `ARCHITECTURE.md`, `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `TASKS.md` — are changed only after agreement of all developers, preferably in a small separate Pull Request.
- If you need a change in someone else's file: explain why, name the affected files, describe the change and wait for approval (ask the owner to make it, or agree on it in the Pull Request).
- Public interfaces (scene keys, method names, parameters) are defined in `ARCHITECTURE.md` and must not change without agreement of all four developers.

## 7. Pull Requests

1. Pull the latest `main` and merge it into your branch; resolve conflicts locally.
2. Run `npm run build` and check that the game starts with `npm run dev`.
3. Push your branch and open a Pull Request into `main`.
4. In the description list: what was done, modified files, known issues.
5. At least one other developer reviews the Pull Request. The author does not merge their own PR without a review.
6. Prefer small, frequent Pull Requests over one large one.
7. After a merge, everyone merges `main` into their branch and checks the game.

First integration: the architecture scaffold (source structure, Vite/Phaser setup, `ARCHITECTURE.md` and documentation updates) is created on `feature/game-core`. It should be merged into `main` through a Pull Request first; after that Developers 2, 3 and 4 create or update their branches from `main`.

## 8. Testing Before a Pull Request

- `npm run dev` — the game opens without console errors.
- `npm run build` — the production build succeeds.
- Check that your changes do not break the scene flow: Menu → Game → Game Over → Restart.
