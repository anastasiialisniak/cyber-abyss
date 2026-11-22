# Cyber Abyss — Testing Report

Overview of the testing process, verified test results to date, and planned tests for upcoming modules and integration.

## 1. Testing Process

Testing is performed at four levels before merging any Pull Request into `main`:

1. **Production Build Verification**: Run `npm run build` (Vite) to verify all ES module imports/exports, bundling, and zero build errors.
2. **Browser Smoke Testing**: Start `npm run dev` and open the game in a browser to verify canvas rendering, zero console errors, HTTP 200 asset/module responses, and the basic scene flow (`Menu → Game → Game Over → Restart`).
3. **Gameplay & Behavior Testing**: Verify physics, controls, collisions, camera behavior, and Game Over triggers in a live browser session.
4. **Regression Testing**: Re-run build and affected gameplay checks after fixes or merges, verifying repeated restarts and module interface compatibility.

> **Current Test Limitation**: Because `WorldGenerator`, `ScoreManager`, `HUD`, `MenuScene`, `GameOverScene`, `AudioManager`, and effects are still stubs on `feature/game-core`, platform and obstacle tests were run by spawning `Platform` and `Obstacle` instances dynamically via a temporary browser test harness (removed after testing).

---

## 2. Completed Tests (Verified)

All completed tests below were executed on `2026-11-22` on branch `feature/game-core` (commits `031f0e5` and `81a801a`).

### 2.1 Production Build & Module Resolution

| Check | Command / Scope | Result | Notes |
|-------|-----------------|--------|-------|
| Vite module transform | `/src/main.js`, `/src/config.js`, all 4 scenes | **PASS** | All 6 entry/scene modules transformed (`OK`). |
| Production build (architecture setup) | `npm run build` (Vite 8.3.8) | **PASS** | 20 modules transformed, built in `2.07s`. Expected Phaser chunk-size warning only. |
| Production build (core gameplay) | `npm run build` | **PASS** | 20 modules transformed, built in `1.17s`–`1.81s`, 0 errors. |
| Production build (camera fixes) | `npm run build` | **PASS** | 20 modules transformed, built in `480ms`, 0 errors. |

### 2.2 Browser Smoke Test (Scene Flow)

| Step | Expected | Observed Result | Status |
|------|----------|-----------------|--------|
| Initial load (`http://localhost:5199/`) | Canvas renders `MenuScene` without errors | HTTP 200 on all 20 requests, 0 console errors, `<canvas>` rendered `CYBER ABYSS / click to start` | **PASS** |
| Click canvas | Transition to `GameScene` | Rendered `Score: 0`, `Best: 0`, and cyan player square | **PASS** |
| Trigger Game Over (`ESC` during stub phase) | Transition to `GameOverScene` with `{ score, bestScore }` | Rendered `GAME OVER / Score: 0 / Best: 0 / click to restart` | **PASS** |
| Click Game Over screen | Restart `GameScene` cleanly | Returned to `GameScene` with `Score: 0`, `Best: 0`, and player at start position | **PASS** |

### 2.3 Core Gameplay Tests (`Player.js` & `GameScene.js`)

| Area | Test Case | Observed Result | Status |
|------|-----------|-----------------|--------|
| Horizontal movement | Hold/release `ArrowRight`, `ArrowLeft`, `A`, `D` | Smooth acceleration and deceleration; stopped at horizontal world bounds `x = 12` and `x = 468` | **PASS** |
| Platform landing (top) | Fall onto centered platform (`w = 300`, `w = 30`, `w = 4`) | Landed cleanly (`y = 280` / `y = 480`, `vy = 0`, `grounded = true`) | **PASS** |
| Platform landing (edge) | Fall with `3 px` horizontal overlap on narrow platform (`w = 30`) | Landed cleanly (`y = 480`, `grounded = true`) | **PASS** |
| Landing event deduplication | Count `player:landed` events while resting on platform | Fired exactly `1` time per landing (`1` on first platform, `2` after landing on second) | **PASS** |
| One-way underside pass-through | Set upward velocity `-450` below platform at `y = 330` | Passed through (`minY = 271.3` / `171.5`), then fell back and landed on top (`y = 310` / `210`) | **PASS** |
| Side pass-through | Move horizontally into platform placed at body level | Passed through (`x = 468`) without snagging | **PASS** |
| Hazard Game Over | Fall onto `Obstacle` at `(240, 300)` | Transitioned to `GameOverScene` (`Score: 0`, `Best: 0`); `GameStateManager` set to `GAME_OVER` | **PASS** |
| Temporary `ESC` removal | Press `Escape` during active run | Remained in `GameScene` (no Game Over triggered) | **PASS** |

### 2.4 Camera, Fall Game Over & Regression Tests

| Area | Test Case | Observed Result | Status |
|------|-----------|-----------------|--------|
| Monotonic downward camera | `updateCamera()` with `targetY < scrollY` (`start = 1000`, `target = 100`) | `scrollY` remained `1000`; `scrollX = 0` | **PASS** |
| Frame-rate independence | Simulate `updateCamera(dt)` at `dt = 8, 16.67, 33.33, 100 ms` | Consistent smoothing (`~91 px` for near target) and `500 px/s` speed cap | **PASS** |
| Lag-spike `delta` clamp | Call `updateCamera(1000)` with distant target | `scrollY` advanced by exactly `25 px` (matches `500 px/s × 50 ms`), `scrollX = 0` | **PASS** |
| No artificial depth limit | Call `updateCamera(50)` at `scrollY = 250000`, `player.y = 251000` | `scrollY` advanced to `250025`, `useBounds = false`, `scrollX = 0` | **PASS** |
| `generateBelow(y)` argument | Inspect value passed while landed at `y = 380`, `scrollY = 180` | Received `1380` (`max(180 + 800, 380) + 400`) | **PASS** |
| Recoverable platform gap | Free fall for `2.5 s`, then spawn platform `250 px` below player | Still `PLAYING` at `2.5 s` (`136.1 px` above death threshold); landed and recovered | **PASS** |
| Continuous fall Game Over | Free fall with no platforms | Triggered `GameOverScene` after `3740.8 ms`–`3788.7 ms` | **PASS** |
| Normal landing (no false Game Over) | Stand on platform for `1.5 s`–`3.0 s` | Remained `PLAYING`, `GameOverScene` inactive | **PASS** |
| Repeated restarts (3× regression) | Restart `GameScene` 3 times and test `D` key afterward | Every restart had `colliders = 2`, `shutdownListeners = 14`, `landedListeners = 0`, `scroll = (0, 0)`, `paused = false`, `state = PLAYING`; `D` moved player (`x: 240 → 332.5`) | **PASS** |

---

## 3. Planned Tests (Not Yet Executed)

These tests depend on modules owned by Developers 2, 3, and 4 or on full branch integration:

- [ ] **World & Level Systems (Dev 2)**:
  - `WorldGenerator.generateInitialWorld()` creates a safe starting layout.
  - `WorldGenerator.generateBelow(y)` generates reachable platforms continuously during long descents.
  - `WorldGenerator.cleanup(cameraY)` destroys off-screen platforms/obstacles without memory growth.
  - Obstacle placement and difficulty scaling do not create impossible patterns.
- [ ] **UI/UX & Visual Design (Dev 3)**:
  - `MenuScene`, `GameOverScene`, and `HUD` render with final cyberpunk styling, fonts, and responsive scaling.
  - `HUD` stays fixed to the viewport (`scrollFactor = 0`) and displays live score/best score updates.
  - Restart button and keyboard shortcuts work reliably across repeated runs.
- [ ] **Game Systems, Effects & QA (Dev 4)**:
  - `ScoreManager.updateScore(playerY)` calculates score accurately and persists `bestScore` via `STORAGE_KEYS.BEST_SCORE`.
  - `AudioManager` plays SFX/music safely without throwing when keys are missing, and stops music cleanly on Game Over.
  - `ParticleEffects` and `ScreenEffects` trigger properly and clean up listeners/objects on scene shutdown (including any `player:landed` listeners).
- [ ] **Full Integration & Cross-Browser QA (Team / Dev 4)**:
  - End-to-end playtesting after merging all four feature branches into `main`.
  - Verification across target desktop browsers and viewport aspect ratios.
  - Playtest tuning of movement speeds, camera speed (`500 px/s`), fall margin (`100 px`), and platform spacing.
