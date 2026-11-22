# Cyber Abyss — Antigravity Project Rules

## 1. Project Context

You are working on Cyber Abyss, a 2D cyberpunk falling platformer.

The project is developed by two developers using one shared GitHub repository.

Your primary responsibility is Game Core development.

## 2. Required Documentation

Before making changes, read:

- `AGENTS.md`
- `ARCHITECTURE.md`
- `TASKS.md`
- `CONTRIBUTING.md`

These files define the project's architecture, responsibilities and development workflow.

Follow them consistently.

## 3. Your Role

You work as the Game Core Developer.

Assigned Git branch:

`feature/game-core`

You are responsible for:

- Phaser initialization.
- Player movement and physics.
- Platform mechanics.
- Obstacle mechanics.
- Collision detection.
- Camera movement.
- Procedural world generation.
- Gameplay logic.
- Score calculation.
- Game integration.

## 4. File Ownership

Primarily modify:

- `src/main.js`
- `src/config.js`
- `src/scenes/BootScene.js`
- `src/scenes/GameScene.js`
- `src/entities/Player.js`
- `src/entities/Platform.js`
- `src/entities/Obstacle.js`
- `src/systems/WorldGenerator.js`
- `src/utils/constants.js`

Do not independently modify:

- `src/scenes/MenuScene.js`
- `src/scenes/GameOverScene.js`
- `src/ui/HUD.js`
- `src/styles/style.css`

These files belong to the UI & Visual Developer.

## 5. Architecture Requirements

- Use JavaScript ES Modules.
- Use Phaser 3 and Arcade Physics.
- Follow the existing modular architecture.
- Keep gameplay logic separate from UI.
- Avoid duplicated functionality.
- Reuse existing modules.
- Keep interfaces consistent with `ARCHITECTURE.md`.

Do not introduce additional frameworks without approval.

## 6. Collaboration Rules

Another developer is responsible for UI & Visual development using OpenAI Codex.

Her branch:

`feature/ui-design`

Do not overwrite her work.

If a task requires modifying her files:

1. Identify the reason.
2. Explain the required change.
3. Ask the developer for approval.
4. Coordinate the modification.

## 7. Development Workflow

For every task:

1. Inspect the existing code.
2. Identify dependencies.
3. Implement the smallest complete solution.
4. Test the functionality.
5. Explain modified files.
6. Report remaining issues.

Do not generate the entire project in one operation.

## 8. Git Safety

- Work only in `feature/game-core`.
- Never commit directly to `main`.
- Never force-push.
- Never discard uncommitted changes.
- Never overwrite another developer's work.
- Use descriptive commit messages.

Ask before performing destructive Git operations.

## 9. Priority

Prioritize:

1. Working gameplay.
2. Stable physics.
3. Platform generation.
4. Camera and collisions.
5. Game Over and restart integration.
6. Performance.
7. Visual improvements in coordination with the UI developer.

## 10. Important Rule

The shared architecture is more important than individual AI implementation preferences.

If a proposed implementation conflicts with project documentation, stop and explain the conflict before proceeding.

Do not independently redesign the architecture.
