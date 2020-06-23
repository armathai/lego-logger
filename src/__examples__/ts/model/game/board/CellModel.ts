import { ObservableModel } from '../../ObservableModel';

export class CellModel extends ObservableModel {
  private $position: Phaser.Geom.Point | null = null;
  private $score: number | null = null;

  constructor(rawCell: { score: number }) {
    super('CellModel');

    const { score } = rawCell;

    this.createObservable('$score', score);
  }

  get score(): number {
    return this.$score!;
  }

  set score(value: number) {
    this.$score = value;
  }

  get position() {
    return this.$position!;
  }

  set position(value: Phaser.Geom.Point) {
    this.$position = value;
  }
}
