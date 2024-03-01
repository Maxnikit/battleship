import "normalize.css";
import "./style.css";

import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const gameboardInstance = new Gameboard();
const shipInstance = new Ship(4);
const shipInstance2 = new Ship(3);
gameboardInstance.placeShip([4, 4], shipInstance);
gameboardInstance.rotateShip([4, 4]);
gameboardInstance.placeShip([2, 4], shipInstance2);
console.log(gameboardInstance.getBoard());
