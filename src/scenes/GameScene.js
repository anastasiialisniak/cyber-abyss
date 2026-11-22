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
    this.platforms = this.physics.add.staticGroup();
    this.obstacles = this.physics.add.staticGroup();

    this.stateManager = new GameStateManager();
    this.scoreManager = new ScoreManager();
    this.audio = new AudioManager(this);
    this.particles = new ParticleEffects(this);
    this.screenEffects = new ScreenEffects(this);
    this.hud = new HUD(this);

    this.player = new Player(this).create(GAME_WIDTH / 2, 100);
    this.worldGenerator = new WorldGenerator(this, this.platforms, this.obstacles);
    this.worldGenerator.generateInitialWorld();

    // TODO(Core Gameplay): add colliders, e.g.
    //   this.physics.add.collider(this.player.getGameObject(), this.platforms);
    //   this.physics.add.overlap(this.player.getGameObject(), this.obstacles, () => this.endGame());

    this.hud.updateScore(this.scoreManager.getScore());
    this.hud.updateBestScore(this.scoreManager.getBestScore());

    // Dev-only shortcut to verify the GameOver flow until real game-over conditions exist.
    this.input.keyboard.once('keydown-ESC', () => this.endGame());

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

    const cameraTop = this.cameras.main.scrollY;
    this.worldGenerator.generateBelow(cameraTop + this.cameras.main.height);
    this.worldGenerator.cleanup(cameraTop);
  }

  // Ends the run once and hands results over to GameOverScene.
  endGame() {
    if (this.stateManager.getState() !== GAME_STATES.PLAYING) {
      return;
    }
    this.stateManager.endGame();
    this.audio.stopMusic();
    this.scene.start(SCENE_KEYS.GAME_OVER, {
      score: this.scoreManager.getScore(),
      bestScore: this.scoreManager.getBestScore(),
    });
  }

  cleanup() {
    this.hud?.destroy();
    this.player?.destroy();
    this.particles?.destroy();
    this.screenEffects?.destroy();
  }
}

