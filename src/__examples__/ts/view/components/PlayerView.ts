import { lego } from '@armathai/lego';
import { ModelEvents } from '../../events/ModelEvents';

export class PlayerView extends Phaser.GameObjects.Container {
  private $bg: Phaser.GameObjects.Image;
  private $score: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);

    lego.event.on(ModelEvents.PlayerModel.ScoreUpdate, this._updateScore, this);

    this.add((this.$bg = this._buildBg()));
    this.add((this.$score = this._buildScore()));
  }

  private _updateScore(value: number) {
    this.$score.setText(`SCORE | ${value}`);
  }

  private _buildBg(): Phaser.GameObjects.Image {
    const { width, height } = this.scene.scale;

    const bg = this.scene.add.image(0, 0, 'pixel');
    bg.setTint(0x756c53);
    bg.setScale(width, height * 0.05);
    bg.setOrigin(0);

    return bg;
  }

  private _buildScore(): Phaser.GameObjects.Text {
    const { x, y } = this.$bg.getCenter();

    const score = this.scene.add.text(x, y, 'SCORE', { fontSize: 35, align: 'center' });
    score.setOrigin(0.5);

    return score;
  }
}
