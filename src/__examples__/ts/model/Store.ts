import { GameModel } from './game/GameModel';
import { ObservableModel } from './ObservableModel';
import { PlayerModel } from './player/PlayerModel';

class Store extends ObservableModel {
  private $gameModel: GameModel | null = null;
  private $playerModel: PlayerModel | null = null;

  constructor() {
    super();

    this.makeObservable();
  }

  get gameModel() {
    return this.$gameModel!;
  }

  set gameModel(value: GameModel) {
    this.$gameModel = value;
  }

  get playerModel() {
    return this.$playerModel!;
  }

  set playerModel(value: PlayerModel) {
    this.$playerModel = value;
  }
}

export const store = new Store();
