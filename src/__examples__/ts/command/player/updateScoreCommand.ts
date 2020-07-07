import { store } from '../../model/Store';

export function updateScoreCommand(value: number): void {
  store.playerModel.score += value;
}
