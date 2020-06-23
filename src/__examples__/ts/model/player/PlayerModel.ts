import { ObservableModel } from '../ObservableModel';

export class PlayerModel extends ObservableModel {
  private $score: number | null = null;

  constructor() {
    super('PlayerModel');

    this.makeObservable();
  }

  get score() {
    return this.$score!;
  }

  set score(value: number) {
    this.$score = value;
  }
}
