import { store } from '../model/Store';

export function updateCellHealthCommand(cellUUID: string): void {
  const { board } = store.gameModel.level;
  const cellModel = board.getCellByUUID(cellUUID);

  cellModel!.score -= 1;
}
