import Phaser from 'phaser';
import { SCENE_KEYS, GAME_WIDTH, GAME_STATES } from '../utils/constants.js';
import Player from '../entities/Player.js';
import WorldGenerator from '../systems/WorldGenerator.js';
import ScoreManager from '../systems/ScoreManager.js';
import GameStateManager from '../systems/GameStateManager.js';
import HUD from '../ui/HUD.js';
import AudioManager from '../audio/AudioManager.js';
import ParticleEffects from '../effects/ParticleEffects.js';
import ScreenEffects from '../effects/ScreenEffects.js';

// Depth of the playable world in px. Falling past its end is a game over.
const WORLD_HEIGHT = 200000;
const PLAYER_START_Y = 100;
// Player sits this many px above the screen center while the camera follows.
const CAMERA_LEAD_Y = 200;
// Camera smoothing (per 1/60 s) and the maximum scroll speed in px/s.
// Invariant: CAMERA_MAX_SPEED must stay below the player's terminal fall speed
// (MAX_SPEED_Y in Player.js), otherwise the player can never outrun the camera
// and the fall game over becomes unreachable.
const CAMERA_LERP = 0.1;
const CAMERA_MAX_SPEED = 500;
const MAX_CAMERA_DELTA = 50; // ms cap to avoid large jumps on lag spikes / tab switches
// Falling this far below the bottom of the viewport ends the run.
const FALL_DEATH_MARGIN = 100;
// Extra px below max(camera bottom, player) passed to WorldGenerator.generateBelow().
const GENERATION_MARGIN = 400;
// Platforms are one-way: tolerance (px) for 'was above the platform top last frame'.
const LANDING_TOLERANCE = 4;

/**
 * Central scene (owner: Core Gameplay). Only wires modules together;
 * module logic lives in the modules themselves.
 *
 * Lifecycle: create() -> update() every frame -> endGame() -> GameOverScene.
 * All objects are rebuilt in create(), so restarting the scene is clean.
 */
export default class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME);
  }

  create() {
    // The abyss is open vertically: only left/right world bounds collide.
    this.physics.resume();
    this.physics.world.setBounds(0, 0, GAME_WIDTH, WORLD_HEIGHT);
    this.physics.world.setBoundsCollision(true, true, false, false);

    this.platforms = this.physics.add.staticGroup();
    this.obstacles = this.physics.add.staticGroup();

    this.stateManager = new GameStateManager();
    this.scoreManager = new ScoreManager();
    this.audio = new AudioManager(this);
    this.particles = new ParticleEffects(this);
    this.screenEffects = new ScreenEffects(this);
    this.hud = new HUD(this);

    this.player = new Player(this).create(GAME_WIDTH / 2, PLAYER_START_Y);
    this.worldGenerator = new WorldGenerator(this, this.platforms, this.obstacles);
    this.worldGenerator.generateInitialWorld();

    this.setupCollisions();
    this.setupCamera();

    this.hud.updateScore(this.scoreManager.getScore());
    this.hud.updateBestScore(this.scoreManager.getBestScore());

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanup, this);

    this.stateManager.startGame();
  }

  update(time, delta) {
    if (this.stateManager.getState() !== GAME_STATES.PLAYING) {
      return;
    }

    this.player.update(time, delta);

    const { y } = this.player.getPosition();
    const score = this.scoreManager.updateScore(y);
    this.hud.updateScore(score);
    this.hud.updateBestScore(this.scoreManager.getBestScore());

    this.updateCamera(delta);

    const camera = this.cameras.main;
    const cameraTop = camera.scrollY;
    const cameraBottom = cameraTop + camera.height;
    this.worldGenerator.generateBelow(Math.max(cameraBottom, y) + GENERATION_MARGIN);
    this.worldGenerator.cleanup(cameraTop);

    // Outran the camera and left the viewport (or reached the end of the world).
    if (y > cameraBottom + FALL_DEATH_MARGIN) {
      this.endGame();
    }
  }

  // Vertical-only camera: smoothly follows the player, scrolls down only,
  // and never faster than CAMERA_MAX_SPEED so a long fall outruns it.
  updateCamera(delta) {
    const camera = this.cameras.main;
    const dt = Phaser.Math.Clamp(delta, 0, MAX_CAMERA_DELTA);
    const targetY = this.player.getPosition().y - CAMERA_LEAD_Y;
    const smoothing = 1 - Math.pow(1 - CAMERA_LERP, dt / (1000 / 60));
    const maxStep = (CAMERA_MAX_SPEED * dt) / 1000;
    const step = Phaser.Math.Clamp((targetY - camera.scrollY) * smoothing, 0, maxStep);
    camera.scrollX = 0;
    camera.scrollY += step;
  }

  // Ends the run once and hands results over to GameOverScene.
  endGame() {
    if (this.stateManager.getState() !== GAME_STATES.PLAYING) {
      return;
    }
    this.stateManager.endGame();
    this.physics.pause();
    this.audio.stopMusic();
    this.scene.start(SCENE_KEYS.GAME_OVER, {
      score: this.scoreManager.getScore(),
      bestScore: this.scoreManager.getBestScore(),
    });
  }

  setupCollisions() {
    const playerObject = this.player.getGameObject();

    // One-way platforms: solid only when falling onto them from above.
    this.physics.add.collider(playerObject, this.platforms, null, this.canLandOn, this);

    // Any hazard ends the run (endGame is idempotent).
    this.physics.add.overlap(playerObject, this.obstacles, () => this.endGame());
  }

  // Collider process callback: return false to ignore the contact.
  canLandOn(playerObject, platformObject) {
    const body = playerObject.body;
    const movingDown = body.velocity.y >= 0;
    const wasAbove = body.prev.y + body.height <= platformObject.body.top + LANDING_TOLERANCE;
    return movingDown && wasAbove;
  }

  setupCamera() {
    const camera = this.cameras.main;
    // No vertical camera bounds so the abyss has no artificial depth limit;
    // horizontal position stays fixed at scrollX = 0 and updateCamera() drives scrollY.
    camera.removeBounds();
    camera.setScroll(0, 0);
  }

  cleanup() {
    this.hud?.destroy();
    this.player?.destroy();
    this.particles?.destroy();
    this.screenEffects?.destroy();
  }
}



