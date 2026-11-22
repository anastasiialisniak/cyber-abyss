import Phaser from 'phaser';
import { SCENE_KEYS, GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';

/**
 * Main menu. Owner: UI/UX & Visual Design.
 * Contract: must start GameScene via this.scene.start(SCENE_KEYS.GAME).
 */
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.MENU);
  }

  create() {
    // Temporary stub so the architecture can be verified; replace with real UI.
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'CYBER ABYSS\nclick to start', {
        fontSize: '28px',
        color: '#00f0ff',
        align: 'center',
      })
      .setOrigin(0.5);

    this.input.once('pointerdown', () => this.startGame());
    this.input.keyboard.once('keydown-SPACE', () => this.startGame());
  }

  startGame() {
    this.scene.start(SCENE_KEYS.GAME);
  }
}
