import 'phaser';
import { legologger } from '../..';
import { startupCommand } from './command/startupCommand';
import { SceneKey } from './constants/constants';
import { gameConfig } from './constants/game-config';
import { GameScene } from './view/scenes/GameScene';
import { PreloadScene } from './view/scenes/PreloadScene';

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    game: Game;
  }
}

export class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);

    this.scene.add(SceneKey.Preload, new PreloadScene());
    this.scene.add(SceneKey.Game, new GameScene());

    this.scene.start(SceneKey.Preload);
  }
}

window.game = new Game();

startupCommand();
legologger.start({});
