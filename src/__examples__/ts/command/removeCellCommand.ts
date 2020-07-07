import { store } from '../model/Store';

export function removeCellCommand(cellUUID: string): void {
  const { board } = store.gameModel.level;
  board.removeCell(cellUUID);
}
