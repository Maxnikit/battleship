import DOM from "./dom";
import Player from "./player";
import Ship from "./ship";

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
    DOM.displayBoard(this.player1.getBoard(), "left");
    DOM.displayBoard(this.player2.getBoard(), "right");
    DOM.addEventListeners(this.player1.getBoard(), this.player2.getBoard());
  }

  placeShips() {
    this.player1.getBoard().placeShip([0, 0], new Ship(4));
    this.player1.getBoard().placeShip([2, 0], new Ship(4));
    this.player1.getBoard().rotateShip([2, 0]);

    DOM.displayBoard(this.player1.getBoard(), "left");
  }

  attack() {
    this.player1.getBoard().receiveAttack([5, 0]);
    this.player1.getBoard().receiveAttack([2, 0]);
    this.player1.getBoard().receiveAttack([3, 0]);
    this.player1.getBoard().receiveAttack([4, 0]);
    this.player1.getBoard().receiveAttack([0, 0]);
    DOM.displayBoard(this.player1.getBoard(), "left");
  }
}
export default Gamelogic;
