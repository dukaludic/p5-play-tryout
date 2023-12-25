let socket

const CANVAS_DIMENSIONS = {
  width: 600,
  height: 400,
}

const clientPlayers = {}
const clientProjectiles = []

function setup() {
  angleMode(DEGREES)
  background(51)
  createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height)

  socket = io.connect('http://localhost:3000')

  socket.on('updateProjectiles', (serverProjectiles) => {
    for (const id in serverProjectiles) {
      const serverProjectile = serverProjectiles[id]
      // debugger
      if (!clientProjectiles[id]) {
        clientProjectiles[id] = new Projectile(
          serverProjectile.x,
          serverProjectile.y,
          undefined,
          undefined,
          serverProjectile.direction,
        )
      } else {
        clientProjectiles[id].x += serverProjectiles[id].velocity.x
        clientProjectiles[id].y += serverProjectiles[id].velocity.y

        // debugger
        // console.log(clientProjectiles[id])
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
  background(51)
  if (
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(UP_ARROW) ||
    keyIsDown(DOWN_ARROW)
  ) {
    clientPlayers[socket.id].move()
  }

  if (
    clientPlayers[Object.keys(clientPlayers)[0]] &&
    clientPlayers[Object.keys(clientPlayers)[1]]
  ) {
    clientPlayers[Object.keys(clientPlayers)[0]].collidesWith(
      clientPlayers[Object.keys(clientPlayers)[1]],
    )

    clientPlayers[Object.keys(clientPlayers)[1]].collidesWith(
      clientPlayers[Object.keys(clientPlayers)[0]],
    )
  }

  for (let i = clientProjectiles.length; i >= 0; i--) {
    if (clientProjectiles[i]) {
      clientProjectiles[i].show()
    }
  }

  for (const key in clientPlayers) {
    const player = clientPlayers[key]

    player.show()
  }

  for (const key in clientPlayers) {
    const player = clientPlayers[key]
    player.collidesWithEdgeOfCanvas()
  }
}

function keyPressed(key) {
  const thisPlayer = clientPlayers[socket.id]

  if (key.keyCode == 32) {
    // clientProjectiles.push(
    //   new Projectile(
    //     thisPlayer.x,
    //     thisPlayer.y,
    //     undefined,
    //     undefined,
    //     thisPlayer.currentDirection,
    //   ),
    // )
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
