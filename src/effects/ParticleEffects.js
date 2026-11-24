
/**
 * Particle effects.
 * Owner: Game Systems, Effects & QA.
 */

export default class ParticleEffects {
  constructor(scene) {
    this.scene = scene;
    this.activeParticles = new Set();
  }

  createLandingBurst(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    if (!this.scene?.add || !this.scene?.tweens) {
      return;
    }

    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 25;

      const particle = this.scene.add.circle(
        x,
        y,
        3,
        0x00ffff,
        1
      );

      this.activeParticles.add(particle);

      this.scene.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.2,
        duration: 350,
        onComplete: () => {
          this.activeParticles.delete(particle);
          particle?.destroy?.();
        },
      });
    }
  }

  destroy() {
    const tweens = this.scene?.tweens;

    this.activeParticles.forEach((particle) => {
      if (tweens && particle) {
        tweens.killTweensOf?.(particle);
      }

      particle?.destroy?.();
    });

    this.activeParticles.clear();
  }
}
