import * as phaser from 'phaser';
import { GameScene } from 'gameScene';
import { WelcomeScene } from 'welcomeScene';
import { ScoreScene } from 'scoreScene';

export class StarfallGame extends phaser.Game {
  constructor() {
    super({
      title: 'Starfell',
      scene: [WelcomeScene, GameScene, ScoreScene],
      width: 800,
      height: 600,
      parent: 'gameWindow',
      backgroundColor: '#000033',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      }
    });
  }
}

window.onload = () => {
  new StarfallGame();
};
