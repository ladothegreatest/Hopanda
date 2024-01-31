export class Spiders{
    constructor(positions, ranges, durations, type){
        this.ranges = ranges
        this.durations = durations
        this.leopards = []
        for (const position of positions){
            this.leopards.push(
                add([
                    sprite(`leopard`, {anim: 'crawl'}),
                    pos(position),
                    area({
                        shape: new Rect(vec2(0,4), 70, 50),
                        collisionIgnore: ['leopards']
                    }),
                    anchor('center'),
                    body(),
                    scale(1.5),
                    state('idle', ['idle', 'run-left', 'run-right']),
                    offscreen(),
                    'leopards'
                ])
            )
        }

    }

    async crawl(leopard, moveBy, duration){
        if (leopard.curAnim() !== 'crawl') leopard.play('crawl')

        await tween(
            leopard.pos.x,
            leopard.pos.x + moveBy,
            duration,
            (posX) => (leopard.pos.x = posX),
            easings.easeOutSine
        )
    }
    
    setMovementPattern() {
        for (const [index, leopard] of this.leopards.entries()){
            const idle = leopard.onStateEnter('idle', async(previousState) => {
                if (leopard.curAnim() !== 'idle') leopard.play('idle')
    
                await new Promise((resolve) => {
                    setTimeout(() => resolve(), 1000)
                })
    
                if (previousState === 'run-left'){
                    leopard.enterState('run-right')
                    return
                }
    
                leopard.jump()
                if (!leopard.isOffScreen()){
                    play('leopard-attack', {volume: 0.6})
                }
                leopard.enterState('run-left')
    
            })
    
            const crawlLeft = leopard.onStateEnter('run-left', async () => {
                leopard.flipX = false
                await this.crawl(
                    leopard,
                    -this.ranges[index],
                    this.durations[index]
                )
                leopard.enterState('idle', 'run-left')
            })
    
            const crawlRight = leopard.onStateEnter('run-right', async () => {
                leopard.flipX = true
                await this.crawl(
                    leopard,
                    this.ranges[index],
                    this.durations[index]
                )
                leopard.enterState('idle', 'run-right')
            })

            onSceneLeave(() => {
                idle.cancel()
                crawlLeft.cancel()
                crawlRight.cancel()
            })
        }
    }

    enablePassthrough(){
        for (const leopard of this.leopards) {
            leopard.onBeforePhysicsResolve((collision) => {
                if (collision.target.is('passthrough') && leopard.isJumping()){
                    collision.preventResolution()
                }
            })
        }
    }
    
    
}