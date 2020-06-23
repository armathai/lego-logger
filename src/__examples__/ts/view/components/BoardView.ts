import { lego } from '@armathai/lego';
import { BOARD_TRANSFORM, CELL_TRANSFORM } from '../../constants/constants';
import { ModelEvents } from '../../events/ModelEvents';
import { CellModel } from '../../model/CellModel';
import { ViewEvents } from '../ViewEvents';
import { CellView } from './CellView';

export class BoardView extends Phaser.GameObjects.Container {
  private $cells: CellView[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);

    lego.event
      .on(ModelEvents.BoardModel.CellsUpdate, this._buildCells, this)
      .on(ModelEvents.CellModel.ScoreUpdate, this._updateCellScore, this)
      .on(ViewEvents.CellModel.Destroy, this._removeCell, this);

    this.setSize(BOARD_TRANSFORM.x * CELL_TRANSFORM.x, BOARD_TRANSFORM.y * CELL_TRANSFORM.y);
  }

  public getCellByUUID(uuid: string) {
    return this.$cells.find(cell => cell.uuid === uuid);
  }

  private _updateCellScore(newValue: number, oldValue: number, uuid: string): void {
    const cellView = this.getCellByUUID(uuid);
    cellView!.updateScore(newValue);
  }

  private _buildCells(cells: CellModel[]): void {
    const { x: cellWidth, y: cellHeight } = CELL_TRANSFORM;

    for (const { uuid, score, position } of cells) {
      const cellView = this._addCell(uuid!);
      cellView.updateScore(score);
      cellView.y = position.y * cellWidth;
      cellView.x = position.x * cellHeight;
    }
  }

  private _addCell(uuid: string): CellView {
    const cellView = new CellView(this.scene, uuid);
    this.$cells.push(cellView);
    this.add(cellView);

    return cellView;
  }

  private _removeCell(uuid: string): CellView | null {
    const cell = this.getCellByUUID(uuid);
    if (cell) {
      this.$cells.splice(this.$cells.indexOf(cell), 1);
      cell.destroy();
      return cell;
    }
    return null;
  }
}
