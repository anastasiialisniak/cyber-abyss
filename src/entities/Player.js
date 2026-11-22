import Phaser from 'phaser';
import { COLORS } from '../utils/constants.js';

const SIZE = 24;
const ACCELERATION_X = 1800; // px/s^2 while a direction key is held
const DRAG_X = 1400; // px/s^2 deceleration when no key is held
const MAX_SPEED_X = 280; // px/s
const MAX_SPEED_Y = 700; // terminal fall speed, px/s

/** Emitted once on scene.events each time the player lands on something. */
export const PLAYER_LANDED_EVENT = 'player:landed';

/**
 * Player entity. Owner: Core Gameplay.
 * Contract: create(x, y), update(time, delta), getPosition(), getGameObject(), destroy().
 *
 * Movement: left/right (Arrow keys or A/D) with acceleration and drag. No jumping.
 * Horizontal limits come from the Arcade world bounds configured by GameScene.
 */
export default class Player {
  constructor(scene) {
    this.scene = scene;
    this.gameObject = null;
    this.cursors = null;
    this.keys = null;
    this.isGrounded = false;
  }

  create(x, y) {
    // Placeholder visual with an Arcade dynamic body. Replace with real sprite.
    this.gameObject = this.scene.add.rectangle(x, y, SIZE, SIZE, COLORS.NEON_CYAN);
    this.scene.physics.add.existing(this.gameObject);

    const body = this.gameObject.body;
    body.setCollideWorldBounds(true);
    body.setMaxVelocity(MAX_SPEED_X, MAX_SPEED_Y);
    body.setDragX(DRAG_X);

    const keyboard = this.scene.input.keyboard;
    this.cursors = keyboard.createCursorKeys();
    this.keys = keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    return this;
  }

  // Called every frame by GameScene.update(time, delta).
  update(time, delta) { // eslint-disable-line no-unused-vars
    if (!this.gameObject?.body) {
      return;
    }
    const body = this.gameObject.body;

    const left = this.cursors.left.isDown || this.keys.left.isDown;
    const right = this.cursors.right.isDown || this.keys.right.isDown;
    body.setAccelerationX(((right ? 1 : 0) - (left ? 1 : 0)) * ACCELERATION_X);

    // Emit the landing event only on the airborne -> grounded transition.
    const grounded = body.blocked.down || body.touching.down;
    if (grounded && !this.isGrounded) {
      this.scene.events.emit(PLAYER_LANDED_EVENT, this.getPosition());
    }
    this.isGrounded = grounded;
  }

  getPosition() {
    return { x: this.gameObject.x, y: this.gameObject.y };
  }

  getGameObject() {
    return this.gameObject;
  }

  destroy() {
    const keyboard = this.scene.input?.keyboard;
    if (keyboard) {
      Object.values(this.cursors ?? {}).forEach((key) => keyboard.removeKey(key, true));
      Object.values(this.keys ?? {}).forEach((key) => keyboard.removeKey(key, true));
    }
    this.cursors = null;
    this.keys = null;
    this.gameObject?.destroy();
    this.gameObject = null;
  }
}
