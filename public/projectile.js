class Projectile extends Collidable {
  constructor(x, y, w, h, direction) {
    super(x, y, w, h)
    this.speed = 15
  }
  show = function () {
    fill(255, 0, 0)
    rect(this.x, this.y, 5, 5)
  }
}
