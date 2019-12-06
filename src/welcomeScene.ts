import * as phaser from 'phaser';

export class WelcomeScene extends phaser.Scene {
  private title: phaser.GameObjects.Text;
  private hint: phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'WelcomeScene'
    });
  }

  create() {
    const titleText: string = 'Starfall';
    const hintText: string = 'Click to start';

    this.title = this.add.text(150, 200, titleText, {
      font: '128px Arial Bold',
      fill: '#FBFBAC'
    });
    this.hint = this.add.text(300, 350, hintText, { font: '24px Arial Bold', fill: '#FBFBAC' });
    this.input.on(
      'pointerdown',
      () => {
        this.scene.start('GameScene');
      },
      this
    );
  }
}
