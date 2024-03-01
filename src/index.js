import "normalize.css";
import "./style.css";

import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const gameboardInstance = new Gameboard();
const shipInstance = new Ship(4);
gameboardInstance.placeShip([4, 4], shipInstance);
gameboardInstance.rotateShip([4, 4]);
console.log(shipInstance.getOrientation());
gameboardInstance.receiveAttack([4, 4]);
console.log(shipInstance.getOrientation());
gameboardInstance.receiveAttack([5, 4]);
gameboardInstance.receiveAttack([6, 4]);
console.log(shipInstance.getOrientation());
gameboardInstance.receiveAttack([7, 4]);
console.log(shipInstance.getOrientation());
console.log(gameboardInstance.getBoard());
