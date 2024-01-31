export const load = {
    
    fonts: () =>{
        loadFont('Round', 'assets/Round9x13.ttf')
    },
    sprites: () =>{
        loadSprite('arrow-down', 'assets/Arrow_Down_Key_Dark.png');
        loadSprite('arrow-up', 'assets/Arrow_Up_Key_Dark.png');
        loadSprite('arrow-left', 'assets/Arrow_Left_Key_Dark.png');
        loadSprite('arrow-right', 'assets/Arrow_Right_Key_Dark.png');
        loadSprite('Space_key', 'assets/Space_Key_Dark.png');
        loadSprite('Level_Background', 'assets/japanese.png');
        loadSprite('Background_controls_menu', 'assets/Forest_Background_0.png');
        loadSprite('grass-tileset', 'assets/Grass_Tileset.png', {
            sliceX:3,
            sliceY:4,
            anims: {
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
                
            }
        });
        loadSprite("grass-oneway-tileset", "./assets/Grass_Oneway.png", {
            sliceX: 3,
            sliceY: 4,
            anims: {
              tl: 0,
              tm: 1,
              tr: 2,
              ml: 3,
              mm: 4,
              mr: 5,
              bl: 6,
              bm: 7,
              br: 8,
            },
            
        })
        loadSprite('water', 'assets/Water.png', {
            sliceX: 8,
            sliceY: 1,
            anims: {
                wave: {
                    from: 0,
                    to: 7,
                    speed: 16,
                    loop: true,
                },
                'wave-reversed': {
                    from: 7,
                    to: 0,
                    speed: 16,
                    loop: true,
                },
            },
        })
        loadSprite('hopandalogo', 'assets/hopanda.png');
        loadSprite('hopanda', 'assets/panda.png', {
            sliceX: 4,
            sliceY: 6,
            anims: {
                idle: {
                    from: 0,
                    to: 2,
                    loop: true,
                    speed: 2
                },
                run: {
                    from: 4,
                    to: 6,
                    loop: true,
                    speed: 8
                },
                'jump-up': 8,
                'jump-down': 9,
            }
        })
        loadSprite('coin', "assets/Coin.png");
        loadSprite('coin-icon', 'assets/Coins_Ui.png ');
        loadSprite('heart-icon', 'assets/Heart_Ui.png');
        loadSprite('bridge', 'assets/Bridge.png');
        loadSprite('spider-1', 'assets/Spider_1.png', {
            sliceX: 3,
            sliceY: 1,
            anims: {
                crawl: { from: 0, to: 2, loop: true},
                idle: 0,
            },
        });
        loadSprite('leopard', 'assets/leopard.png', {
            sliceX: 3,
            sliceY: 1,
            anims: {
                crawl: { from: 0, to: 2, loop: true},
                idle: 0,
            },
        });
        loadSprite('fish1', 'assets/Fish_1.png', {
            sliceX: 2,
            sliceY: 1,
            anims: {
                swim: {from: 0, to: 1, loop: true}
            },
        });
        loadSprite('block', 'assets/Brick_block.png');
        loadSprite('blade', 'assets/blades.png', {
            sliceX: 4,
            sliceY: 1,
            anims: {
                cut: {
                    from: 0,
                    to: 3,
                    loop: true
                }
            }, 
        });
        loadSprite('rock-tileset', 'assets/Grass_Rock_Tileset.png', {
            sliceX: 3,
            sliceY: 4,
            anims:{
                tl: 0,
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            }
        });
        loadSprite('rock-oneway-tileset', 'assets/Grass_Rock_Oneway.png',{
            sliceX: 3,
            sliceY: 4,
            anims: {
                tl: 0, 
                tm: 1,
                tr: 2,
                ml: 3,
                mm: 4,
                mr: 5,
                bl: 6,
                bm: 7,
                br: 8,
            }
        });
        loadSprite('axe', 'assets/Axe_Trap.png');
        loadSprite("flame", "./assets/Flame.png", {
            sliceX: 2,
            sliceY: 1,
            anims: {
              burn: { from: 0, to: 1, loop: true },
            },
          })
        loadSprite('stone-bridge', '/assets/stone bridge.png', )
    },
    sounds: () =>{
        loadSound('confirm-ui', 'sounds/confirm-ui.wav');
        loadSound('jump', 'sounds/Mario-jump-sound.mp3');
        loadSound('death', 'sounds/Roblox-death-sound.mp3');
        loadSound('leopard-attack', 'sounds/sui.mp3')
    },

}
