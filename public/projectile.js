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

// Entity component system. JS ima male biblioteke
// Ima ensy
// Benchmark JSON vs sending just string through websockets or any kind of networks
// benchmark {x:1, y:2} vs 1;2 string
