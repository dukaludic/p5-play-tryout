function Tank(x, y) {
  this.x = x
  this.y = y
  this.currentDirection = -90
  this.projectileSpeed = 1

  this.show = function () {
    // push()

    // fill(255)
    // translate(this.x, this.y)
    // rotate(50)
    // rect(this.x, this.y, 50, 50)

    // // Gun
    // // translate(this.x, this.y)
    // // rotate(50)
    // rect(this.x + 17.5, this.y + 17.5, 10, 50)

    // pop()

    // rect(this.x, this.y, 50, 50)

    push()
    translate(this.x, this.y)
    rotate(this.currentDirection)

    // Tank body
    rectMode(CENTER)
    fill(100)
    rect(0, 0, 30, 20)

    // Tank turret
    fill(150)
    rect(15, 0, 10, 5)

    pop()
  }

  this.move = function () {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5
      this.currentDirection = 180
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5
      this.currentDirection = 0
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= 5
      this.currentDirection = -90
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5
      this.currentDirection = 90
    }

    return {
      x: this.x,
      y: this.y,
      direction: this.currentDirection,
    }
  }
}
