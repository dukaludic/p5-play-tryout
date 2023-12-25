class Projectile {
  constructor(x, y, direction) {
    console.log(x, y, direction)
    // return
    this.x = x
    this.y = y
    this.direction = { ...direction }

    this.speed = 5
  }
  show = function () {
    const x = this.x
    const y = this.y
    // console.log(x, y, this.direction)

    ellipse(
      25 + (this.x += this.direction * this.speed),
      25 + (this.y += this.direction * this.speed),
      10,
      10,
    )
  }
}
