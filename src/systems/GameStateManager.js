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
    if (this.state !== GAME_STATES.READY) return;

    this.state = GAME_STATES.PLAYING;
  }

  endGame() {
    if (this.state !== GAME_STATES.PLAYING) return;

    this.state = GAME_STATES.GAME_OVER;
  }

  getState() {
    return this.state;
  }
}