import { lego } from '@armathai/lego';
import { GameModel } from '../model/game/GameModel';
import { PlayerModel } from '../model/player/PlayerModel';
import { store } from '../model/Store';
import { updateLevelCommand } from './game/updateLevelCommand';
import { updateScoreCommand } from './player/updateScoreCommand';

export function gameSceneReadyCommand(): void {
  store.playerModel = new PlayerModel();
  store.gameModel = new GameModel();

  lego.command
    .payload(0)
    .execute(updateLevelCommand)
    .payload(0)
    .execute(updateScoreCommand);
}
