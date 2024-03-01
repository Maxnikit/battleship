import "normalize.css";
import "./style.css";

import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Gamelogic from "./gamelogic.js";
import DOM from "./dom.js";
const gameLogic = new Gamelogic();

gameLogic.initGame(
  gameLogic.getPlayer1().getBoard(),
  gameLogic.getPlayer2().getBoard()
);
gameLogic.placeShips();
gameLogic.attack();
