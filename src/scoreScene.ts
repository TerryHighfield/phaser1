import * as phaser from 'phaser';

export class ScoreScene extends phaser.Scene {
  private score: number;
  private result: phaser.GameObjects.Text;
  private hint: phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'ScoreScene'
    });
  }

  init(params: { starsCaught: number }) {
    this.score = params.starsCaught;
  }

  create() {
    const resultText: string = `Your score is ${this.score}!`;
    const hintText: string = 'Click to restart';
    this.result = this.add.text(200, 250, resultText, { font: '48px Arial Bold', fill: '#FBFBAC' });
    this.hint = this.add.text(300, 350, hintText, { font: '24px Arial Bold', fill: '#BFBFAC' });
    this.input.on('pointerdown', () => {
      this.scene.start('WelcomeScene');
    });
  }
}
