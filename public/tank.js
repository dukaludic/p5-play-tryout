const TANK_DIMENSIONS = {
  w: 20,
  h: 30,
}

class Tank extends Collidable {
  constructor(x, y, w = 20, h = 30, direction) {
    super(x, y, w, h)

    this.currentDirection = direction

    this.keyPressed = {
      upArrow: {
        pressed: false,
      },
      downArrow: {
        pressed: false,
      },
      rightArrow: {
        pressed: false,
      },
      leftArrow: {
        pressed: false,
      },
    }

    this.speed = 30

    setInterval(() => {
      if (this.keyPressed.leftArrow.pressed) {
        // players[socket.id].x -= this.speed
        // players[socket.id].currentDirection = 180
        socket.emit('keyDown', 'leftArrow')
      } else if (this.keyPressed.rightArrow.pressed) {
        // players[socket.id].x += this.speed
        // players[socket.id].currentDirection = 0
        socket.emit('keyDown', 'rightArrow')
      } else if (this.keyPressed.upArrow.pressed) {
        // players[socket.id].y -= this.speed
        // players[socket.id].currentDirection = -90
        socket.emit('keyDown', 'upArrow')
      } else if (this.keyPressed.downArrow.pressed) {
        // players[socket.id].y += this.speed
        // players[socket.id].currentDirection = 90
        socket.emit('keyDown', 'downArrow')
      }
    }, 15)
  }

  show = () => {
    push()
    translate(this.x, this.y)
    rotate(this.currentDirection)

    // Set image mode to CENTER
    imageMode(CENTER)

    // Draw the tank image
    image(tankImage, 0, 0, 60, 30)

    pop()
  }

  move = () => {
    if (keyIsDown(LEFT_ARROW) && this.possibleMovingDirections.left) {
      this.keyPressed.leftArrow.pressed = true
    } else if (keyIsDown(RIGHT_ARROW) && this.possibleMovingDirections.right) {
      this.keyPressed.rightArrow.pressed = true
    } else if (keyIsDown(UP_ARROW) && this.possibleMovingDirections.up) {
      this.keyPressed.upArrow.pressed = true
    } else if (keyIsDown(DOWN_ARROW) && this.possibleMovingDirections.down) {
      this.keyPressed.downArrow.pressed = true
    }
  }
}
