# Cyber Abyss — System Architecture

Source of truth for technical decisions. Interface changes require agreement of all four developers.

## 1. Overview

2D vertical falling platformer with a cyberpunk atmosphere. The player descends through a digital abyss, lands on platforms, avoids obstacles and chases the best score. Browser game.

## 2. Technology Stack

- JavaScript (ES Modules), Phaser **3.90.0** (pinned), Arcade Physics, Vite, HTML5, CSS3.
- No additional dependencies without team agreement.

## 3. Structure

```text
index.html                  # Vite entry, <div id="game">
src/
├── main.js                 # creates Phaser.Game, imports CSS
├── config.js               # Phaser config + scene registration (export gameConfig)
├── scenes/   BootScene, MenuScene, GameScene, GameOverScene
├── entities/ Player, Platform, Obstacle
├── systems/  WorldGenerator, ScoreManager, GameStateManager
├── ui/       HUD
├── effects/  ParticleEffects, ScreenEffects
├── audio/    AudioManager
├── styles/   style.css
└── utils/    constants.js  # SCENE_KEYS, GAME_STATES, EVENTS, COLORS, STORAGE_KEYS, PHYSICS, size
public/assets/ images/ audio/ fonts/   # served at /assets/...
```

Every module is a `default export` class (constants are named exports).

## 4. Ownership

| # | Role | Files |
|---|------|-------|
| 1 | Core Gameplay | `scenes/GameScene.js`, `scenes/BootScene.js`, `entities/Player.js`, `main.js`, `config.js` |
| 2 | World & Level Systems | `entities/Platform.js`, `entities/Obstacle.js`, `systems/WorldGenerator.js` |
| 3 | UI/UX & Visual Design | `scenes/MenuScene.js`, `scenes/GameOverScene.js`, `ui/HUD.js`, `styles/style.css`, `public/assets/images/`, `public/assets/fonts/` |
| 4 | Game Systems, Effects & QA | `systems/ScoreManager.js`, `systems/GameStateManager.js`, `audio/AudioManager.js`, `effects/*`, `public/assets/audio/` |

Shared: `utils/constants.js`, `index.html`, `package.json`, `ARCHITECTURE.md` — change only by agreement.

## 5. Scene flow and lifecycle

```text
BootScene → MenuScene → GameScene → GameOverScene
                ▲            ▲              │
                └── (restart) ──────────────┘ (restart → GameScene)
```

- Scene keys: `SCENE_KEYS.BOOT | MENU | GAME | GAME_OVER` (values `BootScene`, `MenuScene`, `GameScene`, `GameOverScene`). Do not rename.
- `BootScene` is first in `config.scene`; loads shared assets, then starts `MenuScene`.
- `MenuScene` starts `GameScene`.
- `GameScene.create()` builds everything from scratch (restart-safe), calls `stateManager.startGame()`. `update(time, delta)` runs only while state is `PLAYING`. Cleanup runs on scene `SHUTDOWN`.
- Game end: `GameScene.endGame()` (public, idempotent) → `stateManager.endGame()` → `scene.start('GameOverScene', { score, bestScore })`.
- `GameOverScene.init(data)` reads `{ score, bestScore }`; `restart()` starts `GameScene`.

## 6. Module contracts (approved)

Phaser-dependent classes take `scene` as the first constructor argument. Pure-logic classes (`ScoreManager`, `GameStateManager`) have **no Phaser dependency**.

| Class | Constructor | Public methods |
|-------|-------------|----------------|
| `Player` | `(scene)` | `create(x, y)` → this, `update(time, delta)`, `getPosition()` → `{x, y}`, `getGameObject()`, `destroy()` |
| `Platform` | `(scene, group?)` | `create(x, y, width)` → this, `getGameObject()`, `destroy()` |
| `Obstacle` | `(scene, group?)` | `create(x, y)` → this, `getGameObject()`, `destroy()` |
| `WorldGenerator` | `(scene, platformGroup, obstacleGroup)` | `generateInitialWorld()`, `generateBelow(y)`, `cleanup(cameraY)` |
| `ScoreManager` | `()` | `updateScore(playerY)` → score, `getScore()`, `getBestScore()`, `reset()` (best is kept) |
| `GameStateManager` | `()` | `startGame()`, `endGame()`, `getState()` → `GAME_STATES.*` |
| `HUD` | `(scene)` | `updateScore(score)`, `updateBestScore(bestScore)`, `destroy()` |
| `AudioManager` | `(scene)` | `playSound(key)`, `playMusic(key)`, `stopMusic()` |
| `ParticleEffects`, `ScreenEffects` | `(scene)` | `destroy()` + methods added by owner #4 and agreed with GameScene |

Changes versus the preliminary contract (to fit Phaser 3):

- Entities take `scene` in the constructor; `create(x, y[, width])` takes positions.
- `Player.update(time, delta)` instead of `update()` — matches Phaser's `Scene.update` and frame-rate independent movement.
- `Platform`/`Obstacle` get an optional physics **group** that `GameScene` owns; `GameScene` sets colliders on groups, not per object, so generated/destroyed objects need no collider bookkeeping.
- `ScoreManager.updateScore(playerY)` returns the score; `reset()` clears only the current score.
- `WorldGenerator.generateBelow(y)` receives a world-Y; `cleanup(cameraY)` receives the camera's top edge (`camera.scrollY`).
- `GameStateManager` states: `READY → PLAYING → GAME_OVER`; it never starts scenes.

## 7. Interaction

`GameScene` is the only integrator. It creates the groups, all modules and the colliders; per frame it calls `player.update` → `scoreManager.updateScore(player.y)` → `hud.updateScore/updateBestScore` → `worldGenerator.generateBelow/cleanup`. Modules do not import each other (except entities used by `WorldGenerator`); they communicate through `GameScene` or the event names in `EVENTS`.

HUD must use `setScrollFactor(0)` so it stays on screen while the camera moves.

## 8. Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run preview   # serve dist/
```

## 9. Current status

Scaffolding only: all modules are stubs implementing the contracts above. Temporary pieces to remove/replace: placeholder rectangles in entities, text stubs in `MenuScene`/`GameOverScene`/`HUD`, and the dev-only `ESC` key in `GameScene` that ends the run. Colliders in `GameScene` are marked `TODO(Core Gameplay)`.
