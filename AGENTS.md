# AGENTS.md — Cyber Abyss

## 1. Project Overview

Cyber Abyss is a 2D vertical falling platformer with a cyberpunk atmosphere.

The player descends through a digital abyss, lands on platforms, avoids obstacles and tries to achieve the highest score.

The project is being developed by two developers for a hackathon.

## 2. Technology Stack

- JavaScript (ES Modules)
- Phaser 3
- Phaser Arcade Physics
- Vite
- HTML5
- CSS3

Do not introduce additional frameworks or dependencies without approval from both developers.

## 3. Team Responsibilities

### Developer 1 — Game Core Developer

Tool: Google Antigravity

Git branch: `feature/game-core`

Responsibilities:

- Game initialization and configuration.
- Player movement and physics.
- Platform mechanics.
- Obstacle mechanics.
- Collision detection.
- Camera movement.
- Procedural world generation.
- Gameplay logic.
- Score calculation.
- Integration of game components.

Owned files:

- `src/main.js`
- `src/config.js`
- `src/scenes/BootScene.js`
- `src/scenes/GameScene.js`
- `src/entities/Player.js`
- `src/entities/Platform.js`
- `src/entities/Obstacle.js`
- `src/systems/WorldGenerator.js`
- `src/utils/constants.js`

### Developer 2 — UI & Visual Developer

Tool: OpenAI Codex

Git branch: `feature/ui-design`

Responsibilities:

- Main menu.
- Game Over screen.
- HUD and score display.
- UI animations.
- Cyberpunk visual design.
- Neon effects.
- CSS styling.
- Visual assets and sound effects.

Owned files:

- `src/scenes/MenuScene.js`
- `src/scenes/GameOverScene.js`
- `src/ui/HUD.js`
- `src/styles/style.css`
- `public/assets/`

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

The following interfaces must remain consistent:

- `MenuScene` starts `GameScene`.
- `GameScene` controls the gameplay lifecycle.
- `GameScene` creates and updates `HUD`.
- `HUD` provides `updateScore(score)`, `updateBestScore(score)` and `destroy()`.
- `GameScene` passes final results to `GameOverScene`.
- `GameOverScene` provides a restart action.

Do not rename scene keys, public methods or change method parameters without agreement from both developers.

If an interface needs to change, notify the other developer first.

## 6. Code Quality

- Use JavaScript ES Modules.
- Keep modules focused on one responsibility.
- Prefer readable and maintainable code.
- Avoid unnecessary complexity.
- Avoid duplicate code.
- Use meaningful variable and function names.
- Handle errors appropriately.
- Clean up event listeners and game objects when necessary.
- Do not leave unfinished placeholder implementations in completed features.

## 7. File Ownership Rules

Each developer must primarily modify files assigned to their responsibility.

Do not overwrite or restructure another developer's files without prior coordination.

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

- `feature/game-core`
- `feature/ui-design`

Rules:

- Never commit directly to `main`.
- Work only in your assigned feature branch.
- Pull the latest changes before starting new work.
- Commit changes regularly.
- Use descriptive commit messages.
- Push changes to your own branch.
- Integrate changes through Pull Requests.
- Test the game after integration.
- Never force-push or overwrite another developer's work.

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
