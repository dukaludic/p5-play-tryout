/**
 * @type {import('p5')}
 */
class Tank extends Collidable {
  constructor(x, y, w = 20, h = 30) {
    super(x, y, w, h)

    this.currentDirection = -90

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

    this.playerInputs = []
    this.sequenceNumber = 0
    this.speed = 3

    setInterval(() => {
      if (this.keyPressed.leftArrow.pressed) {
        this.sequenceNumber++
        this.playerInputs.push({
          sequenceNumber: this.sequenceNumber,
          dx: -this.speed,
          dy: 0,
        })
        players[socket.id].x -= this.speed
        players[socket.id].currentDirection = 180
        socket.emit('keyDown', {
          keyCode: 'leftArrow',
          sequenceNumber: this.sequenceNumber,
        })
      } else if (this.keyPressed.rightArrow.pressed) {
        this.sequenceNumber++
        this.playerInputs.push({
          sequenceNumber: this.sequenceNumber,
          dx: this.speed,
          dy: 0,
        })
        players[socket.id].x += this.speed
        players[socket.id].currentDirection = 0
        socket.emit('keyDown', {
          keyCode: 'rightArrow',
          sequenceNumber: this.sequenceNumber,
        })
      } else if (this.keyPressed.upArrow.pressed) {
        this.sequenceNumber++
        this.playerInputs.push({
          sequenceNumber: this.sequenceNumber,
          dx: 0,
          dy: -this.speed,
        })
        players[socket.id].y -= this.speed
        players[socket.id].currentDirection = -90
        socket.emit('keyDown', {
          keyCode: 'upArrow',
          sequenceNumber: this.sequenceNumber,
        })
      } else if (this.keyPressed.downArrow.pressed) {
        this.sequenceNumber++
        this.playerInputs.push({
          sequenceNumber: this.sequenceNumber,
          dx: 0,
          dy: this.speed,
        })
        players[socket.id].y += this.speed
        players[socket.id].currentDirection = 90
        socket.emit('keyDown', {
          keyCode: 'downArrow',
          sequenceNumber: this.sequenceNumber,
        })
      }
      // console.log(this.keyPressed)
    }, 15)
  }

  show = () => {
    push()
    translate(this.x, this.y)
    rotate(this.currentDirection)

    // Tank body
    rectMode(CENTER)
    fill(100)
    rect(0, 0, this.h, this.w)

    // Tank turret
    fill(150)
    rect(15, 0, 10, 5)

    //TEMP
    fill(255, 0, 0)
    rect(0, 0, 5, 5)

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
