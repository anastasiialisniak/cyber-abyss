import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../utils/constants.js';

const FONT = '"Courier New", monospace';

/** Presentation only. GameScene owns the run. */
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.MENU);
  }

  create() {
    this.starting = false;
    this.cameras.main.setBackgroundColor(COLORS.BACKGROUND);
    const grid = this.add.graphics();
    grid.lineStyle(1, COLORS.NEON_PURPLE, 0.16);
    for (let x = 0; x <= 480; x += 40) grid.lineBetween(x, 0, x, 800);
    for (let y = 0; y <= 800; y += 40) grid.lineBetween(0, y, 480, y);
    const rails = this.add.graphics();
    rails.lineStyle(2, COLORS.NEON_CYAN, 0.3);
    rails.strokePoints([{ x: 16, y: 150 }, { x: 80, y: 680 }, { x: 240, y: 750 }]);
    rails.strokePoints([{ x: 464, y: 150 }, { x: 400, y: 680 }, { x: 240, y: 750 }]);
    const scan = this.add.rectangle(240, 0, 480, 2, COLORS.NEON_CYAN, 0.12);
    this.tweens.add({ targets: scan, y: 800, duration: 6500, repeat: -1 });

    this.label(36, 42, 'CA / DESCENT PROTOCOL', 12, '#00f0ff');
    this.label(444, 42, '01', 12, '#ff2bd6').setOrigin(1, 0);
    this.add.rectangle(36, 72, 408, 1, COLORS.NEON_CYAN, 0.35).setOrigin(0);
    this.label(240, 166, '[ SYSTEM ONLINE ]', 13, '#b5a1ff').setOrigin(0.5);
    const title = this.label(240, 265, 'CYBER\nABYSS', 72, '#ecfbff')
      .setOrigin(0.5).setAlign('center').setFontStyle('bold')
      .setLineSpacing(-10).setShadow(0, 0, '#00f0ff', 22, true, true);
    this.label(240, 382, 'DESCEND INTO THE DIGITAL ABYSS.', 16, '#a6c4d8').setOrigin(0.5);
    this.add.rectangle(240, 426, 42, 3, COLORS.NEON_PINK);

    const button = this.add.container(240, 505);
    const glow = this.add.rectangle(0, 0, 370, 76, COLORS.NEON_CYAN, 0.06);
    const face = this.add.rectangle(0, 0, 348, 60, 0x0a2030)
      .setStrokeStyle(2, COLORS.NEON_CYAN);
    const text = this.label(0, 0, 'START GAME  ↓', 23, '#e8fcff').setOrigin(0.5).setFontStyle('bold');
    button.add([glow, face, text]);
    face.setInteractive({ useHandCursor: true });
    const highlight = (active) => {
      face.setFillStyle(active ? 0x124051 : 0x0a2030);
      glow.setFillStyle(COLORS.NEON_CYAN, active ? 0.16 : 0.06);
      this.tweens.add({ targets: button, scale: active ? 1.025 : 1, duration: 140 });
    };
    face.on('pointerover', () => highlight(true));
    face.on('pointerout', () => highlight(false));
    face.on('pointerdown', () => this.startGame());

    this.label(240, 565, 'PRESS SPACE OR ENTER', 12, '#96a8c5').setOrigin(0.5);
    this.label(240, 635, '[ A / D ]  OR  [ ← / → ]', 19, '#e0eaff').setOrigin(0.5);
    this.label(240, 670, 'MOVE • LAND • KEEP DESCENDING', 13, '#96a8c5').setOrigin(0.5);
    this.label(240, 755, 'NO WAY BACK. ONLY DOWN.', 12, '#b5a1ff').setOrigin(0.5);
    this.tweens.add({ targets: title, alpha: 0.82, duration: 2200, yoyo: true, repeat: -1 });
    button.setAlpha(0).setY(517);
    this.tweens.add({ targets: button, alpha: 1, y: 505, duration: 500, ease: 'Sine.Out' });
    this.cameras.main.fadeIn(350, 5, 5, 15);

    const keyboard = this.input.keyboard;
    keyboard?.on('keydown-SPACE', this.startGame, this);
    keyboard?.on('keydown-ENTER', this.startGame, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      keyboard?.off('keydown-SPACE', this.startGame, this);
      keyboard?.off('keydown-ENTER', this.startGame, this);
    });
  }

  label(x, y, text, size, color) {
    return this.add.text(x, y, text, { fontFamily: FONT, fontSize: size + 'px', color });
  }

  startGame(event) {
    if (this.starting || event?.repeat) return;
    this.starting = true;
    this.scene.start(SCENE_KEYS.GAME);
  }
}
