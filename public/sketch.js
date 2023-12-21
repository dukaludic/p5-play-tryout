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
  socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
      const backendPlayer = backendPlayers[id]

      if (!players[id]) {
        players[id] = new Tank(backendPlayer.x, backendPlayer.y)
      } else {
        players[id].x = backendPlayer.x
        players[id].y = backendPlayer.y
        players[id].currentDirection = backendPlayer.currentDirection
      }
    }

    for (const id in players) {
      if (!backendPlayers[id]) {
        delete players[id]
      }
    }

    // console.log(players)
  })
}

function draw() {
  background(51)
  if (
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(UP_ARROW) ||
    keyIsDown(DOWN_ARROW)
  ) {
    players[socket.id].move()
    // console.log(players, 'players')
  }

  // console.log(players[0], players[1], 'PLAYYERS')

  if (players[Object.keys(players)[0]] && players[Object.keys(players)[1]]) {
    players[Object.keys(players)[0]].collidesWith(
      players[Object.keys(players)[1]],
    )
    // player[0].collidesWithEdgeOfCanvas()
    players[Object.keys(players)[1]].collidesWith(
      players[Object.keys(players)[0]],
    )
  }

  for (const key in players) {
    const player = players[key]
    player.show()
  }
}

function keyPressed() {
  if ((keyCode = 32)) {
    console.log(players)
  }
}
