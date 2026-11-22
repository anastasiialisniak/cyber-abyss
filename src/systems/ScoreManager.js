/**
 * Score tracking. Owner: Game Systems, Effects & QA.
 * Pure logic, no Phaser dependency.
 * Contract: updateScore(playerY) -> number, getScore(), getBestScore(), reset().
 * reset() clears the current score only; the best score is kept.
 */
export default class ScoreManager {
  constructor() {
    this.score = 0;
    this.bestScore = 0;
  }

  // Called each frame with the player's world Y. Returns the current score.
  updateScore(playerY) { // eslint-disable-line no-unused-vars
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
  }
}
