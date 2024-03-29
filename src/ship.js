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
    this.positions = [];
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
  getPositions() {
    return this.positions;
  }
  hit(location) {
    for (let hit of this.hits) {
      if (hit[0] === location[0] && hit[1] === location[1]) {
        return;
      }
    }

    if (this.health > 0) {
      this.hits.push(location);
      this.health -= 1;
    } else {
      return;
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
  }

  isSunk() {
    return this.sunk;
  }
}

export default Ship;
