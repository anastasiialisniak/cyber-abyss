# Cyber Abyss — Development Tasks

## Project Goal

Develop a playable 2D cyberpunk falling platformer within the hackathon time limit.

## Legend

- `[x]` — done.
- `[ ]` — not done.
- **Stub** — file and public methods exist (see `ARCHITECTURE.md`), logic is not implemented. The owner replaces the stub.

## Current Implementation Status

**Implemented (architecture foundation):**

- [x] Vite + Phaser 3 setup, `index.html`, npm scripts (`dev`, `build`, `preview`).
- [x] Phaser config and registration of all four scenes (`src/config.js`, `src/main.js`).
- [x] Scene flow Boot → Menu → Game → Game Over → Game (restart), with `{ score, bestScore }` passed to Game Over.
- [x] `GameScene` lifecycle: module creation, update loop only in `PLAYING` state, cleanup on shutdown.
- [x] Shared constants (`src/utils/constants.js`).
- [x] `GameStateManager` states `READY` / `PLAYING` / `GAME_OVER`.
- [x] Project structure, asset folders and `ARCHITECTURE.md`.

**Stubs (to be implemented by their owners):**

| Module | Owner | Current state |
|--------|-------|---------------|
| `Player` | Dev 1 | Placeholder rectangle with a physics body; `update()` is empty |
| `Platform`, `Obstacle` | Dev 2 | Placeholder rectangles with static bodies |
| `WorldGenerator` | Dev 2 | Empty methods |
| `MenuScene`, `GameOverScene` | Dev 3 | Plain text; click/Space starts or restarts the game |
| `HUD` | Dev 3 | Two plain text labels |
| `ScoreManager` | Dev 4 | Fields only; `updateScore` returns 0 |
| `AudioManager` | Dev 4 | Empty methods |
| `ParticleEffects`, `ScreenEffects` | Dev 4 | Empty classes |

**Temporary code to remove:** dev-only `ESC` key in `GameScene` that ends the run; `TODO(Core Gameplay)` collider placeholders in `GameScene`.

## Developer 1 — Core Gameplay

Tool: Google Antigravity

Branch: `feature/game-core`

Files: `src/main.js`, `src/config.js`, `src/scenes/BootScene.js`, `src/scenes/GameScene.js`, `src/entities/Player.js`

### Phase 1 — Project Setup

- [x] Initialize Phaser and Vite.
- [x] Configure the Phaser game.
- [x] Create BootScene.
- [x] Verify that the application starts.
- [ ] Load shared assets in `BootScene` when assets exist.

### Phase 2 — Player Mechanics

- [ ] Implement Player entity (replace the stub).
- [ ] Implement horizontal movement.
- [ ] Implement gravity tuning.
- [ ] Configure world boundaries.
- [ ] Test player movement.

### Phase 3 — Camera and Collisions

- [ ] Implement camera movement.
- [ ] Set up platform collisions (collider on the platform group in `GameScene`).
- [ ] Integrate `WorldGenerator` calls in `GameScene` with the real camera.

### Phase 4 — Gameplay

- [ ] Set up obstacle collisions.
- [ ] Implement game over conditions (and remove the dev `ESC` key).
- [ ] Connect gameplay with HUD, `ScoreManager` and `AudioManager` in `GameScene`.

### Phase 5 — Integration

- [ ] Integrate all modules from the other developers.
- [ ] Test complete gameplay.
- [ ] Fix gameplay bugs.

## Developer 2 — World & Level Systems

Branch: `feature/world-systems`

Files: `src/entities/Platform.js`, `src/entities/Obstacle.js`, `src/systems/WorldGenerator.js`

### Phase 1 — Platforms

- [ ] Implement Platform entity (replace the stub).
- [ ] Define platform sizes and spacing parameters.

### Phase 2 — World Generation

- [ ] Implement `generateInitialWorld()`.
- [ ] Implement `generateBelow(y)` — generate platforms dynamically.
- [ ] Implement `cleanup(cameraY)` — destroy off-screen objects.
- [ ] Ensure every generated section is reachable.

### Phase 3 — Obstacles

- [ ] Implement Obstacle entity (replace the stub).
- [ ] Place obstacles in the generator.
- [ ] Tune difficulty progression.

## Developer 3 — UI/UX & Visual Design

Tool: OpenAI Codex

Branch: `feature/ui-design`

Files: `src/scenes/MenuScene.js`, `src/scenes/GameOverScene.js`, `src/ui/HUD.js`, `src/styles/style.css`, `public/assets/images/`, `public/assets/fonts/`

### Phase 1 — Visual Foundation

- [ ] Establish cyberpunk visual style.
- [ ] Prepare color palette (agree on additions to `constants.js` with the team).
- [ ] Prepare fonts and visual assets.
- [ ] Implement basic visual styling (`style.css` has a minimal base only).

### Phase 2 — Main Menu

- [ ] Implement MenuScene (replace the text stub).
- [ ] Add game title.
- [ ] Add Play button.
- [ ] Add basic game instructions.
- [x] Connect Play to GameScene (stub starts `GameScene`; keep this behavior).

### Phase 3 — Game Interface

- [ ] Implement HUD (replace the text stub).
- [ ] Display current score.
- [ ] Display best score.
- [x] HUD update methods exist (`updateScore`, `updateBestScore`, `destroy`); keep their signatures.
- [ ] Test HUD with GameScene.

### Phase 4 — Game Over

- [ ] Implement GameOverScene (replace the text stub).
- [ ] Display final score (from `data.score`).
- [ ] Display best score (from `data.bestScore`).
- [ ] Add Restart button.
- [x] Restart starts a new `GameScene` session (stub; keep this behavior).

### Phase 5 — Visual Polish

- [ ] Add neon styling and UI animations.
- [ ] Test visual consistency.

## Developer 4 — Game Systems, Effects & QA

Branch: `feature/game-systems`

Files: `src/systems/ScoreManager.js`, `src/systems/GameStateManager.js`, `src/audio/AudioManager.js`, `src/effects/ParticleEffects.js`, `src/effects/ScreenEffects.js`, `public/assets/audio/`

### Phase 1 — Score and State

- [ ] Implement score calculation in `ScoreManager.updateScore(playerY)`.
- [ ] Implement best score tracking and persistence (`STORAGE_KEYS.BEST_SCORE`).
- [x] `GameStateManager` basic states implemented; guard invalid transitions if needed.

### Phase 2 — Audio

- [ ] Implement `playSound`, `playMusic`, `stopMusic` (safe when a key is missing).
- [ ] Add sound effects and music files to `public/assets/audio/`.

### Phase 3 — Effects

- [ ] Implement `ParticleEffects` (e.g. landing burst).
- [ ] Implement `ScreenEffects` (e.g. shake, flash).
- [ ] Agree with Dev 1 on the calls added to `GameScene`.

### Phase 4 — QA

- [ ] Test the game after each integration.
- [ ] Verify the scene flow Menu → Game → Game Over → Restart.
- [ ] Verify `npm run build` and cleanup on restart (no leaked objects/listeners).
- [ ] Report bugs to the owner of the affected module.

## Shared Tasks

- [x] Agree on architecture.
- [x] Establish component interfaces (see `ARCHITECTURE.md`).
- [ ] Review each other's Pull Requests.
- [ ] Merge the architecture scaffold from `feature/game-core` into `main`; create/update the other three branches from `main`.
- [ ] Integrate all four feature branches.
- [ ] Test the complete game.
- [ ] Fix integration bugs.
- [ ] Prepare the final demonstration.
- [ ] Update README.md with final project information.

## Priority Levels

### P1 — Essential

A playable game with working movement, physics, platforms, camera, scoring and restart.

### P2 — Important

Procedural generation, obstacles, menu, HUD and Game Over screen.

### P3 — Optional

Advanced animations, particles, sound and additional visual effects.

## Development Status

Project status: Architecture foundation ready; gameplay implementation in progress (not started).

All tasks should be updated as development progresses.
