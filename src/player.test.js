import Player from "./player";

test("create a player", () => {
  const playerInstance = new Player("test");
  expect(playerInstance.name).toBe("test");
});
