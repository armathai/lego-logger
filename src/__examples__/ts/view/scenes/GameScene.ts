import { lego } from '@armathai/lego';
import { SceneKey } from '../../constants/constants';
import { ModelEvents } from '../../events/ModelEvents';
import { BoardView } from '../components/BoardView';
import { PlayerView } from '../components/PlayerView';
import { ViewEvents } from '../ViewEvents';

export class GameScene extends Phaser.Scene {
  private $playerView: PlayerView | null = null;
  private $boardView: BoardView | null = null;

  constructor() {
    super(SceneKey.Game);
    lego.event.on(ModelEvents.Store.PlayerModelUpdate, this._buildPlayerView, this);
    lego.event.on(ModelEvents.LevelModel.BoardUpdate, this._buildBoardView, this);
  }

  public create(): void {
    lego.event.emit(ViewEvents.GameScene.Ready);
  }

  public _buildPlayerView(): void {
    this.$playerView = new PlayerView(this);

    this.add.existing(this.$playerView);
  }

  public _buildBoardView(): void {
    const { width, height } = this.scale;
    this.$boardView = new BoardView(this);
    this.$boardView.setPosition((width - this.$boardView.width) * 0.5, (height - this.$boardView.height) * 0.5);
    this.add.existing(this.$boardView);
  }
}
