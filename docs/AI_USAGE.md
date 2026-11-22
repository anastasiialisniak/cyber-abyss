# Cyber Abyss — AI Usage Log

This document records how AI tools are used across the project for ideation, code generation, code review, debugging, and testing.

## Team Policy on AI Usage

- AI tools are assistants, not autonomous decision-makers.
- Architectural changes, dependency changes, and shared-file edits require explicit developer approval.
- All AI-generated code, tests, and documentation must be reviewed and verified (via builds, browser tests, or manual inspection) before being accepted or committed.

## Categories of AI Use

- **Ideas & Design**: Exploring gameplay mechanics, edge cases, and architecture trade-offs.
- **Code Generation**: Creating boilerplate, module stubs, and feature implementations within agreed interfaces.
- **Code Review**: Checking existing code for physics edge cases, memory/listener leaks, and contract compliance.
- **Debugging**: Identifying root causes of unexpected behavior (e.g., unreachable fall Game Over, camera clamping).
- **Testing**: Building temporary browser test harnesses and running build/runtime verification checks.

---

## Verified AI Usage History

### 1. Project Architecture & Scaffolding (`2026-11-22`, Commit `031f0e5`)
- **Developer**: Developer 1 — Core Gameplay
- **Tool**: Google Antigravity
- **Purpose**: Code generation, debugging (dependency/doc conflicts), testing
- **Prompt / Task**: Prepare the shared four-developer project structure, Vite + Phaser 3 setup, scene registration, module stubs, and `ARCHITECTURE.md` without implementing full gameplay logic.
- **Generated Result**:
  - Flagged two conflicts before editing: `package.json` had Phaser `4.2.1` instead of Phaser 3, and existing docs described 2 developers instead of 4.
  - After developer approval, pinned `phaser@3.90.0`, updated `package.json` to ES Modules, created `index.html`, `src/main.js`, `src/config.js`, `src/utils/constants.js`, all 4 scenes, all module stubs, and updated `ARCHITECTURE.md`.
- **Human Verification**:
  - Developer 1 approved the Phaser 3 downgrade and keeping other docs untouched initially.
  - Verified with `npm run build`, Vite module transform checks, and an end-to-end browser smoke test (`Boot → Menu → Game → ESC → Game Over → Restart`, 0 console errors).
- **Final Decision**: Accepted and committed in `031f0e5`.

### 2. Documentation Synchronization (`2026-11-22`, Commit `031f0e5`)
- **Developer**: Developer 1 — Core Gameplay
- **Tool**: Google Antigravity
- **Purpose**: Documentation generation and consistency review
- **Prompt / Task**: Synchronize `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, and `TASKS.md` with the four-developer architecture without altering source code or `package.json`.
- **Generated Result**:
  - Updated all four files with four roles, four Git branches, PR workflow, and separation of implemented features vs. stubs.
  - Flagged an ownership mismatch for `public/assets/` between `ARCHITECTURE.md` and `AGENTS.md`.
- **Human Verification**:
  - Developer 1 confirmed the four branch names and decided the asset split (`images/` and `fonts/` → Developer 3; `audio/` → Developer 4).
  - Verified consistency across all five Markdown files via text search.
- **Final Decision**: Accepted after aligning `ARCHITECTURE.md` to match the approved asset split; committed in `031f0e5`.

### 3. Core Gameplay Implementation (`2026-11-22`, Commit `81a801a`)
- **Developer**: Developer 1 — Core Gameplay
- **Tool**: Google Antigravity
- **Purpose**: Code generation and testing
- **Prompt / Task**: Implement horizontal movement in `Player.js` and one-way platform collisions, vertical camera tracking, hazard/fall Game Over, and removal of the temporary `ESC` shortcut in `GameScene.js`.
- **Generated Result**:
  - Implemented Arrow + A/D acceleration/drag movement, world bounds, `player:landed` event, `canLandOn()` process callback, camera tracking, and Game Over handling.
  - Highlighted a limitation during testing: with `startFollow`, the player could fall forever in an empty abyss without leaving the viewport.
- **Human Verification**:
  - Verified via `npm run build` and browser behavior tests (movement, bounds, top/underside platform landings, hazard overlap, restart, `ESC` disabled).
- **Final Decision**: Accepted as base implementation, followed immediately by a focused review of the falling Game Over condition.

### 4. Fall Detection & Camera Design Analysis (`2026-11-22`, Commit `81a801a`)
- **Developer**: Developer 1 — Core Gameplay
- **Tool**: Google Antigravity
- **Purpose**: Ideas & design analysis (no files modified)
- **Prompt / Task**: Analyze why the player could fall forever and propose a simple MVP Game Over condition based on distance below the camera viewport.
- **Generated Result**:
  - Proposed replacing `startFollow` with manual downward-only camera movement capped at `CAMERA_MAX_SPEED = 500 px/s` (below player terminal fall speed `700 px/s`), `FALL_DEATH_MARGIN = 100 px`, and passing `Math.max(cameraBottom, y) + 400` to `WorldGenerator.generateBelow()`.
- **Human Verification**:
  - Developer 1 reviewed the thresholds, recovery window (~3.7 s free fall), and integration impact on `WorldGenerator`, then explicitly approved implementation.
- **Final Decision**: Approved and implemented in `GameScene.js`, then verified in browser tests.

### 5. Core Gameplay Code Review & Targeted Fixes (`2026-11-22`, Commit `81a801a`)
- **Developer**: Developer 1 — Core Gameplay
- **Tool**: Google Antigravity
- **Purpose**: Code review, debugging, and regression testing
- **Prompt / Task**: Audit `Player.js` and `GameScene.js` against 6 criteria (one-way collisions, world bounds, frame-rate independence, false Game Over, restart cleanup, interface compatibility) without modifying files.
- **Generated Result**:
  - Verified narrow/edge/side/underside collisions, 3× restart cleanup, and frame-rate independence.
  - Identified two concrete issues in `GameScene.js`: `camera.setBounds(..., WORLD_HEIGHT)` would clamp the camera at `y = 200000`, and unclamped `delta` in `updateCamera(delta)` allowed large camera jumps on lag spikes.
- **Human Verification**:
  - Developer 1 reviewed the findings and approved fixing only those two issues (`camera.removeBounds()`, `scrollX = 0`, and `delta` clamped to `50 ms`).
  - Re-verified with `npm run build` and browser tests (`delta = 1000 ms` moved `25 px`; `scrollY` advanced to `250025` past `200000`).
- **Final Decision**: Accepted and committed in `81a801a`.

---

## Template for Additional Entries (Developers 2, 3, and 4)

*Use this template to log verified AI usage on `feature/world-systems`, `feature/ui-design` (e.g., OpenAI Codex), and `feature/game-systems`.*

### N. Short Task Title (`YYYY-MM-DD`, Commit/PR)
- **Developer**: Developer X — Role
- **Tool**:
- **Purpose**: *(Ideas / Code Generation / Code Review / Debugging / Testing)*
- **Prompt / Task**:
- **Generated Result**:
- **Human Verification**:
- **Final Decision**: *(Accepted / Modified / Rejected)*
