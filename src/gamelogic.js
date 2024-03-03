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
    const chooseBoard = new Gameboard(8);
    const leftBoard = this.player1.getBoard();
    const rightBoard = this.player2.getBoard();
    this.placeStartingShips(chooseBoard);
    // TODO make drag and drop or choose feauture to place ships
    DOM.displayBoard(chooseBoard, "choose");
    DOM.displayBoard(leftBoard, "left");
    // DOM.displayBoard(rightBoard, "right");
    DOM.initChoose(chooseBoard, leftBoard);
    // DOM.addEventListeners(this.player1.getBoard(), this.player2.getBoard());
  }
  placeStartingShips(chooseBoard) {
    chooseBoard.placeShip([0, 0], new Ship(4));
    chooseBoard.placeShip([2, 0], new Ship(3));
    chooseBoard.placeShip([2, 4], new Ship(3));
    chooseBoard.placeShip([4, 0], new Ship(2));
    chooseBoard.placeShip([4, 3], new Ship(2));
    chooseBoard.placeShip([4, 6], new Ship(2));
    chooseBoard.placeShip([6, 0], new Ship(1));
    chooseBoard.placeShip([6, 2], new Ship(1));
    chooseBoard.placeShip([6, 4], new Ship(1));
    chooseBoard.placeShip([6, 6], new Ship(1));
  }
  placeShips() {
    this.player1.getBoard().placeShip([0, 0], new Ship(4));
    this.player1.getBoard().placeShip([2, 0], new Ship(4));
    this.player1.getBoard().rotateShip([0, 0]);
    this.player1.getBoard().placeShip([1, 0], new Ship(3));
    DOM.displayBoard(this.player1.getBoard(), "left");
  }

  attack() {
    // this.player1.getBoard().receiveAttack([5, 0]);
    // this.player1.getBoard().receiveAttack([2, 0]);
    // this.player1.getBoard().receiveAttack([3, 0]);
    // this.player1.getBoard().receiveAttack([4, 0]);
    // this.player1.getBoard().receiveAttack([0, 0]);
    DOM.displayBoard(this.player1.getBoard(), "left");
  }
}
export default Gamelogic;
