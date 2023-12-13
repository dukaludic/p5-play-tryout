function Tank(x, y) {
  this.x = x
  this.y = y
  this.currentDirection = {
    x: 1,
    y: 1,
  }
  this.projectileSpeed = 1

  this.show = function () {
    fill(255)
    rect(this.x, this.y, 50, 50)

    // Gun
    rect(this.x, this.y, 20, 100, 2)
  }

  // this.shoot = function () {
  //   // console.log('shot fired')
  //   // let x, y
  //   // x = this.x + this.projectileSpeed
  //   // y = this.y + this.projectileSpeed
  //   // rect(x, y, 10, 10)
  //   // fill(255)
  // }

  this.move = function () {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5
      this.currentDirection.x = -1
      this.currentDirection.y = 0
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5
      this.currentDirection.x = 1
      this.currentDirection.y = 0
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= 5
      this.currentDirection.y = -1
      this.currentDirection.x = 0
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5
      this.currentDirection.y = 1
      this.currentDirection.x = 0
    }

    console.log(this.currentDirection)

    return {
      x: this.x,
      y: this.y,
    }
  }
}
