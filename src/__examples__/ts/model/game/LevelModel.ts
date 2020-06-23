import { ObservableModel } from '../ObservableModel';
import { BoardModel } from './board/BoardModel';

export class LevelModel extends ObservableModel {
  private $board: BoardModel | null = null;

  constructor() {
    super('LevelModel');

    this.makeObservable();
  }

  public initialize(config: { cells: any[] }): void {
    this.$board = new BoardModel();
    this.$board.initialize(config.cells);
  }

  get board() {
    return this.$board!;
  }

  set board(value: BoardModel) {
    this.$board = value;
  }
}
