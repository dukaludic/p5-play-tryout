const express = require('express')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const socket = require('socket.io')

const io = socket(server, { pingInterval: 2000, pingTimeout: 5000 })

const players = {}

const playerInitData = {
  1: { x: 100, y: 100 },
  2: { x: 200, y: 200 },
}

io.on('connection', (socket) => {
  console.log('a user connected')
  players[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
  }
  io.emit('updatePlayers', players)

  socket.on('disconnect', (reason) => {
    delete players[socket.id]
    io.emit('updatePlayers', players)
  })

  socket.on('keyDown', (key) => {
    if (key === 'leftArrow') {
      players[socket.id].x -= 3
      players[socket.id].currentDirection = 180
    } else if (key === 'rightArrow') {
      players[socket.id].x += 3
      players[socket.id].currentDirection = 0
    } else if (key === 'upArrow') {
      console.log(key)
      players[socket.id].y -= 3
      players[socket.id].currentDirection = -90
    } else if (key === 'downArrow') {
      console.log(key)
      players[socket.id].y += 3
      players[socket.id].currentDirection = 90
    }
  })
})

setInterval(() => {
  io.emit('updatePlayers', players)
}, 15)
