export class Blade{
    constructor(positions, durations, ranges){
        this.blades = [];
        for (const position of positions){
            this.durations = durations;
            this.ranges = ranges;
            this.blades.push(
                add([
                    sprite('blade', {anim: 'cut'}),
                    area({shape : new Rect(vec2(0), 50, 30)}),
                    anchor('center'),
                    pos(position),
                    scale(1.5),
                    state('left', ['left', 'right']),
                    offscreen(),
                    'blade'
                ])
            )
        }
    }

    async move(blade, moveBy, duration){
        if (blade.curAnim() !== 'cut') blade.play('cut')

        await tween(
            blade.pos.x,
            blade.pos.x + moveBy,
            duration,
            (posX) => (blade.pos.x = posX),
            easings.easeOutSine
        )
    }

    setMovementPattern() {
        for (const [index, blade] of this.blades.entries()){
            
            const Left = blade.onStateEnter('left', async () => {
                blade.flipX = false
                await this.move(
                    blade,
                    -this.ranges[index],
                    this.durations[index]
                )
                blade.enterState('right')
            })
    
            const Right = blade.onStateEnter('right', async () => {
                blade.flipX = true
                await this.move(
                    blade,
                    this.ranges[index],
                    this.durations[index]
                )
                blade.enterState('left')
            })

        }
    }


}