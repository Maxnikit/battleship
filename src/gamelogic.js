import DOM from "./dom";
import Player from "./player";
import Ship from "./ship";
import Gameboard from "./gameboard";

class Gamelogic {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();

    this.players = [this.player1, this.player2];
  }
  placeShipsRandomly(player) {
    function arraysAreEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    }
    function containsArray(bigArray, targetArray) {
      return bigArray.some((subArray) => arraysAreEqual(subArray, targetArray));
    }
    const ships = player.generateShips();
    console.log(ships);
    let excludedLocations = [];
    let counter = 0;
    for (const ship of player.ships) {
      let placed = false;

      while (!placed) {
        const location = player.board.getRandomLocation();
        if (containsArray(excludedLocations, location)) continue;

        if (player.board.placeShip(location, ship)) {
          counter++;
          console.log(`ship number ${counter} placed`);
          placed = true;
        } else {
          excludedLocations.push(location);
          console.log(excludedLocations);
        }
      }
    }
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
  initGame() {
    const leftBoard = this.player1.getBoard();
    const rightBoard = this.player2.getBoard();

    DOM.displayBoard(leftBoard, "left");
    DOM.displayBoard(rightBoard, "right");
    this.placeShipsRandomly(this.player2);
    DOM.displayBoard(rightBoard, "right");
    // DOM.placeShips(this);
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
  gameLoop() {
    this.initGame();
    while (!this.isGameOver()) {
      for (const player of this.players) {
        if (player.getIsTurn()) {
          const guessCoordinate = getPlayerGuess(player);
          // Get the opponent player
          const opponent =
            player === this.player1 ? this.player2 : this.player1;
          // Get the opponent's gameboard
          const opponentBoard = opponent.getBoard();
          opponentBoard.receiveAttack(guessCoordinate);
          // Check if the hit resulted in a win
          if (isGameOver(players)) {
            console.log(`${player.name} wins the game!`);
            return;
          }

          // It's now the other player's turn
          switchTurns(players);
        }
      }
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
