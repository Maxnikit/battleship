import Gameboard from "./gameboard";
import Ship from "./ship";
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
    // this.ships.push(ship);
  }

  rotateShip(location) {
    this.board.rotateShip(location);
  }

  setTurn(turn) {
    this.isTurn = turn;
  }
  getRandomOrientation() {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
  }
  generateShips() {
    this.ships.push(new Ship(4, this.getRandomOrientation()));
    this.ships.push(new Ship(3, this.getRandomOrientation()));
    this.ships.push(new Ship(3, this.getRandomOrientation()));
    this.ships.push(new Ship(2, this.getRandomOrientation()));
    this.ships.push(new Ship(2, this.getRandomOrientation()));
    this.ships.push(new Ship(2, this.getRandomOrientation()));
    this.ships.push(new Ship(1));
    this.ships.push(new Ship(1));
    this.ships.push(new Ship(1));
    this.ships.push(new Ship(1));

    return this.ships;
  }

  getShips() {
    return this.ships;
  }
  getIsTurn() {
    return this.isTurn;
  }
}

export default Player;
