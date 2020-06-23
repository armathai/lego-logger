import { lego, not } from '@armathai/lego';
import { cellAliveGuard } from './guards/cellAliveGuard';
import { updateScoreCommand } from './player/updateScoreCommand';
import { removeCellCommand } from './removeCellCommand';
import { updateCellHealthCommand } from './updateCellHealthCommand';

export function cellClickCommand(cellUUID: string): void {
  lego.command
    .payload(1)
    .execute(updateScoreCommand)

    .payload(cellUUID)
    .execute(updateCellHealthCommand)

    .payload(cellUUID)
    .guard(not(cellAliveGuard))
    .execute(removeCellCommand);
}
