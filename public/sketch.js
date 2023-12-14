let socket
let projectile

const CANVAS_DIMENSIONS = {
  width: 600,
  height: 400,
}

function setup() {
  socket = io.connect('http://localhost:3000')
  socket.on('tank_moved', opponentTankMoved)
  socket.on('projectile_shot', projectileShot)

  createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height)
  background(51)

  tank = new Tank(100, 100)
  tank2 = new Tank(300, 300)

  angleMode(DEGREES)
}

function projectileShot(data) {
  console.log('projectile')
}

function opponentTankMoved(data) {
  tank2.x = data.x
  tank2.y = data.y
  tank2.currentDirection = data.direction
}

function draw() {
  background(51)
  if (
    keyIsDown(LEFT_ARROW) ||
    keyIsDown(RIGHT_ARROW) ||
    keyIsDown(UP_ARROW) ||
    keyIsDown(DOWN_ARROW)
  ) {
    const coordinates = tank.move()
    socket.emit('tank_moved', coordinates)
  }

  tank.show()
  tank2.show()
  // rect(tank.x, tank.y, 50, 50)
  // rect(tank2.x, tank2.y, 50, 50)
  if (projectile) {
    projectile.show()
  }

  // if (tank.collidesWith(tank2)) {
  //   console.log('COLLISION!')
  // }

  tank.collidesWith(tank2)
  tank2.collidesWith(tank)
  // tank.collidesWithEdgeOfCanvas()

  // if (tank.collidesWithEdgeOfCanvas().left) {
  //   console.log('COLLISION!')
  // }
}

function keyPressed() {
  if (keyCode === 32) {
    projectile = new Projectile(tank.x, tank.y, tank.currentDirection)
    socket.emit('projectile_fired', projectile)
  }
}
