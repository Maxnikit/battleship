import Ship from "./ship";

class Gameboard {
  constructor() {
    this.size = 10;
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = new Array(this.size).fill(0);
    }
  }

  printBoard() {
    console.log(this.board.map((row) => row.join(" ")).join("\n"));
  }

  getBoard() {
    return this.board;
  }

  placeShip(startingLocation, ship) {
    if (
      startingLocation[0] + ship.length > this.size ||
      startingLocation[1] + ship.length > this.size
    ) {
      throw new Error("Ship is out of bounds");
    }

    if (ship.orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[startingLocation[0]][startingLocation[1] + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[startingLocation[0] + i][startingLocation[1]] = ship;
      }
    }
    ship.location = startingLocation;
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
    if (this.board[location[0]][location[1]] === 0) {
      this.board[location[0]][location[1]] = "miss";
      return false;
    }
    this.board[location[0]][location[1]].hit(location);
    if (this.board[location[0]][location[1]].isSunk()) {
      this.processSinking(this.board[location[0]][location[1]].location);
    }
    return true;
  }

  processSinking(location) {
    const ship = this.board[location[0]][location[1]];
    let adjacentLocations = [];
    for (let i = 0; i < ship.length; i++) {
      if ((ship.orientation = "horizontal")) {
        adjacentLocations = this.findAdjacentLocations([
          location[0] + i,
          location[1],
        ]);
      } else if ((ship.orientation = "vertical")) {
        adjacentLocations = this.findAdjacentLocations([
          location[0],
          location[1] + i,
        ]);
      }
      for (let i = 0; i < adjacentLocations[0].length; i++) {
        this.receiveAttack(adjacentLocations[0][i]);
      }
      console.log(adjacentLocations);
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
    console.log(`checked ${location}, found ${shipLocations}`);
    return [freeLocations, shipLocations, missLocations];
  }
}

export default Gameboard;
