const CANVAS_DIMENSIONS = {
  width: 1200,
  height: 600,
}

let backgroundImage
let tankImage
let socket
const clientPlayers = {}
const clientProjectiles = []

function preload() {
  backgroundImage = loadImage('./images/map.png')
  tankImage = loadImage('./images/tank.png')
}

function setup() {
  angleMode(DEGREES)
  background(51)
  createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height)

  socket = io.connect('http://localhost:3000', {
    withCredentials: false,
  })

  socket.on('updateProjectiles', (serverProjectiles) => {
    for (const id in serverProjectiles) {
      const serverProjectile = serverProjectiles[id]

      debugger

      if (!clientProjectiles[id]) {
        clientProjectiles[id] = new Projectile(
          serverProjectile.x,
          serverProjectile.y,
          undefined,
          undefined,
          // serverProjectile.direction,
        )
      } else {
        clientProjectiles[id].x += serverProjectiles[id].velocity.x
        clientProjectiles[id].y += serverProjectiles[id].velocity.y
      }

      for (const clientProjectileId in clientProjectiles) {
        if (!serverProjectiles[clientProjectileId]) {
          delete clientProjectiles[clientProjectileId]
        }
        console.log(clientProjectiles)
      }
    }
  })

  socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
      const serverPlayers = backendPlayers[id]

      if (!clientPlayers[id]) {
        clientPlayers[id] = new Tank(
          serverPlayers.x,
          serverPlayers.y,
          undefined,
          undefined,
          serverPlayers.direction,
        )
      } else {
        clientPlayers[id].x = serverPlayers.x
        clientPlayers[id].y = serverPlayers.y
        clientPlayers[id].currentDirection = serverPlayers.direction
      }
    }

    for (const id in clientPlayers) {
      if (!backendPlayers[id]) {
        delete clientPlayers[id]
      }
    }
  })
}

function draw() {
  image(
    backgroundImage,
    0,
    0,
    CANVAS_DIMENSIONS.width,
    CANVAS_DIMENSIONS.height,
  )

  moveCurrentPlayer(socket.id)
  handlePlayersCollision(clientPlayers)
  handleShowProjectiles(clientProjectiles)
  handleShowPlayers(clientPlayers)
  handleCanvasCollision(clientPlayers)
}

function keyPressed(key) {
  const thisPlayer = clientPlayers[socket.id]

  if (key.keyCode == 32) {
    socket.emit('shoot', {
      x: thisPlayer.x,
      y: thisPlayer.y,
      direction: thisPlayer.currentDirection,
    })
  }

  if (key.keyCode == 84) {
    console.log({ x: mouseX, y: mouseY })
    console.log({ playerX: thisPlayer.x, playerY: thisPlayer.y })
    console.log(clientPlayers)
    console.log(clientProjectiles)
  }
}

function moveCurrentPlayer(id) {
  if (
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(UP_ARROW) ||
    keyIsDown(DOWN_ARROW)
  ) {
    clientPlayers[socket.id].move()
  }
}

function handlePlayersCollision(clientPlayers) {
  const player1 = clientPlayers[Object.keys(clientPlayers)[0]]
  const player2 = clientPlayers[Object.keys(clientPlayers)[1]]
  if (player1 && player2) {
    player1.collidesWith(player2)

    player2.collidesWith(player1)
  }
}

function handleShowProjectiles(clientProjectiles) {
  for (let i = clientProjectiles.length; i >= 0; i--) {
    if (clientProjectiles[i]) {
      clientProjectiles[i].show()
    }
  }
}

function handleShowPlayers(clientPlayers) {
  for (const key in clientPlayers) {
    const player = clientPlayers[key]

    player.show()
  }
}

function handleCanvasCollision(clientPlayers) {
  for (const key in clientPlayers) {
    const player = clientPlayers[key]
    player.collidesWithEdgeOfCanvas()
  }
}

function keyReleased(key) {
  for (const key in clientPlayers) {
    const player = clientPlayers[key]
    player.keyPressed.leftArrow.pressed = key.code === 'ArrowLeft'
    player.keyPressed.rightArrow.pressed = key.code === 'ArrowRight'
    player.keyPressed.upArrow.pressed = key.code === 'ArrowUp'
    player.keyPressed.downArrow.pressed = key.code === 'ArrowDown'
  }
}
