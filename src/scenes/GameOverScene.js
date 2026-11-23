import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../utils/constants.js';

const FONT = 'Rajdhani, "Courier New", monospace';

/** Receives results from GameScene; never computes or persists scores. */
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME_OVER);
  }

  init(data) {
    this.finalScore = data?.score ?? 0;
    this.bestScore = data?.bestScore ?? 0;
  }

  create() {
    this.restarting = false;
    this.cameras.main.setBackgroundColor(COLORS.BACKGROUND);
    const grid = this.add.graphics();
    grid.lineStyle(1, COLORS.NEON_PURPLE, 0.15);
    for (let y = 0; y < 800; y += 40) grid.lineBetween(0, y, 480, y);
    grid.lineStyle(1, COLORS.NEON_PINK, 0.25);
    grid.strokeRect(22, 22, 436, 756);
    this.label(240, 65, 'CA / CONNECTION LOST', 13, '#ff91dc').setOrigin(0.5);

    const heading = this.add.container(240, 207);
    heading.add([
      this.label(0, -55, '[ RUN TERMINATED ]', 13, '#b5a1ff').setOrigin(0.5),
      this.label(0, 0, 'GAME OVER', 52, '#fff0fb').setOrigin(0.5)
        .setFontStyle('bold').setShadow(0, 0, '#ff2bd6', 18, true, true),
      this.label(0, 60, 'THE ABYSS REMEMBERS.', 14, '#a6c4d8').setOrigin(0.5),
    ]);

    const results = this.add.container(240, 405);
    const scoreText = this.label(0, -20, String(this.finalScore), 48, '#effcff').setOrigin(0.5).setFontStyle('bold');
    const bestText = this.label(148, 55, String(this.bestScore), 24, '#ffffff').setOrigin(1, 0.5);
    results.add([
      this.add.rectangle(0, 0, 360, 190, 0x0b1226).setStrokeStyle(1, COLORS.NEON_PURPLE, 0.8),
      this.add.rectangle(-179, 0, 3, 190, COLORS.NEON_CYAN),
      this.label(0, -62, 'FINAL SCORE', 14, '#a6c4d8').setOrigin(0.5),
      scoreText,
      this.add.rectangle(0, 27, 300, 1, COLORS.NEON_PURPLE, 0.5),
      this.label(-148, 55, 'BEST SCORE', 15, '#ff91dc').setOrigin(0, 0.5),
      bestText,
    ]);
    if (scoreText.width > 300) scoreText.setScale(300 / scoreText.width);
    if (bestText.width > 170) bestText.setScale(170 / bestText.width);

    const button = this.add.container(240, 580);
    const face = this.add.rectangle(0, 0, 348, 60, 0x25132c).setStrokeStyle(2, COLORS.NEON_PINK);
    button.add([face, this.label(0, 0, 'RESTART  ↻', 26, '#fff0fb').setOrigin(0.5).setFontStyle('bold')]);
    face.setInteractive({ useHandCursor: true });
    const highlight = (active) => {
      face.setFillStyle(active ? 0x48203f : 0x25132c);
      this.tweens.add({ targets: button, scale: active ? 1.025 : 1, duration: 140 });
    };
    face.on('pointerover', () => highlight(true));
    face.on('pointerout', () => highlight(false));
    face.on('pointerdown', () => this.restart());
    this.label(240, 634, 'PRESS SPACE OR ENTER', 12, '#96a8c5').setOrigin(0.5);
    this.label(240, 725, 'RECONNECT. DESCEND. REPEAT.', 13, '#b5a1ff').setOrigin(0.5);

    [heading, results, button].forEach((element, index) => {
      const y = element.y;
      element.setAlpha(0).setY(y + 14);
      this.tweens.add({ targets: element, alpha: 1, y, duration: 450, delay: index * 110, ease: 'Sine.Out' });
    });
    this.cameras.main.fadeIn(250, 5, 5, 15);
    const keyboard = this.input.keyboard;
    keyboard?.on('keydown-SPACE', this.restart, this);
    keyboard?.on('keydown-ENTER', this.restart, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      keyboard?.off('keydown-SPACE', this.restart, this);
      keyboard?.off('keydown-ENTER', this.restart, this);
    });
  }

  label(x, y, text, size, color) {
    return this.add.text(x, y, text, { fontFamily: FONT, fontSize: Math.max(size, 16) + 'px', color });
  }

  restart(event) {
    if (this.restarting || event?.repeat) return;
    this.restarting = true;
    this.scene.start(SCENE_KEYS.GAME);
  }
}
