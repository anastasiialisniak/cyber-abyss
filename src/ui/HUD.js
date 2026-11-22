import { COLORS } from '../utils/constants.js';

/** GameScene supplies all values and owns the HUD lifecycle. */
export default class HUD {
  constructor(scene) {
    const style = { fontFamily: '"Courier New", monospace', fontSize: '12px', color: '#a6c4d8' };
    this.root = scene.add.container(16, 16).setScrollFactor(0).setDepth(100);
    const panel = scene.add.rectangle(0, 0, 448, 78, 0x080f20, 0.96)
      .setOrigin(0).setStrokeStyle(1, COLORS.NEON_PURPLE, 0.7);
    this.scoreText = scene.add.text(16, 30, '0', { ...style, fontSize: '30px', color: '#effcff', fontStyle: 'bold' });
    this.bestText = scene.add.text(432, 34, '0', { ...style, fontSize: '24px', color: '#fff0fb' }).setOrigin(1, 0);
    this.root.add([
      panel,
      scene.add.rectangle(0, 0, 3, 78, COLORS.NEON_CYAN).setOrigin(0),
      scene.add.text(16, 12, 'SCORE / DESCENT', style),
      scene.add.text(432, 12, 'BEST SCORE', { ...style, color: '#ff91dc' }).setOrigin(1, 0),
      this.scoreText,
      this.bestText,
    ]);
    this.score = null;
    this.bestScore = null;
  }

  updateScore(score) {
    if (score === this.score) return;
    this.score = score;
    this.setValue(this.scoreText, score);
  }

  updateBestScore(bestScore) {
    if (bestScore === this.bestScore) return;
    this.bestScore = bestScore;
    this.setValue(this.bestText, bestScore);
  }

  setValue(label, value) {
    label.setText(String(value)).setScale(1);
    if (label.width > 195) label.setScale(195 / label.width);
  }

  destroy() {
    this.root?.destroy();
    this.root = null;
  }
}
