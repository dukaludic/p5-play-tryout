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
      this.x -= 3
      this.currentDirection = 180
    } else if (keyIsDown(RIGHT_ARROW) && this.possibleMovingDirections.right) {
      this.x += 3
      this.currentDirection = 0
    } else if (keyIsDown(UP_ARROW) && this.possibleMovingDirections.up) {
      this.y -= 3
      this.currentDirection = -90
    } else if (keyIsDown(DOWN_ARROW) && this.possibleMovingDirections.down) {
      this.y += 3
      this.currentDirection = 90
    }

    return {
      x: this.x,
      y: this.y,
      direction: this.currentDirection,
    }
  }
}
