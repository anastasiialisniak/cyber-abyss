import { COLORS } from '../utils/constants.js';

/**
 * Player entity. Owner: Core Gameplay.
 * Contract: create(x, y), update(time, delta), getPosition(), getGameObject(), destroy().
 */
export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.gameObject = null;
  }

  create(x, y) {
    // Placeholder visual with an Arcade dynamic body. Replace with real sprite.
    this.gameObject = this.scene.add.rectangle(x, y, 24, 24, COLORS.NEON_CYAN);
    this.scene.physics.add.existing(this.gameObject);
    return this;
  }

  // Called every frame by GameScene.update(time, delta). Movement goes here.
  update(time, delta) {} // eslint-disable-line no-unused-vars

  getPosition() {
    return { x: this.gameObject.x, y: this.gameObject.y };
  }

  getGameObject() {
    return this.gameObject;
  }

  destroy() {
    this.gameObject?.destroy();
    this.gameObject = null;
  }
}
