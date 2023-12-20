const express = require('express')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const socket = require('socket.io')

const io = socket(server)

io.sockets.on('connection', newConnection)

let numberOfPlayersActive = 0

const players = {}

const playerInitData = [
  { x: 100, y: 100, numberOfPlayersActive },
  { x: 200, y: 200, numberOfPlayersActive },
]

const gameState = {
  0: playerInitData[0],
  1: playerInitData[1],
}

function newConnection(socket) {
  const playerId = socket.id

  numberOfPlayersActive = Object.keys(players).length
  players[playerId] = gameState[numberOfPlayersActive]

  console.log(players)

  io.emit('player_entered', { id: socket.id, gameState })

  socket.on('tank_moved', tankMoved)
  socket.on('projectile_fired', projectileFired)
  socket.on('disconnect', disconnect)

  function disconnect(info) {
    console.log('User disconnected')
    delete players[playerId]
    // console.log(players)
    // numberOfPlayersActive--
  }

  function tankMoved(data) {
    gameState[data.id] = data.coordinates
    console.log(gameState)
    socket.broadcast.emit('tank_moved', gameState)
  }

  function projectileFired(data) {
    socket.broadcast.emit('projectile_fired', data)
  }
}
