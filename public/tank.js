/**
 * @type {import('p5')}
 */
class Tank extends Collidable {
  constructor(x, y, w = 20, h = 30) {
    super(x, y, w, h)

    this.currentDirection = -90
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
      socket.emit('keyDown', 'leftArrow')
    } else if (keyIsDown(RIGHT_ARROW) && this.possibleMovingDirections.right) {
      socket.emit('keyDown', 'rightArrow')
    } else if (keyIsDown(UP_ARROW) && this.possibleMovingDirections.up) {
      console.log(this.possibleMovingDirections)
      socket.emit('keyDown', 'upArrow')
    } else if (keyIsDown(DOWN_ARROW) && this.possibleMovingDirections.down) {
      socket.emit('keyDown', 'downArrow')
    }
  }
}
