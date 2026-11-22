# cyber-abyss

# 🎮 Cyber Abyss

**Descend into the digital abyss. Survive as long as you can.**

Cyber Abyss is a 2D vertical falling platformer set in a futuristic cyberpunk world.

The player descends through a mysterious digital abyss, landing on platforms, avoiding dangerous obstacles and trying to achieve the highest score.

## ✨ Core Features

Planned features (see [Project Status](#-project-status) for what already works):

- Dynamic player movement and physics
- Procedurally generated platforms
- Obstacles and hazards
- Dynamic camera movement
- Score and best score system
- Cyberpunk atmosphere and neon visual effects

## 🛠️ Tech Stack

- JavaScript (ES Modules)
- Phaser 3 (pinned to 3.90.0)
- Phaser Arcade Physics
- Vite
- HTML5
- CSS3

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/anastasiialisniak/cyber-abyss.git
cd cyber-abyss
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## 📁 Project Structure

The project follows a modular architecture.

```text
index.html
src/
├── main.js, config.js
├── scenes/     BootScene, MenuScene, GameScene, GameOverScene
├── entities/   Player, Platform, Obstacle
├── systems/    WorldGenerator, ScoreManager, GameStateManager
├── ui/         HUD
├── effects/    ParticleEffects, ScreenEffects
├── audio/      AudioManager
├── styles/     style.css
└── utils/      constants.js
public/assets/  images/, audio/, fonts/
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for technical details, module contracts and scene flow.

## 👥 Team

Developed by a team of four for a hackathon.

### Development Roles

| # | Role | Branch | Main modules |
|---|------|--------|--------------|
| 1 | Core Gameplay — player, physics, camera, `GameScene` | `feature/game-core` | `Player`, `GameScene`, `BootScene`, `main.js`, `config.js` |
| 2 | World & Level Systems — platforms, obstacles, world generation | `feature/world-systems` | `Platform`, `Obstacle`, `WorldGenerator` |
| 3 | UI/UX & Visual Design — interface, visual effects and game presentation | `feature/ui-design` | `MenuScene`, `GameOverScene`, `HUD`, CSS, assets |
| 4 | Game Systems, Effects & QA — score, game state, audio, effects, testing | `feature/game-systems` | `ScoreManager`, `GameStateManager`, `AudioManager`, `effects/` |

Exact file ownership is listed in [AGENTS.md](AGENTS.md).

## 🤝 Development Guidelines

Work in your own feature branch and integrate through Pull Requests into `main`.

See:

- [ARCHITECTURE.md](ARCHITECTURE.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [TASKS.md](TASKS.md)
- [AGENTS.md](AGENTS.md)

## 📌 Project Status

In development. The architectural foundation is in place; gameplay is not implemented yet.

**Implemented (foundation):**

- Vite + Phaser 3 setup and game configuration.
- Registration of `BootScene`, `MenuScene`, `GameScene` and `GameOverScene` and the flow Boot → Menu → Game → Game Over → Game (restart), passing `{ score, bestScore }` to Game Over.
- `GameScene` lifecycle: creates all modules, runs the update loop only while the state is `PLAYING`, cleans up on shutdown.
- Shared constants (`src/utils/constants.js`).
- `GameStateManager` states: `READY`, `PLAYING`, `GAME_OVER`.

**Stubs (contracts exist, logic is not implemented):**

- `Player`, `Platform`, `Obstacle` (placeholder rectangles), `WorldGenerator`.
- `ScoreManager`, `AudioManager`, `ParticleEffects`, `ScreenEffects`.
- `HUD`, `MenuScene`, `GameOverScene` (plain text placeholders).
- A temporary dev-only `ESC` key in `GameScene` ends the run until real game-over conditions exist.

**Not started:** player movement, collisions, camera, procedural generation, scoring, audio, visual polish. See [TASKS.md](TASKS.md).
