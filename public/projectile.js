function Projectile(x, y, direction) {
  this.x = x
  this.y = y
  this.direction = { ...direction }

  this.speed = 5

  this.show = function () {
    const x = this.x
    const y = this.y

    ellipse(
      25 + (this.x += this.direction.x * this.speed),
      25 + (this.y += this.direction.y * this.speed),
      10,
      10,
    )
  }
}
