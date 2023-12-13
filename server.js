const express = require('express')

const app = express()
const server = app.listen(3000)

app.use(express.static('public'))

const socket = require('socket.io')

const io = socket(server)

io.sockets.on('connection', newConnection)

function newConnection(socket) {
  console.log(socket)

  socket.on('mouse', mouseMsg)
  socket.on('tank_moved', tankMoved)

  function tankMoved(data) {
    socket.broadcast.emit('tank_moved', data)
  }

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data)
    console.log(data)
  }
}
