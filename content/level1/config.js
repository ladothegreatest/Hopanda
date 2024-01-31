export const level1Config = {
  gravity: 100,
  playerSpeed: 400,
  jumpForce: 650,
  nbLives: 3,
  playerStartPosX: 1000,
  playerStartPosY: 200,
  spiderPositions: [
      () => vec2(2000, 300),
      () => vec2(2020, 0),
      () => vec2(3200, 200),
      () => vec2(3500, 300),
  ],
  spiderRanges: [300, 150, 150, 300],
  spiderDurations: [2, 1, 1, 2],
  spiderType: 1,
  fishPositions: [
      () => vec2(2595, 600),
      () => vec2(2655, 600),
      () => vec2(4100, 600),
      () => vec2(4220, 800),
      () => vec2(5200, 800),
      () => vec2(5300, 800),
  ],
  fishRanges: [300, 500, 400, 500, 900, 800],
  bladePos: [
    () => vec2(6940, 330),
    () => vec2(7710, 330),
    () => vec2(9250, 230),
    () => vec2(9700, 230),
    () => vec2(10150,230)
  ],
  bladeDurations: [2, 2, 3, 3, 3],
  bladeRanges:[120, 115, 125, 125, 125],
  axesPositions:[
    () => vec2(8570,20),
    () => vec2(8950,-80),
    () => vec2(9400,-80),
    () => vec2(9850,-80),
    () => vec2(10300,-80)
  ],
  axeSwingtime: [2,2,2,2,2],
  flamePos: [
    () => vec2(12200, 400),
    () => vec2(11300, 300),
    () => vec2(11150, 300),
    () => vec2(11450, 300),
    () => vec2(11600, 500),
    () => vec2(11750, 400),
    () => vec2(11900, 400),
    () => vec2(12050, 400),
    () => vec2(11000, 600),
    () => vec2(10800, 400),
  ],
  flameRanges: [
    800,
    400,
    800,
    400,
    400,
    400,
    400,
    500,
    800,
    500
  ]


};
