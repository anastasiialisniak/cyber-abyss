/**
 * In-game HUD. Owner: UI/UX & Visual Design.
 * Contract: updateScore(score), updateBestScore(bestScore), destroy().
 * Created and updated by GameScene. Must stay fixed to the camera (scrollFactor 0).
 */
export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.scoreText = scene.add.text(12, 12, 'Score: 0', { fontSize: '18px', color: '#00f0ff' }).setScrollFactor(0).setDepth(100);
    this.bestText = scene.add.text(12, 36, 'Best: 0', { fontSize: '14px', color: '#ff2bd6' }).setScrollFactor(0).setDepth(100);
  }

  updateScore(score) {
    this.scoreText.setText(`Score: ${score}`);
  }

  updateBestScore(bestScore) {
    this.bestText.setText(`Best: ${bestScore}`);
  }

  destroy() {
    this.scoreText.destroy();
    this.bestText.destroy();
  }
}
