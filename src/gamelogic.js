import DOM from "./dom";
import Player from "./player";
import Ship from "./ship";
import Gameboard from "./gameboard";

class Gamelogic {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
  }

  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }

  initGame() {
    const leftBoard = this.player1.getBoard();
    const rightBoard = this.player2.getBoard();

    DOM.displayBoard(leftBoard, "left");
    DOM.placeShips(this);
    DOM.initStartButton(this);
    // DOM.displayBoard(rightBoard, "right");

    // DOM.addEventListeners(this.player1.getBoard(), this.player2.getBoard());
  }

  placeShip(location, shipNum) {
    const leftBoard = this.player1.getBoard();
    const ship = new Ship(shipNum);
    if (leftBoard.placeShip(location, ship)) {
      DOM.displayBoard(leftBoard, "left");
      return true;
    } else {
      return false;
    }
  }

  attack() {}
}
export default Gamelogic;
