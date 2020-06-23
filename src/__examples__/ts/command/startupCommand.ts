import { lego } from '@armathai/lego';
import { ViewEvents } from '../view/ViewEvents';
import { cellClickCommand } from './cellClickCommand';
import { gameSceneReadyCommand } from './gameSceneReadyCommand';
import { loadCompleteCommand } from './loadCompleteCommand';
import { loadProgressCommand } from './loadProgressCommand';

export function startupCommand(): void {
  lego.command
    .map(ViewEvents.Load.Progress, loadProgressCommand)
    .map(ViewEvents.Load.Complete, loadCompleteCommand)
    .map(ViewEvents.GameScene.Ready, gameSceneReadyCommand)
    .map(ViewEvents.CellView.Click, cellClickCommand);
}
