import Gameboard from "./gameboard";
class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
    this.ships = [];
    this.isTurn = false;
    this.isWinner = false;
  }

  getBoard() {
    return this.board;
  }
  placeShip(location, ship) {
    this.board.placeShip(location, ship);
    this.ships.push(ship);
  }

  rotateShip(location) {
    this.board.rotateShip(location);
  }
}

export default Player;
