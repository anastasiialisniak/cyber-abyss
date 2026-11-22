import { COLORS } from '../utils/constants.js';

/**
 * Platform entity. Owner: World & Level Systems.
 * Contract: create(x, y, width), getGameObject(), destroy().
 * `group` is the static physics group owned by GameScene (collisions are set up there).
 */
export default class Platform {
  constructor(scene, group = null) {
    this.scene = scene;
    this.group = group;
    this.gameObject = null;
  }

  create(x, y, width = 100) {
    // Placeholder visual with an Arcade static body. Replace with real sprite.
    this.gameObject = this.scene.add.rectangle(x, y, width, 16, COLORS.NEON_PURPLE);
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
