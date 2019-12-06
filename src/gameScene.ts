import * as phaser from 'phaser';

export class GameScene extends phaser.Scene {
  private delta: number;
  private lastStarTime: number;
  private starsCaught: number;
  private starsFallen: number;
  private sand: phaser.Physics.Arcade.StaticGroup;
  private info: phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(params: Object) {
    this.delta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
  }

  preload() {
    this.load.setBaseURL('https://raw.githubusercontent.com/mariyadavydova/' + 'starfall-phaser3-typescript/master/');
    this.load.image('star', 'assets/star.png');
    this.load.image('sand', 'assets/sand.jpg');
  }

  create() {
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });
    phaser.Actions.PlaceOnLine(this.sand.getChildren(), new phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();
    this.info = this.add.text(10, 10, '0 caught - 0 fallen (max 3)', {
      font: '24px Arial Bold',
      fill: '#FBFBAC'
    });
  }

  update(time: number) {
    let diff: number = time - this.lastStarTime;
    if (diff > this.delta) {
      this.lastStarTime = time;
      if (this.delta > 500) {
        this.delta -= 20;
      }
      this.emitStar();
    }
    this.info.text = `${this.starsCaught} caught - ${this.starsFallen} fallen (max 3)`;
  }

  private onClick(star: phaser.Physics.Arcade.Image): () => void {
    return () => {
      star.setTint(0x00ff00);
      star.setVelocity(0, 0);
      this.starsCaught += 1;
      this.time.delayedCall(
        100,
        () => {
          star.destroy();
        },
        [star],
        this
      );
    };
  }

  private onFall(star: phaser.Physics.Arcade.Image): () => void {
    return () => {
      star.setTint(0xff0000);
      this.starsFallen += 1;
      this.time.delayedCall(
        100,
        () => {
          star.destroy();
          if (this.starsFallen > 2) {
            this.scene.start('ScoreScene', { starsCaught: this.starsCaught });
          }
        },
        [star],
        this
      );
    };
  }

  private emitStar(): void {
    let star: phaser.Physics.Arcade.Image;
    let x: number = phaser.Math.Between(25, 775);
    let y: number = 26;
    star = this.physics.add.image(x, y, 'star');
    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    star.setInteractive();
    star.on('pointerdown', this.onClick(star), this);
    this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
  }
}
