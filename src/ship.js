class Ship {
  constructor(length) {
    const minLength = 1;
    const maxLength = 4;
    if (length < minLength || length > maxLength) {
      throw new Error(`Length must be between ${minLength} and ${maxLength}`);
    }
    this.sunk = false;
    this.length = length;
    this.hits = [];
    this.position = [];
    this.health = length - this.hits;
    this.orientation = "horizontal";
    this.location = [];
  }

  getHealth() {
    return this.length - this.hits.length;
  }

  getLength() {
    return this.length;
  }

  getOrientation() {
    return this.orientation;
  }

  hit(location) {
    if (this.health > 0) {
      this.hits.push(location);
      this.health -= 1;
    } else {
      throw new Error("Cannot hit a ship with health of 0");
    }

    if (this.health === 0) {
      this.sunk = true;
    }
  }

  rotate() {
    if (this.orientation === "horizontal") {
      this.orientation = "vertical";
    } else {
      this.orientation = "horizontal";
    }
    console.log(`rotated to ${this.orientation}`);
  }

  isSunk() {
    return this.sunk;
  }
}

export default Ship;
