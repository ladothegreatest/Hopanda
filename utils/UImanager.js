class UImanager {
    DisplayMainMenu() {
       add([
        sprite('hopandalogo'),
        scale(1)
        ])
      this.displayBlinkingUIMessage(
        "Press [ Enter ] to Start Game",
        vec2(center().x, center().y + 180)
      )

      onKeyPress("enter", () => {
        play('confirm-ui', {speed: 1})
        go("controls")
      })
    }

    displayLivesCount(player){
      this.livesCountUI = add([
        text('', {
          font: 'Round',
          size: 50
        }),
        fixed(),
        pos(70, 10)
      ])

      this.livesCountUI.add([
        sprite('heart-icon'),
        pos(-60, -5),
        scale(3),
        fixed()
      ])
    }


    displayCoinCount(player){
      this.coinCountUI = add([
        text('',{
          font: 'Round',
          size: 50
        }),
        {
          fullCoinCount: get('coin', { recursive: true }).length
        },
        fixed(),
        pos(70, 70),
      ])

      this.coinCountUI.add([
        sprite('coin-icon'),
        pos(-60, 0),
        scale(3),
        fixed()
      ])
    }




    displayBlinkingUIMessage(content, position) {
        const message = add([
          text(content, { size: 30, font: "Round" }),
          area(),
          anchor("center"),
          pos(position),
          opacity(),
          state("flash-up", ["flash-up", "flash-down"]),
        ])
    
        message.onStateEnter("flash-up", async () => {
          await tween(
            message.opacity,
            0,
            0.7,
            (opacity) => (message.opacity = opacity),
            easings.linear
          )
          message.enterState("flash-down")
        })
    
        message.onStateEnter("flash-down", async () => {
          await tween(
            message.opacity,
            1,
            0.5,
            (opacity) => (message.opacity = opacity),
            easings.linear
          )
          message.enterState("flash-up")
        })
      }

      displayControlsMenu(){
        add([
          sprite('Background_controls_menu'),
          scale(4),
          ])
        add([
          text('controls', {font: 'Round'}),
          pos(center().x, center().y - 200),
          anchor('center'),
          area(),
        ])
        
      const controlPrompts = add([pos(center().x + 30, center().y)])
        controlPrompts.add([sprite("arrow-up"), pos(0, -80)])
        controlPrompts.add([sprite("arrow-down")])
        controlPrompts.add([sprite("arrow-left"), pos(-80, 0)])
        controlPrompts.add([sprite("arrow-right"), pos(80, 0)])
        controlPrompts.add([sprite('Space_key'), pos(-200, 0)])
        controlPrompts.add([
        text("Jump", { font: "Round", size: 32 }),
        pos(-190, 100),
      ])
      controlPrompts.add([
        text("Move", { font: "Round", size: 32 }),
        pos(10, 100),
      ])
      onKeyPress("enter", () => {
        play('confirm-ui', {speed: 1})
        go(1)
      })
      }
      displayGameOverScreen() {
        add([rect(1280, 720), color(0, 0, 0)])
        add([
          text("Game Over!", { size: 50, font: "Round" }),
          area(),
          anchor("center"),
          pos(center()),
        ])
    
        this.displayBlinkingUIMessage(
          "Press [ Enter ] to Start Again",
          vec2(center().x, center().y + 100)
        )
    
        onKeyPress("enter", () => {
          play("confirm-ui")
          go(1)
        })
      }
      displayEndGameScreen() {
        add([rect(1280, 720), color(0, 0, 0)])
        add([
          text("You Won! Thanks for Playing.", { size: 50, font: "Round" }),
          area(),
          anchor("center"),
          pos(center()),
        ])
    
        this.displayBlinkingUIMessage(
          "Press [ Enter ] to Play Again",
          vec2(center().x, center().y + 100)
        )
    
        onKeyPress("enter", () => {
          play("confirm-ui")
          go("menu")
        })
      }

}

export const uiManager = new UImanager();
