import { GAME_WIDTH, GAME_HEIGHT } from '../utils/constants.js';
import Platform from '../entities/Platform.js';
import Obstacle from '../entities/Obstacle.js';

/**
 * Procedural world. Owner: World & Level Systems.
 * Contract: generateInitialWorld(), generateBelow(y), cleanup(cameraY).
 * Creates Platform/Obstacle entities and adds them to the groups given by GameScene.
 */
export default class WorldGenerator {
  constructor(scene, platformGroup, obstacleGroup) {
    this.scene = scene;
    this.platformGroup = platformGroup;
    this.obstacleGroup = obstacleGroup;
    this.platforms = [];
    this.obstacles = [];
    this.generatedThroughY = null;
    this.lastPlatformX = GAME_WIDTH / 2;
  }

  // Build the starting area (called once per run).
  generateInitialWorld() {
    if (this.generatedThroughY !== null) {
      return;
    }

    // The player starts at y=100; this first platform catches the initial fall.
    this.addPlatform(GAME_WIDTH / 2, 165, PLATFORM_MAX_WIDTH);
    this.generatedThroughY = 165;
    this.generateBelow(GAME_HEIGHT + 400);
  }

  // Generate content below world-Y `y` (called as the camera descends).
  generateBelow(y) {
    if (!Number.isFinite(y)) {
      return;
    }
    if (this.generatedThroughY === null) {
      this.generateInitialWorld();
    }

    while (this.generatedThroughY < y) {
      const gap = randomBetween(PLATFORM_MIN_GAP, PLATFORM_MAX_GAP);
      const platformY = this.generatedThroughY + gap;
      const halfWidth = PLATFORM_MAX_WIDTH / 2;
      const minX = Math.max(halfWidth, this.lastPlatformX - MAX_HORIZONTAL_SHIFT);
      const maxX = Math.min(GAME_WIDTH - halfWidth, this.lastPlatformX + MAX_HORIZONTAL_SHIFT);
      const x = randomBetween(Math.ceil(minX), Math.floor(maxX));
      const width = randomBetween(PLATFORM_MIN_WIDTH, PLATFORM_MAX_WIDTH);

      this.addPlatform(x, platformY, width);
      this.generatedThroughY = platformY;
      this.lastPlatformX = x;
    }
  }

  // Destroy objects that are above `cameraY` (the camera's top edge).
  cleanup(cameraY) {
    if (!Number.isFinite(cameraY)) {
      return;
    }
    const cutoffY = cameraY - CLEANUP_BUFFER;
    this.platforms = this.removePassedObjects(this.platforms, cutoffY);
    this.obstacles = this.removePassedObjects(this.obstacles, cutoffY);
  }

  addPlatform(x, y, width) {
    const platform = new Platform(this.scene, this.platformGroup).create(x, y, width);
    this.platforms.push({ entity: platform, y });

    // Keep occasional hazards at an edge, leaving a wide clear landing area.
    if (width >= PLATFORM_MIN_WIDTH + 8 && Math.random() < OBSTACLE_CHANCE) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const obstacleX = x + side * (width / 2 - EDGE_CLEARANCE);
      const obstacleY = y - PLATFORM_HALF_HEIGHT - 12;
      const obstacle = new Obstacle(this.scene, this.obstacleGroup).create(obstacleX, obstacleY);
      this.obstacles.push({ entity: obstacle, y: obstacleY });
    }
  }

  removePassedObjects(objects, cutoffY) {
    return objects.filter(({ entity, y }) => {
      if (y >= cutoffY) {
        return true;
      }
      entity.destroy();
      return false;
    });
  }
}
const PLATFORM_MIN_WIDTH = 100;
const PLATFORM_MAX_WIDTH = 130;
const PLATFORM_MIN_GAP = 105;
const PLATFORM_MAX_GAP = 135;
const MAX_HORIZONTAL_SHIFT = 110;
const PLATFORM_HALF_HEIGHT = 8;
const CLEANUP_BUFFER = 300;
const OBSTACLE_CHANCE = 0.18;
const EDGE_CLEARANCE = 38;


function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
