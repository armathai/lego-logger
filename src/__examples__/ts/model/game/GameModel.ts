import { ObservableModel } from '../ObservableModel';
import { LevelModel } from './LevelModel';

export class GameModel extends ObservableModel {
  private $level: LevelModel | null = null;

  constructor() {
    super('GameModel');

    this.makeObservable();
  }

  public initializeLevel(config: { cells: any[] }) {
    this.$level = new LevelModel();
    this.$level.initialize(config);
  }

  get level() {
    return this.$level!;
  }

  set level(value: LevelModel) {
    this.$level = value;
  }
}
