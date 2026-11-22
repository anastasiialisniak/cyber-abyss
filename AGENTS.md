# AGENTS.md — Cyber Abyss

## 1. Project Overview

Cyber Abyss is a 2D vertical falling platformer with a cyberpunk atmosphere.

The player descends through a digital abyss, lands on platforms, avoids obstacles and tries to achieve the highest score.

The project is being developed by four developers for a hackathon.

## 2. Technology Stack

- JavaScript (ES Modules)
- Phaser 3 (pinned to 3.90.0)
- Phaser Arcade Physics
- Vite
- HTML5
- CSS3

Do not introduce additional frameworks or dependencies without approval from all developers.

## 3. Team Responsibilities

### Developer 1 — Core Gameplay

Tool: Google Antigravity

Git branch: `feature/game-core`

Responsibilities:

- Game initialization and configuration.
- Player movement and physics.
- Collision detection setup.
- Camera movement.
- Gameplay logic and game-over conditions.
- Integration of game components in `GameScene`.

Owned files:

- `src/main.js`
- `src/config.js`
- `src/scenes/BootScene.js`
- `src/scenes/GameScene.js`
- `src/entities/Player.js`

### Developer 2 — World & Level Systems

Git branch: `feature/world-systems`

Responsibilities:

- Platform mechanics.
- Obstacle mechanics.
- Procedural world generation and cleanup of off-screen objects.

Owned files:

- `src/entities/Platform.js`
- `src/entities/Obstacle.js`
- `src/systems/WorldGenerator.js`

### Developer 3 — UI/UX & Visual Design

Tool: OpenAI Codex

Git branch: `feature/ui-design`

Responsibilities:

- Main menu.
- Game Over screen.
- HUD and score display.
- UI animations.
- Cyberpunk visual design.
- Neon effects (styling and UI).
- CSS styling.
- Visual assets.

Owned files:

- `src/scenes/MenuScene.js`
- `src/scenes/GameOverScene.js`
- `src/ui/HUD.js`
- `src/styles/style.css`
- `public/assets/images/`
- `public/assets/fonts/`

### Developer 4 — Game Systems, Effects & QA

Git branch: `feature/game-systems`

Responsibilities:

- Score calculation and best score.
- Game state management.
- Audio: sound effects and music.
- Particle and screen effects.
- Testing and QA of the integrated game.

Owned files:

- `src/systems/ScoreManager.js`
- `src/systems/GameStateManager.js`
- `src/audio/AudioManager.js`
- `src/effects/ParticleEffects.js`
- `src/effects/ScreenEffects.js`
- `public/assets/audio/`

### Shared files

Changed only after agreement of all developers (see section 7):

- `src/utils/constants.js`
- `index.html`
- `package.json`, `package-lock.json`
- `ARCHITECTURE.md`, `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `TASKS.md`

## 4. Architecture Rules

The complete project architecture is documented in `ARCHITECTURE.md`.

Before implementing any feature:

1. Read `ARCHITECTURE.md`.
2. Inspect the existing project structure.
3. Check existing modules and their responsibilities.
4. Follow established naming conventions and interfaces.
5. Avoid creating duplicate functionality.

`ARCHITECTURE.md` is the main source of truth for technical decisions.

Do not independently change the architecture.

## 5. Component Interaction

The following interfaces must remain consistent (full signatures are in `ARCHITECTURE.md`, section 6):

- `BootScene` starts `MenuScene`.
- `MenuScene` starts `GameScene`.
- `GameScene` controls the gameplay lifecycle and is the only module that integrates the others.
- `GameScene` creates and updates `HUD`.
- `HUD` provides `updateScore(score)`, `updateBestScore(bestScore)` and `destroy()`.
- `GameScene` passes final results `{ score, bestScore }` to `GameOverScene`.
- `GameOverScene` provides a restart action that starts `GameScene`.
- `GameStateManager` (`READY`, `PLAYING`, `GAME_OVER`) never starts Phaser scenes itself.
- `Player.update(time, delta)`, `ScoreManager.updateScore(playerY)`, `WorldGenerator.generateBelow(y)` and `cleanup(cameraY)` are called by `GameScene`.

Do not rename scene keys, public methods or change method parameters without agreement of all developers.

If an interface needs to change, notify the other developers first.

## 6. Code Quality

- Use JavaScript ES Modules.
- Keep modules focused on one responsibility.
- Prefer readable and maintainable code.
- Avoid unnecessary complexity.
- Avoid duplicate code.
- Use meaningful variable and function names.
- Handle errors appropriately.
- Clean up event listeners and game objects when necessary.
- Do not leave unfinished placeholder implementations in completed features. Current stubs are listed in `TASKS.md` and must be replaced by their owners.

## 7. File Ownership Rules

Each developer must primarily modify files assigned to their responsibility.

Do not overwrite or restructure another developer's files without prior coordination.

Two developers must not edit the same file at the same time without agreement.

Shared files must be modified only after agreement.

If a task requires changes outside your assigned files:

1. Explain why the change is necessary.
2. Identify the affected files.
3. Describe the proposed changes.
4. Wait for approval before implementing them.

## 8. Git Workflow

The project uses one shared GitHub repository.

Main branch:
`main`

Developer branches:

- `feature/game-core` — Developer 1
- `feature/world-systems` — Developer 2
- `feature/ui-design` — Developer 3
- `feature/game-systems` — Developer 4

Rules:

- Never commit directly to `main`.
- Work only in your assigned feature branch.
- Pull the latest changes before starting new work.
- Commit changes regularly.
- Use descriptive commit messages.
- Push changes to your own branch.
- Integrate changes through Pull Requests into `main`, reviewed by at least one other developer.
- Test the game after integration (`npm run dev`, `npm run build`).
- Never force-push or overwrite another developer's work.

See `CONTRIBUTING.md` for the detailed workflow.

## 9. Development Priorities

### Priority 1 — Playable MVP

- Player movement.
- Gravity and physics.
- Platforms.
- Camera movement.
- Collision detection.
- Game Over.
- Restart.

### Priority 2 — Gameplay Systems

- Procedural generation.
- Obstacles.
- Score system.
- Best score.
- HUD.
- Main menu.

### Priority 3 — Visual Polish

- Neon effects.
- Animations.
- Particles.
- Sound effects.
- Additional visual details.

Always prioritize working gameplay over decorative features.

## 10. AI Assistant Working Rules

Before starting any task:

1. Read this file.
2. Read `ARCHITECTURE.md`.
3. Read `TASKS.md` if it exists.
4. Inspect the current implementation.
5. Identify dependencies and affected files.

When implementing a task:

- Work incrementally.
- Do not rewrite the entire project.
- Do not modify unrelated files.
- Explain important architectural decisions.
- Test the implementation.
- Report all modified files.
- Report incomplete tasks and known issues.

If instructions conflict, stop and ask the developer for clarification.

## 11. Project Goal

The goal is to deliver a complete, stable and visually appealing playable game within the hackathon time limit.

A small working game is better than a large unfinished project.
