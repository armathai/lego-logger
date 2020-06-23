import { store } from '../../model/store';

export function updateScoreCommand(value: number): void {
  store.playerModel.score += value;
}
