let socket
let projectile

const CANVAS_DIMENSIONS = {
  width: 600,
  height: 400,
}

const players = {}

let id

function setup() {
  angleMode(DEGREES)
  background(51)
  createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height)

  socket = io.connect('http://localhost:3000')
  socket.on('tank_moved', tankMoving)

  socket.on('player_entered', (data) => {
    console.log('Player entered:', data)
    id = data.id

    players[0] = new Tank(data.gameState[0].x, data.gameState[0].y)
    if (data.players[1]) {
      // players[1] = new Tank(data.players[1].x, data.players[1].y)
    }
  })
}

function tankMoving(data) {
  console.log(data, 'game state')
  // // console.log(players)
  // console.log({ id })
  // const playerIndex = data.id
  // players[1].x = data[1].x
  // players[1].y = data[1].y
  // players[1].currentDirection = data[1].direction
  // players[0].x = data[0].x
  // players[0].y = data[0].y
  // players[0].currentDirection = data[0].direction
}

function draw() {
  background(51)
  if (
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(UP_ARROW) ||
    keyIsDown(DOWN_ARROW)
  ) {
    for (const key in players) {
      const player = players[key]
      const coordinates = player.move()
      // socket.emit('tank_moved', { id, coordinates })
    }
  }

  // if (players[0]) {
  //   players[1].show()
  //   players[0].show()
  // }

  for (const key in players) {
    // console.log(players, 'plyaers')
    const player = players[key]
    player.show()
  }
}

function keyPressed() {
  if ((keyCode = 32)) {
    console.log(players)
  }
}
