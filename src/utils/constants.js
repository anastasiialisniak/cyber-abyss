// Shared constants. Add new keys here instead of using magic strings/numbers.

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

export const SCENE_KEYS = Object.freeze({
  BOOT: 'BootScene',
  MENU: 'MenuScene',
  GAME: 'GameScene',
  GAME_OVER: 'GameOverScene',
});

export const GAME_STATES = Object.freeze({
  READY: 'READY',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
});

// Custom events emitted on scene.events / game.events.
export const EVENTS = Object.freeze({
  GAME_START: 'game:start',
  GAME_OVER: 'game:over',
  SCORE_CHANGED: 'score:changed',
});

export const COLORS = Object.freeze({
  BACKGROUND: '#05050f',
  NEON_CYAN: 0x00f0ff,
  NEON_PINK: 0xff2bd6,
  NEON_PURPLE: 0x8a2be2,
});

export const STORAGE_KEYS = Object.freeze({
  BEST_SCORE: 'cyberAbyss.bestScore',
});

export const PHYSICS = Object.freeze({
  GRAVITY_Y: 900,
});
