import { SceneKey } from '../constants/constants';

export function loadCompleteCommand(): void {
  const game = window.game;
  game.scene.start(SceneKey.Game);
  game.scene.stop(SceneKey.Preload);
}
