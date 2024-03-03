function initDrag() {
  document.querySelectorAll(".ship").forEach((ship) => {
    ship.setAttribute("draggable", "true");
    ship.addEventListener("dragstart", this.handleDragStart);
  });
  document.querySelectorAll(".gameBoard").forEach((gameBoard) => {
    gameBoard.addEventListener("dragover", this.handleDragOver);
    gameBoard.addEventListener("drop", this.handleDrop);
  });
}
function handleDragOver(e) {
  e.preventDefault(); // Necessary to allow dropping.
}
function handleDragStart(e) {
  console.log(e);
  e.dataTransfer.setData("text/plain", e.target.id);
}
function handleDrop(e) {
  e.preventDefault();
  const shipId = e.dataTransfer.getData("text/plain");
  const ship = document.getElementById(shipId);
  console.log(ship);
}
