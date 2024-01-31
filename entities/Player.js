import kaboom from '/libs/kaboom.mjs';

export class Player {
    heightDelta = 0

    coin = 'coin'

    isMoving = false
  
    isRespawning = false
  
    lives = 3
  
    coins = 0
  
    hasJumpedOnce = false
  
    coyoteLapse = 2

    frameTimes = []
    frameTimeBufferSize = 60
    constructor(
        PosX,
        PosY,
        speed,
        NumberOfLives,
        jumpForce,
        currentLevelScene,
        isInFinalScene
    ){
        this.isInFinalScene = isInFinalScene; 
        this.currentLevelScene = currentLevelScene;
        this.initialX = PosX;
        this.initialY = PosY;
        this.makePlayer();
        this.setPlayerControls()
        this.speed = speed,
        this.jumpForce = jumpForce
        this.lives = NumberOfLives
        this.previousHeight = this.GameObject.pos.y
    }

    makePlayer(){
        this.GameObject = add([
            sprite('hopanda', {anim: 'idle',}),
            area({shape: new Rect(vec2(0,3), 8, 20)}),
            anchor('center'),
            pos(this.initialX,this.initialY), 
            scale(2),
            body(),
            'player',
        ])
    }

   
    enablePassThrough(){
        this.GameObject.onBeforePhysicsResolve((collision) => {
            if(collision.target.is('passthrough') && this.GameObject.isJumping()){
                collision.preventResolution()
            };
            if(collision.target.is('passthrough') && isKeyDown('down')){
                collision.preventResolution()
            }
        })
    }

    coinCollect(){
        this.GameObject.onCollide('coin', (coin) => {
            this.coins++
            destroy(coin)
        })   
    }
    
    setPlayerControls(){
        onKeyDown('left', ()=> {
            if (this.GameObject.curAnim() !== 'run'){ this.GameObject.play('run')
            this.GameObject.flipX = true}
            if (!this.isRespawning){this.GameObject.move(-this.speed, 0)
            this.isMoving = true}
        })

        onKeyDown('right', ()=> {
            if (this.GameObject.curAnim() !== 'run'){ this.GameObject.play('run')
            this.GameObject.flipX = false}
            if (!this.isRespawning){ this.GameObject.move(this.speed, 0)
            this.isMoving = true}
        })


        onKeyDown('space', ()=> {
            if (!this.GameObject.isGrounded() && this.hasJumpedOnce) return

            if(time() - this.timeSinceLastGrounded > this.coyoteLapse) return

            if(!this.isRespawning){this.GameObject.jump(this.jumpForce)
            this.hasJumpedOnce = true
            }
            if (
                !this.GameObject.isGrounded() &&
                time() - this.timeSinceLastGrounded < this.coyoteLapse &&
                !this.hasJumpedOnce
            ) {
                this.hasJumpedOnce = true
                this.GameObject.jump(this.jumpForce)
                play("jump")
            }
            this.isMoving = true
        })

        onKeyRelease(() => {
            if (isKeyReleased('right') || isKeyReleased('left')){
                this.GameObject.play('idle')
            }
            this.isMoving = false
        })
    }
    respawnPlayer() {
        if (this.lives > 0) {
          this.GameObject.pos = vec2(this.initialX, this.initialY)
          this.lives--
          this.isRespawning = true
          setTimeout(() => (this.isRespawning = false), 700)
          return
        }
    
        go("gameover")
    }

    enableMobVunerability(){
        function  hitAndRespawn(context){
            context.respawnPlayer()
        }

        this.GameObject.onCollide('leopards', () => hitAndRespawn(this))
        this.GameObject.onCollide('fish', () => hitAndRespawn(this))
        this.GameObject.onCollide('blade', () => hitAndRespawn(this))
        this.GameObject.onCollide('axes', () => hitAndRespawn(this))
    }
    
    update() {
        onUpdate(() => {
            if (this.GameObject.isGrounded()){
                this.hasJumpedOnce = false
                this.timeSinceLastGrounded = time()
            }
            this.heightDelta = this.previousHeight - this.GameObject.pos.y
            this.previousHeight = this.GameObject.pos.y
            if (this.GameObject.pos.y > 1000) {
                play('death')
                this.respawnPlayer()
            } 
            if(!this.isMoving && this.GameObject.curAnim() !== 'idle'){
                this.GameObject.play('idle')
            }

            if (!this.GameObject.isGrounded() && 
                this.heightDelta > 0 &&
                this.GameObject.curAnim() !== 'jump-up' ){
                this.GameObject.play('jump-up')
            }
            
            if (!this.GameObject.isGrounded() && 
                this.heightDelta < 0 &&
                this.GameObject.curAnim() !== 'jump-down'){
                this.GameObject.play('jump-down')
            }
        })
    }

    updateLives(livesCountUI){
        onUpdate(() => {
            livesCountUI.text =  this.lives
        })
    }

    updateCoinCount(coinCountUI){
        onUpdate(() => {
            coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
            if(this.coins === coinCountUI.fullCoinCount){
                go(this.isInFinalScene ? 'end': this.currentLevelScene + 1)
            }
        })
    }    

}