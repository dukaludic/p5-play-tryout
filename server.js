const express = require('express')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const socket = require('socket.io')

const io = socket(server)

io.sockets.on('connection', newConnection)

function newConnection(socket) {
  socket.on('tank_moved', tankMoved)
  socket.on('projectile_fired', projectileFired)

  function tankMoved(data) {
    socket.broadcast.emit('tank_moved', data)
  }

  function projectileFired(data) {
    socket.broadcast.emit('projectile_fired', data)
  }
}
