import { GAME_STATES } from '../utils/constants.js';

/**
 * Game state machine. Owner: Game Systems, Effects & QA.
 * Pure logic: never starts Phaser scenes. GameScene reacts to state changes.
 * Contract: startGame(), endGame(), getState().
 */
export default class GameStateManager {
  constructor() {
    this.state = GAME_STATES.READY;
  }

  startGame() {
    this.state = GAME_STATES.PLAYING;
  }

  endGame() {
    this.state = GAME_STATES.GAME_OVER;
  }

  getState() {
    return this.state;
  }
}
