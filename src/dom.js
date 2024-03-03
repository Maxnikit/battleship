const gameBoard1container = document.querySelector(".gameBoard.left");
const gameBoard2container = document.querySelector(".gameBoard.right");
const chooseBoardContainer = document.querySelector("#chooseBoardContainer");
import Gamelogic from "./gamelogic";
class DOM {
  initChoose(chooseBoard, gameBoard) {
    const shipsDOM = document.querySelectorAll(".ship");
    shipsDOM.forEach((ship) => {
      ship.addEventListener("click", (e) => {
        console.log(e);
        const coords = e.target.id.split("-");

        const location = [parseInt(coords[0]), parseInt(coords[1])];
        const shipObject = chooseBoard.getShip(location);
        console.log(shipObject);
        const cells = shipObject.getPositions();
        console.log(cells);
        cells.forEach((cell) => {
          const cellElement = document.getElementById(`${cell[0]}-${cell[1]}`);
          cellElement.classList.add("selected");
        });
        chooseBoard.removeShip(location, shipObject);
      });
    });
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
    console.log(gameBoard);
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
