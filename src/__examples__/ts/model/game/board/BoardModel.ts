import { lego } from '@armathai/lego';
import { BOARD_TRANSFORM } from '../../../constants/constants';
import { ViewEvents } from '../../../view/ViewEvents';
import { ObservableModel } from '../../ObservableModel';
import { CellModel } from './CellModel';

export class BoardModel extends ObservableModel {
  private $cells: CellModel[] | null = null;

  constructor() {
    super('BoardModel');

    this.makeObservable();
  }

  get cells() {
    return this.$cells;
  }

  public removeCell(uuid: string): void {
    const cell = this.getCellByUUID(uuid);
    this.$cells!.splice(this.$cells!.indexOf(cell!), 1);
    lego.event.emit(ViewEvents.CellModel.Destroy, uuid);
  }

  public getCellByUUID(uuid: string) {
    return this.$cells!.find(cell => cell.uuid === uuid);
  }

  public initialize(rawCells: any[]): void {
    const cells = [];
    const l = rawCells.length;
    const { x: cellCount, y: rowCount } = BOARD_TRANSFORM;

    for (let i = 0; i < l; ++i) {
      const cellConfig = rawCells[i];
      const cellModel = new CellModel(cellConfig);
      cellModel.position = new Phaser.Geom.Point(i % rowCount, Math.floor(i / rowCount));
      cells.push(cellModel);
    }

    this.$cells = cells;
  }
}
