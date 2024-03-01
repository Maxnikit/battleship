import Gameboard from "./gameboard";
class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
    this.ships = [];
    this.isTurn = false;
    this.isWinner = false;
  }

  placeShip(location, ship) {
    this.board.placeShip(location, ship);
    this.ships.push(ship);
  }

  rotateShip(location) {
    this.board.rotateShip(location);
  }

  makeMove(location) {
    if (this.board.receiveAttack(location)) {
    }
  }
}

export default Player;
