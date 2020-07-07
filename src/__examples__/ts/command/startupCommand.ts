import { lego } from '@armathai/lego';
import { ViewEvents } from '../view/ViewEvents';
import { cellClickCommand } from './cellClickCommand';
import { gameSceneReadyCommand } from './gameSceneReadyCommand';
import { loadCompleteCommand } from './loadCompleteCommand';
import { loadProgressCommand } from './loadProgressCommand';

export function startupCommand(): void {
  lego.command
    .on(ViewEvents.Load.Progress, loadProgressCommand)
    .once(ViewEvents.Load.Complete, loadCompleteCommand)
    .once(ViewEvents.GameScene.Ready, gameSceneReadyCommand)
    .on(ViewEvents.CellView.Click, cellClickCommand);
}
