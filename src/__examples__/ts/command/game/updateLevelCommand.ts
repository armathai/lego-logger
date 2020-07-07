import { LevelConfig } from '../../constants/levels-config';
import { store } from '../../model/Store';

export function updateLevelCommand(value: number): void {
  store.gameModel.initializeLevel(LevelConfig[value]);
}
