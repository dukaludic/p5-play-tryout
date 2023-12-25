class Collidable {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.possibleMovingDirections = {
      up: true,
      down: true,
      right: true,
      left: true,
    }
  }

  collidesWith(element) {
    if (this.collidesFromRightSideOfElement(this, element)) {
      this.possibleMovingDirections.left = false
    } else {
      this.possibleMovingDirections.left = true
    }

    if (this.collidesFromLeftOfElement(this, element)) {
      this.possibleMovingDirections.right = false
    } else {
      this.possibleMovingDirections.right = true
    }

    if (this.collidesFromBottomOfElement(this, element)) {
      this.possibleMovingDirections.up = false
    } else {
      this.possibleMovingDirections.up = true
    }

    if (this.collidesFromTopOfElement(this, element)) {
      this.possibleMovingDirections.down = false
    } else {
      this.possibleMovingDirections.down = true
    }

    return (
      this.x < element.x + element.w &&
      this.x + this.w > element.x &&
      this.y < element.y + element.h &&
      this.y + this.h > element.y
    )
  }

  collidesWithEdgeOfCanvas() {
    if (this.x - this.w < 0) {
      console.log('collides to the left')
      this.possibleMovingDirections.left = false
    } else {
      this.possibleMovingDirections.left = true
    }

    if (this.x + this.w > CANVAS_DIMENSIONS.width) {
      this.possibleMovingDirections.right = false
    } else {
      this.possibleMovingDirections.right = true
    }

    if (this.y - 20 < 0) {
      this.possibleMovingDirections.up = false
    } else {
      this.possibleMovingDirections.up = true
    }

    if (this.y + 20 > CANVAS_DIMENSIONS.height) {
      this.possibleMovingDirections.down = false
    } else {
      this.possibleMovingDirections.down = true
    }
  }

  collidesFromTopOfElement = (primary, secondary) =>
    primary.y + 35 > secondary.y &&
    primary.y < secondary.y + secondary.h &&
    primary.x > secondary.x - secondary.w &&
    primary.x < secondary.x + secondary.w

  collidesFromBottomOfElement = (primary, secondary) =>
    primary.y - 5 < secondary.y + secondary.h &&
    primary.y > secondary.y &&
    primary.x > secondary.x - secondary.w &&
    primary.x < secondary.x + secondary.w

  collidesFromLeftOfElement = (primary, secondary) =>
    primary.x + primary.h > secondary.x &&
    primary.x < secondary.x + secondary.w &&
    primary.y > secondary.y - secondary.h &&
    primary.y < secondary.y + secondary.h

  collidesFromRightSideOfElement = (primary, secondary) =>
    primary.x - 10 < secondary.x + secondary.w &&
    primary.x > secondary.x &&
    primary.y > secondary.y - secondary.h &&
    primary.y < secondary.y + secondary.h
}
