import Phaser from 'phaser';
import { SCENE_KEYS, GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

/**
 * Game Over screen. Owner: UI/UX & Visual Design.
 * Receives data: { score, bestScore } from GameScene.
 * Contract: provides a restart action that starts GameScene again.
 */
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME_OVER);
  }

  init(data) {
    this.finalScore = data?.score ?? 0;
    this.bestScore = data?.bestScore ?? 0;
  }

  create() {
    // Temporary stub; replace with real UI.
    this.add
      .text(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        `GAME OVER\nScore: ${this.finalScore}\nBest: ${this.bestScore}\nclick to restart`,
        { fontSize: '28px', color: '#ff2bd6', align: 'center' }
      )
      .setOrigin(0.5);

    this.input.once('pointerdown', () => this.restart());
    this.input.keyboard.once('keydown-SPACE', () => this.restart());
  }

  restart() {
    this.scene.start(SCENE_KEYS.GAME);
  }
}
