const express = require('express')
const { Server } = require('socket.io')

const CANVAS_DIMENSIONS = {
  width: 1200,
  height: 600,
}

const app = express()
const srv = app.listen(3000)

app.use(express.static('public'))

const io = new Server(srv, {
  cors: {
    origin: '*',
    credentials: false,
  },
})

const serverPlayers = {}

const playerInitData = {
  1: { x: 100, y: 100, direction: 180 },
  2: { x: 200, y: 200, direction: 90 },
}

let projectileId = 0
const serverProjectiles = {}

io.on('connection', (socket) => {
  console.log('a user connected')
  serverPlayers[socket.id] = {
    x: playerInitData[1].x,
    y: playerInitData[1].y,
    direction: playerInitData[1].direction,
  }
  io.emit('updatePlayers', serverPlayers)

  socket.on('disconnect', (reason) => {
    delete serverPlayers[socket.id]
    io.emit('updatePlayers', serverPlayers)
  })

  socket.on('keyDown', (key) => {
    if (key === 'leftArrow') {
      serverPlayers[socket.id].x -= 3
      serverPlayers[socket.id].direction = 180
    } else if (key === 'rightArrow') {
      serverPlayers[socket.id].x += 3
      serverPlayers[socket.id].direction = 0
    } else if (key === 'upArrow') {
      serverPlayers[socket.id].y -= 3
      serverPlayers[socket.id].direction = -90
    } else if (key === 'downArrow') {
      serverPlayers[socket.id].y += 3
      serverPlayers[socket.id].direction = 90
    }
  })

  socket.on('shoot', ({ x, y, direction }) => {
    projectileId++

    let velocity
    switch (direction) {
      case 180:
        velocity = { x: -15, y: 0 }
        break
      case -90:
        velocity = { x: 0, y: -15 }
        break
      case 0:
        velocity = { x: 15, y: 0 }
        break
      case 90:
        velocity = { x: 0, y: 15 }
        break
      default:
        break
    }

    serverProjectiles[projectileId] = {
      x,
      y,
      velocity,
      playerId: socket.id,
    }
  })
})

setInterval(() => {
  //update projectile positions
  for (const serverProjectileId in serverProjectiles) {
    const serverProjectile = serverProjectiles[serverProjectileId]

    serverProjectile.x += serverProjectile.velocity.x
    serverProjectile.y += serverProjectile.velocity.y

    if (
      serverProjectile.x < 0 ||
      serverProjectile.x > CANVAS_DIMENSIONS.width ||
      serverProjectile.y < 0 ||
      serverProjectile.y > CANVAS_DIMENSIONS.height
    ) {
      delete serverProjectiles[serverProjectileId]
      continue
    }

    for (const serverPlayerId in serverPlayers) {
      const serverPlayer = serverPlayers[serverPlayerId]

      const DISTANCE = Math.hypot(
        serverProjectiles[serverProjectileId].x - serverPlayer.x,
        serverProjectiles[serverProjectileId].y - serverPlayer.y,
      )

      const TMP_ARBITRARY_DISTANCE = 10
      if (DISTANCE < TMP_ARBITRARY_DISTANCE) {
        if (serverProjectiles[serverProjectileId].playerId !== serverPlayerId) {
          delete serverProjectiles[serverProjectileId]
          // delete serverPlayers[id]
          console.log('HIT')
          break
        }
      }
    }
  }

  io.emit('updateProjectiles', serverProjectiles)
  io.emit('updatePlayers', serverPlayers)
}, 15)
