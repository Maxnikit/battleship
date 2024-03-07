/* eslint-disable import/no-extraneous-dependencies */
import { expect, test } from "@jest/globals";

import Gamelogic from "./gamelogic.js";

test("create a gamelogic", () => {
  const gameInstance = new Gamelogic();
  expect(gameInstance).toBeInstanceOf(Gamelogic);
});

test("generate a random gameBoard", () => {
  const gameInstance = new Gamelogic();
  expect(
    gameInstance
      .placeShipsRandomly(gameInstance.getPlayer2())
      .areAllShipsPlaced()
  ).toBe(true);
});
