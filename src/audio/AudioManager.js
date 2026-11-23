
/**
 * Audio facade over Phaser's sound manager.
 * Owner: Game Systems, Effects & QA.
 *
 * Contract: playSound(key), playMusic(key), stopMusic().
 * Must not throw if an audio key is not loaded yet.
 */

export default class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = null;
  }

  playSound(key) {
    if (!this.scene?.sound || !key) return;

    try {
      if (!this.scene.cache.audio.exists(key)) return;

      this.scene.sound.play(key);
    } catch (error) {
      console.warn(`Could not play sound "${key}":`, error);
    }
  }

  playMusic(key) {
    if (!this.scene?.sound || !key) return;

    try {
      if (!this.scene.cache.audio.exists(key)) return;

      if (this.music?.key === key && this.music.isPlaying) return;

      this.stopMusic();

      this.music = this.scene.sound.add(key, {
        loop: true,
        volume: 0.5,
      });

      this.music.play();
    } catch (error) {
      console.warn(`Could not play music "${key}":`, error);
      this.music = null;
    }
  }

  stopMusic() {
    if (!this.music) return;

    try {
      this.music.stop();
      this.music.destroy();
    } catch (error) {
      console.warn('Could not stop music:', error);
    }

    this.music = null;
  }
}
