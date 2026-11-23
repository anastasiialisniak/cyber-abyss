
/**
 * Screen effects: shake and flash.
 * Owner: Game Systems, Effects & QA.
 */

export default class ScreenEffects {
  constructor(scene) {
    this.scene = scene;
  }

  shake(duration = 200, intensity = 0.01) {
    if (!this.scene?.cameras?.main) return;

    this.scene.cameras.main.shake(duration, intensity);
  }

  flash(duration = 150, color = 0x00ffff) {
    if (!this.scene?.cameras?.main) return;

    const red = (color >> 16) & 255;
    const green = (color >> 8) & 255;
    const blue = color & 255;

    this.scene.cameras.main.flash(
      duration,
      red,
      green,
      blue
    );
  }

  destroy() {
    if (!this.scene?.cameras?.main) return;

    this.scene.cameras.main.stopShake();
    this.scene.cameras.main.stopFlash();
  }
}
