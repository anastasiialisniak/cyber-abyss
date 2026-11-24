
/**
 * Score tracking.
 * Pure logic, no Phaser dependency.
 */

import { STORAGE_KEYS } from '../utils/constants.js';

export default class ScoreManager {
  constructor() {
    this.score = 0;
    this.bestScore = this.loadBestScore();
    this.startY = null;
  }

  loadBestScore() {
    try {
      const storedScore = Number(
        localStorage.getItem(STORAGE_KEYS.BEST_SCORE)
      );

      if (
        !Number.isFinite(storedScore) ||
        !Number.isInteger(storedScore) ||
        storedScore < 0
      ) {
        return 0;
      }

      return storedScore;
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
    const calculatedScore = Math.floor(distance / 10);

    this.score = Math.max(this.score, calculatedScore);

    if (this.score > this.bestScore) {
      this.bestScore = this.score;

      try {
        localStorage.setItem(
          STORAGE_KEYS.BEST_SCORE,
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
