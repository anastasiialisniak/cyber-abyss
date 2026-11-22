# Cyber Abyss — System Architecture

## 1. Project Overview

Cyber Abyss is a 2D vertical falling platformer with a cyberpunk atmosphere.

The player descends through a digital abyss, lands on platforms, avoids obstacles and tries to achieve the highest score.

The game is designed as a browser-based application.

## 2. Technology Stack

- JavaScript (ES Modules)
- Phaser 3
- Phaser Arcade Physics
- Vite
- HTML5
- CSS3

No additional frameworks or dependencies should be introduced without agreement between both developers.

## 3. Architecture Principles

The project follows a modular architecture.

Each module has one primary responsibility.

Main principles:

- Separation of gameplay logic and UI.
- Reusable game entities.
- Clear component interfaces.
- Minimal dependencies between modules.
- Centralized configuration.
- Consistent naming conventions.

## 4. Project Structure

```text
cyber-abyss/
│
├── public/
│   └── assets/
│       ├── images/
│       ├── sprites/
│       └── sounds/
│
├── src/
│   ├── main.js
│   ├── config.js
│   │
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── MenuScene.js
│   │   ├── GameScene.js
│   │   └── GameOverScene.js
│   │
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Platform.js
│   │   └── Obstacle.js
│   │
│   ├── systems/
│   │   └── WorldGenerator.js
│   │
│   ├── ui/
│   │   └── HUD.js
│   │
│   ├── styles/
│   │   └── style.css
│   │
│   └── utils/
│       └── constants.js
│
├── .agent/
│   └── rules/
│       └── project-rules.md
│
├── AGENTS.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── TASKS.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

## 5. Module Responsibilities

### 5.1 main.js

Application entry point.

Responsibilities:

- Initialize the Phaser game.
- Import the game configuration.
- Register game scenes.

### 5.2 config.js

Central Phaser configuration.

Responsibilities:

- Set canvas dimensions.
- Configure Arcade Physics.
- Define rendering settings.
- Register initial scenes.

### 5.3 BootScene.js

Initial game preparation.

Responsibilities:

- Load required assets.
- Prepare resources.
- Transition to MenuScene.

### 5.4 MenuScene.js

Main menu.

Responsibilities:

- Display game title.
- Display Play button.
- Display basic instructions.
- Start GameScene.

### 5.5 GameScene.js

Main gameplay controller.

Responsibilities:

- Create gameplay entities.
- Initialize the world.
- Manage gameplay updates.
- Control camera movement.
- Coordinate game systems.
- Update HUD.
- Detect game over.
- Pass final results to GameOverScene.

GameScene coordinates gameplay but should not contain all entity and generation logic.

### 5.6 Player.js

Player entity.

Responsibilities:

- Create player object.
- Handle horizontal movement.
- Apply movement limits.
- Handle player physics.
- Expose player position and state.

### 5.7 Platform.js

Platform entity.

Responsibilities:

- Create platforms.
- Configure platform collision behavior.
- Define platform types if needed.
- Handle platform-specific properties.

### 5.8 Obstacle.js

Obstacle entity.

Responsibilities:

- Create hazards.
- Define obstacle behavior.
- Configure collision properties.

### 5.9 WorldGenerator.js

Procedural world generation system.

Responsibilities:

- Generate platforms.
- Generate obstacles.
- Control platform spacing.
- Manage generated world objects.
- Remove objects outside the active camera area.

### 5.10 HUD.js

Heads-up display.

Responsibilities:

- Display current score.
- Display best score.
- Update score information.
- Clean up UI objects.

HUD must not control player physics or gameplay mechanics.

### 5.11 GameOverScene.js

Game over interface.

Responsibilities:

- Display final score.
- Display best score.
- Provide Restart button.
- Return to a new game session.

### 5.12 constants.js

Centralized game constants.

Responsibilities:

- Store shared gameplay values.
- Store configuration constants.
- Avoid unnecessary hardcoded values.

## 6. Scene Flow

The game follows this
