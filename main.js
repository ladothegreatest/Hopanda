import kaboom from './libs/kaboom.mjs'
import "./utils/UImanager.js";
import { load } from './utils/loader.js';
import { uiManager } from './utils/UImanager.js';
import { Level } from './utils/Level.js';
import { Player } from './entities/Player.js';
import { Camera } from './utils/Camera.js';
import { level1Config } from './content/level1/config.js';
import { level1Layout, level1Mappings } from './content/level1/level1Layout.js';
import { Spiders } from './entities/Spiders.js';
import { Projectiles } from './entities/projectiles.js';
import { Blade } from './entities/Blade.js';
import { Axes } from './entities/Axes.js';

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: false,
})



load.sprites();
load.fonts();
load.sounds();

const scenes = {
  menu: () => {
    uiManager.DisplayMainMenu();
  },
  controls: () => {
    uiManager.displayControlsMenu();
  },
  1: () => {
    setGravity(1400)

    const level1 = new Level();
    level1.drawBackground('Level_Background');
    level1.drawMapLayout(level1Layout,level1Mappings);
    
    const player = new Player
    (
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.nbLives,
      level1Config.jumpForce,
      1,
      true,
    );
    player.enablePassThrough()
    player.coinCollect()
    player.update()
    player.enableMobVunerability()



    const blades = new Blade(
      level1Config.bladePos.map(bladePos => bladePos()),
      level1Config.bladeDurations,
      level1Config.bladeRanges
    )
    blades.setMovementPattern()

    const spiders = new Spiders(
      level1Config.spiderPositions.map(spiderPos => spiderPos()),
      level1Config.spiderRanges,
      level1Config.spiderDurations,
      level1Config.spiderType
    )
    spiders.setMovementPattern()
    spiders.enablePassthrough()
    
    const axes = new Axes(
      level1Config.axesPositions.map((axePos) => axePos()),
      level1Config.axeSwingtime
    )
    axes.setMovementPattern()

    const fish = new Projectiles(
      level1Config.fishPositions.map(fishPositions => fishPositions()),
      level1Config.fishRanges,
      'fish1'
    )
    fish.setMovementPattern()


    const flame = new Projectiles(
      level1Config.flamePos.map(flamePos => flamePos()),
      level1Config.flameRanges,
      'flame'
    )
    flame.setMovementPattern()

    uiManager.displayCoinCount()
    player.updateCoinCount(uiManager.coinCountUI)
    const camera = new Camera()
    camera.attach(player.GameObject, 0, 200)
    player.setPlayerControls
    level1.drawWaves('water', 'wave')
    
    uiManager.displayLivesCount()
    player.updateLives(uiManager.livesCountUI)
  },
  gameover: () => {
    uiManager.displayGameOverScreen()
  },
  end:() => {
    uiManager.displayEndGameScreen()
  }

}

for (const key in scenes){
  scene(key, scenes[key])
}


go('menu')
