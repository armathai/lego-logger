import { lego } from '@armathai/lego';
import { getUUID } from '../utils/utils';

export class ObservableModel {
  private _uuid?: string;
  private __name__: string;

  constructor(name?: string) {
    this.__name__ = name;
    this._uuid = getUUID(this.__name__);
  }

  get uuid() {
    return this._uuid;
  }

  protected makeObservable(...props: string[]): void {
    lego.observe.makeObservable(this, ...props);
  }

  protected removeObservable(...props: string[]): void {
    lego.observe.removeObservable(this, ...props);
  }

  protected createObservable(prop: string, value: any): void {
    lego.observe.createObservable(this, prop, value);
  }
}
