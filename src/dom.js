const gameBoard1container = document.querySelector(".gameBoard.left");
const gameBoard2container = document.querySelector(".gameBoard.right");
const chooseBoardContainer = document.querySelector("#chooseBoardContainer");
import Gamelogic from "./gamelogic";
class DOM {
  processFinishOfPlacement(shipNum) {
    let counter;
    if (shipNum === 4) {
      counter = document.querySelector("#fourCount");
      const ship4 = document.querySelector(".fourShip");
      ship4.classList.toggle("selected");
    } else if (shipNum === 3) {
      counter = document.querySelector("#threeCount");
      const ship3 = document.querySelector(".threeShip");
      ship3.classList.toggle("selected");
    } else if (shipNum === 2) {
      counter = document.querySelector("#twoCount");
      const ship2 = document.querySelector(".twoShip");
      ship2.classList.toggle("selected");
    } else if (shipNum === 1) {
      counter = document.querySelector("#oneCount");
      const ship1 = document.querySelector(".oneShip");
      ship1.classList.toggle("selected");
    } else {
      console.log("WTF");
    }
    const currentCounter = parseInt(counter.innerHTML);
    const newCounter = currentCounter - 1;
    counter.innerHTML = newCounter + " x";
  }
  removeCellPlaceListeners() {
    const cells = document.querySelectorAll(".gameBoard.left .cell");

    cells.forEach((cell) => {
      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
      cell = newCell;
    });
  }
  addCellPlaceListeners(gameLogic, shipNum) {
    this.removeCellPlaceListeners();
    const cells = document.querySelectorAll(".gameBoard.left .cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        const location = cell.id.split("-");
        location[0] = parseInt(location[0]);
        location[1] = parseInt(location[1]);
        // TODO check if user presses on other ships and change selection
        // TODO fix bounds checking when placing new ship
        if (gameLogic.placeShip(location, shipNum)) {
          console.log("ship placed");
          this.processFinishOfPlacement(shipNum);
          return true;
        } else {
          console.log("ship not placed");
          return false;
        }
      });
    });
  }
  placeShips(gameLogic) {
    // TODO check if 0 ships remaining, forbid placing new ones
    console.log(gameLogic);

    const ship4 = document.querySelector(".fourShip");
    ship4.addEventListener("click", (e) => {
      // if (ship1.classList.contains("selected")) {
      ship1.classList.remove("selected");
      ship2.classList.remove("selected");
      ship3.classList.remove("selected");
      this.removeCellPlaceListeners();
      // }

      ship4.classList.toggle("selected");
      this.addCellPlaceListeners(gameLogic, 4);

      //  this.updateShipCount(4);

      console.log("unexpected");
    });

    const ship3 = document.querySelector(".threeShip");
    ship3.addEventListener("click", (e) => {
      ship1.classList.remove("selected");
      ship2.classList.remove("selected");
      ship4.classList.remove("selected");
      ship3.classList.toggle("selected");
      this.addCellPlaceListeners(gameLogic, 3);
    });

    const ship2 = document.querySelector(".twoShip");
    ship2.addEventListener("click", (e) => {
      ship1.classList.remove("selected");
      ship4.classList.remove("selected");
      ship3.classList.remove("selected");
      ship2.classList.toggle("selected");
      this.addCellPlaceListeners(gameLogic, 2);
    });

    const ship1 = document.querySelector(".oneShip");
    ship1.addEventListener("click", (e) => {
      ship4.classList.remove("selected");
      ship2.classList.remove("selected");
      ship3.classList.remove("selected");
      ship1.classList.toggle("selected");
      this.addCellPlaceListeners(gameLogic, 1);
    });
  }
  updateShipCount(shipsPlaced) {
    const fourCount = document.querySelector("#fourCount");
    console.log(fourCount);
    const threeCount = document.querySelector("#threeCount");
    const twoCount = document.querySelector("#twoCount");
    const oneCount = document.querySelector("#oneCount");
  }
  displayBoard(gameBoard, direction) {
    let container;
    if (direction === "left") {
      container = gameBoard1container;
    } else if (direction === "right") {
      container = gameBoard2container;
    } else if (direction === "choose") {
      container = chooseBoardContainer;
    }
    container.innerHTML = "";
    let boardArray;

    if (Array.isArray(gameBoard)) {
      boardArray = gameBoard;
    } else {
      boardArray = gameBoard.getBoard();
    }
    boardArray.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.id = `${rowIndex}-${cellIndex}`;
        if (cell === 0) {
          cellElement.classList.add("free");
        } else if (typeof cell === "object") {
          if (
            cell.hits.find(
              (coords) => coords[0] === rowIndex && coords[1] === cellIndex
            )
          ) {
            cellElement.classList.add("hit");
          }
          cellElement.classList.add("ship");
        } else if (cell === "miss") {
          cellElement.classList.add("miss");
        }
        container.appendChild(cellElement);
      });
    });
  }

  addEventListeners(gameboard1, gameboard2) {
    this.addAttackListener(gameboard1, "left");
    this.addAttackListener(gameboard2, "right");
  }
  addAttackListener(gameBoard, direction) {
    let container;
    if (direction === "left") {
      container = gameBoard1container;
    } else if (direction === "right") {
      container = gameBoard2container;
    }
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        const coords = e.target.id.split("-");

        const location = [parseInt(coords[0]), parseInt(coords[1])];

        gameBoard.receiveAttack(location);
        this.displayBoard(gameBoard, direction);
      }
    });
  }
}

export default new DOM();
