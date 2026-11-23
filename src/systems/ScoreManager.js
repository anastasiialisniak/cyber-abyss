/**
* Score tracking.
* Pure logic, no Phaser dependency.
*/

export default class ScoreManager {
  constructor() {
    this.score = 0;
    this.bestScore = this.loadBestScore();
    this.startY = null;
  }

  loadBestScore() {
    try {
      return Number(localStorage.getItem('cyberAbyssBestScore')) || 0;
    } catch {
      return 0;
    }
  }

  updateScore(playerY) {
    if (!Number.isFinite(playerY)) {
      return this.score;
    }

    if (this.startY === null) {
      this.startY = playerY;
    }

    const distance = Math.max(0, playerY - this.startY);
    this.score = Math.floor(distance / 10);

    if (this.score > this.bestScore) { 
      this.bestScore = this.score;

      try {
        localStorage.setItem(
          'cyberAbyssBestScore',
          String(this.bestScore)
        );
      } catch {
        // Saving may be unavailable in some browsers.
      }
    }

    return this.score;
  }

  getScore() {
    return this.score;
  }

  getBestScore() {
    return this.bestScore;
  }

  reset() {
    this.score = 0;
    this.startY = null;
  }
}
