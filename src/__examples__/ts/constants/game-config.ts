import { CANVAS_CONTAINER_ID } from './constants';

export const gameConfig = {
  backgroundColor: 0xcdcdcd,
  banner: false,
  parent: CANVAS_CONTAINER_ID,
  scale: { width: 640, height: 960, mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
};
