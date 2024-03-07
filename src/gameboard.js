import Ship from "./ship";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = new Array(this.size).fill(0);
    }
  }
  getRandomLocation() {
    const result = [
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size),
    ];
    return result;
  }
  getBoard() {
    return this.board;
  }
  getShip(location) {
    return this.board[location[0]][location[1]];
  }
  placeShip(startingLocation, ship) {
    // Check if other ships are too close

    const result = this.checkForShipCollision(startingLocation, ship);
    if (result === false) {
      return;
    }
    if (ship.orientation === "horizontal") {
      // check if out of bounds
      if (startingLocation[1] + ship.length > this.size) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        ship.positions.push([startingLocation[0], startingLocation[1] + i]);

        // this.board[startingLocation[0]][startingLocation[1] + i] = ship;
      }
    } else {
      if (startingLocation[0] + ship.length > this.size) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        ship.positions.push([startingLocation[0] + i, startingLocation[1]]);

        // this.board[startingLocation[0] + i][startingLocation[1]] = ship;
      }
    }

    let collisionTestResults = [];
    ship.positions.forEach((position) => {
      collisionTestResults.push(this.checkForShipCollision(position, ship));
    });

    if (collisionTestResults.includes(false)) {
      return false;
    } else {
      if (ship.orientation === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          this.board[startingLocation[0]][startingLocation[1] + i] = ship;
        }
      } else if (ship.orientation === "vertical") {
        for (let i = 0; i < ship.length; i++) {
          this.board[startingLocation[0] + i][startingLocation[1]] = ship;
        }
      }
    }
    ship.location = startingLocation;
    return true;
  }
  checkForShipCollision(startingLocation, ship) {
    for (let i = 0; i < ship.length; i++) {
      const adjacentShipLocations =
        this.findAdjacentLocations(startingLocation)[1];

      if (
        adjacentShipLocations.some(
          (location) => this.board[location[0]][location[1]] !== ship
        )
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
  removeShip(startingLocation, ship) {
    if (ship.orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[startingLocation[0]][startingLocation[1] + i] = 0;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[startingLocation[0] + i][startingLocation[1]] = 0;
      }
    }
  }

  rotateShip(location) {
    const ship = this.board[location[0]][location[1]];
    this.removeShip(location, ship);
    ship.rotate();
    this.placeShip(location, ship);
  }

  receiveAttack(location) {
    if (this.board[location[0]][location[1]] === "miss") {
      return "already hit";
    }
    if (this.board[location[0]][location[1]] === 0) {
      this.board[location[0]][location[1]] = "miss";
      return "miss";
    }
    this.board[location[0]][location[1]].hit(location);

    if (this.board[location[0]][location[1]].isSunk()) {
      this.processSinking(this.board[location[0]][location[1]].location);
    }

    return "hit";
  }

  processSinking(location) {
    const ship = this.board[location[0]][location[1]];
    let adjacentLocations = [];
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "horizontal") {
        adjacentLocations = this.findAdjacentLocations([
          location[0],
          location[1] + i,
        ]);
      } else if (ship.orientation === "vertical") {
        adjacentLocations = this.findAdjacentLocations([
          location[0] + i,
          location[1],
        ]);
      }
      for (let i = 0; i < adjacentLocations[0].length; i++) {
        this.receiveAttack(adjacentLocations[0][i]);
      }
    }
  }

  findAdjacentLocations(location) {
    const freeLocations = [];
    const shipLocations = [];
    const missLocations = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          location[0] + i >= 0 &&
          location[0] + i < this.size &&
          location[1] + j >= 0 &&
          location[1] + j < this.size &&
          !(i === 0 && j === 0)
        ) {
          if (this.board[location[0] + i][location[1] + j] === 0) {
            freeLocations.push([location[0] + i, location[1] + j]);
          } else if (this.board[location[0] + i][location[1] + j] === "miss") {
            missLocations.push([location[0] + i, location[1] + j]);
          } else {
            shipLocations.push([location[0] + i, location[1] + j]);
          }
        }
      }
    }

    return [freeLocations, shipLocations, missLocations];
  }
  areAllShipsSunk() {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell instanceof Ship && !cell.isSunk()) {
          return false; // Found a ship that is not sunk
        }
      }
    }
    return true; // No ships found that are not sunk
  }

  areAllShipsPlaced() {
    let counter = 0;
    for (let row of this.board) {
      for (let cell of row) {
        if (cell instanceof Ship) {
          counter = counter + 1;
        }
      }
    }
    if (counter === 20) {
      return true;
    } else {
      console.log("amount of cells: " + counter);
      return false;
    }
  }
}

export default Gameboard;
