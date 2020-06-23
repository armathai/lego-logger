import { lego } from '@armathai/lego';
import { ViewEvents } from '../ViewEvents';

export class CellView extends Phaser.GameObjects.Container {
  private $uuid: string;
  private $bg: Phaser.GameObjects.Image;
  private $score: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, uuid: string) {
    super(scene);

    this.$uuid = uuid;

    this.add((this.$bg = this._buildBg()));
    this.add((this.$score = this._buildScore()));
  }

  get uuid() {
    return this.$uuid;
  }

  public updateScore(value: number): void {
    this.$score.setText(`${value}`);
  }

  private _buildBg(): Phaser.GameObjects.Image {
    const bg = this.scene.add.image(0, 0, 'pixel');
    bg.setTint(0xa88f32);
    bg.setScale(60, 60);
    bg.setOrigin(0);
    bg.setInteractive();
    bg.on('pointerup', this._onClick, this);

    return bg;
  }

  private _buildScore(): Phaser.GameObjects.Text {
    const { x, y } = this.$bg.getCenter();

    const text = this.scene.add.text(x, y, ' ', {
      fontSize: 35,
      wordWrap: { width: 60, useAdvancedWrap: true },
    });
    text.setOrigin(0.5);

    return text;
  }

  private _onClick(): void {
    lego.event.emit(ViewEvents.CellView.Click, this.$uuid);
  }
}
