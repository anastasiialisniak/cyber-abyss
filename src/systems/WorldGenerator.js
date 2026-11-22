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
  }

  // Build the starting area (called once per run).
  generateInitialWorld() {}

  // Generate content below world-Y `y` (called as the camera descends).
  generateBelow(y) {} // eslint-disable-line no-unused-vars

  // Destroy objects that are above `cameraY` (the camera's top edge).
  cleanup(cameraY) {} // eslint-disable-line no-unused-vars
}
