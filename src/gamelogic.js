import DOM from "./dom";
import Player from "./player";
import Ship from "./ship";
import Gameboard from "./gameboard";

class Gamelogic {
  constructor() {
    this.player1 = new Player("left");
    this.player2 = new Player("right");

    this.players = [this.player1, this.player2];
  }
  placeShipsRandomly(player) {
    const ships = player.generateShips();
    console.log(ships);
    let excludedLocations = [];
    let counter = 0;
    for (const ship of player.ships) {
      let placed = false;
      let amountOfTries = 0;
      while (!placed) {
        const location = player.getBoard().getRandomLocation(excludedLocations);

        if (player.getBoard().placeShip(location, ship)) {
          excludedLocations = [];
          counter++;
          console.log(`ship number ${counter} placed`);
          placed = true;
        } else {
          console.log("ship not placed");
          console.log(ship);
          amountOfTries++;
          console.log(amountOfTries);
          excludedLocations.push(location);
          console.log(excludedLocations);
        }
      }
    }

    return player.getBoard();
  }
  getPlayer1() {
    return this.player1;
  }

  getPlayer2() {
    return this.player2;
  }
  getPlayers() {
    return this.players;
  }
  startGame() {
    this.getPlayer1().setTurn(true);
    this.gameLoop();
  }
  initGame() {
    const leftBoard = this.player1.getBoard();
    const rightBoard = this.player2.getBoard();
    this.placeShipsRandomly(this.player1);
    this.placeShipsRandomly(this.player2);
    DOM.displayBoard(leftBoard, "left");
    DOM.initStartButton(this);

    // DOM.addEventListeners(this.player1.getBoard(), this.player2.getBoard());
  }
  isGameOver() {
    return this.player1.isWinner || this.player2.isWinner;
  }
  switchTurns() {
    if (this.player1.getIsTurn()) {
      this.player1.setTurn(false);
      this.player2.setTurn(true);
    } else if (this.player2.getIsTurn()) {
      this.player1.setTurn(true);
      this.player2.setTurn(false);
    } else {
      console.log("something went wrong");
    }
  }
  getPlayerGuess(player) {
    const guess = prompt(`${player.name}, please enter your guess`);
    return guess;
  }
  proceedTurn(player) {
    if (this.isGameOver()) {
      alert(`${player.name} won`);
    }
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
  rotateShip(location) {
    const leftBoard = this.player1.getBoard();
    leftBoard.rotateShip(location);
  }
  attack() {}
}
export default Gamelogic;
