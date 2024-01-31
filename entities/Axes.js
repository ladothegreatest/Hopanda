export class Axes {
    constructor(positions, swingTimes) {
      this.swingTimes = swingTimes
      this.positions = positions
      this.axes = []
      for (const position of positions) {
        this.axes.push(
          add([
            sprite("axe"),
            area({
              shape: new Rect(vec2(0, 40), 30, 10),
              collisionIgnore: ["spider"],
            }),
            pos(position),
            scale(4),
            anchor(vec2(0, -0.75)),
            state("swing-left", ["swing-left", "swing-right"]),
            rotate(),
            offscreen(),
            "axes",
          ])
        )
      }
    }
  
    async swing(axe, angle, swingTime) {
  
      await tween(
        axe.angle,
        angle,
        swingTime,
        (val) => axe.angle = val,
        easings.easeInOutSine
      )
    }
    setMovementPattern() {
        for (const [index, axe] of this.axes.entries()) {
          const swingLeft = axe.onStateEnter("swing-left", async () => {
            console.log(`Swing Left: ${index}`);
            await this.swing(axe, 90, this.swingTimes[index]);
            axe.enterState("swing-right");
            console.log(`Swing Left Complete: ${index}`);
          });
      
          const swingRight = axe.onStateEnter("swing-right", async () => {
            console.log(`Swing Right: ${index}`);
            await this.swing(axe, -90, this.swingTimes[index]);
            axe.enterState("swing-left");
            console.log(`Swing Right Complete: ${index}`);
          });
      
          onSceneLeave(() => {
            console.log(`Leaving Scene: ${index}`);
            swingLeft.cancel();
            swingRight.cancel();
            console.log(`Cleanup Complete: ${index}`);
          });
        }
    }
      
}