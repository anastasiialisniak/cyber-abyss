import Phaser from 'phaser';
import { SCENE_KEYS } from '../utils/constants.js';

/**
 * Loads global assets, then starts MenuScene.
 * Put `this.load.*` calls for shared assets in preload().
 */
export default class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.BOOT);
  }

  preload() {
    // TODO(all): load shared assets from public/assets/{images,audio,fonts}.
  }

  create() {
    this.scene.start(SCENE_KEYS.MENU);
  }
}
