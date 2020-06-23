import { store } from "../model/store";

export function removeCellCommand(cellUUID: string): void {
  const { board } = store.gameModel.level;
  board.removeCell(cellUUID);
}
