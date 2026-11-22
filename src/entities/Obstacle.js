import { COLORS } from '../utils/constants.js';

/**
 * Obstacle entity. Owner: World & Level Systems.
 * Contract: create(x, y), getGameObject(), destroy().
 * `group` is the static physics group owned by GameScene (collisions are set up there).
 */
export default class Obstacle {
  constructor(scene, group = null) {
    this.scene = scene;
    this.group = group;
    this.gameObject = null;
  }

  create(x, y) {
    // Placeholder visual with an Arcade static body. Replace with real sprite.
    this.gameObject = this.scene.add.rectangle(x, y, 24, 24, COLORS.NEON_PINK);
    this.scene.physics.add.existing(this.gameObject, true);
    this.group?.add(this.gameObject);
    return this;
  }

  getGameObject() {
    return this.gameObject;
  }

  destroy() {
    this.gameObject?.destroy();
    this.gameObject = null;
  }
}
