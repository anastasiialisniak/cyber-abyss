/**
 * Audio facade over Phaser's sound manager. Owner: Game Systems, Effects & QA.
 * Contract: playSound(key), playMusic(key), stopMusic().
 * Must not throw if an audio key is not loaded yet.
 */
export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = null;
  }

  playSound(key) {} // eslint-disable-line no-unused-vars

  playMusic(key) {} // eslint-disable-line no-unused-vars

  stopMusic() {}
}
