import Player from "./player";

test("create a player", () => {
  const playerInstance = new Player("test");
  expect(playerInstance.name).toBe("test");
});

test("generate random 10 ships", () => {
  const playerInstance = new Player("test");
  playerInstance.generateShips();
  expect(playerInstance.getShips().length).toBe(10);
});
