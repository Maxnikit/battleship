/* eslint-disable import/no-extraneous-dependencies */
import { expect, test } from "@jest/globals";
import Ship from "./ship";
import Gameboard from "./gameboard";

let gameboardInstance;

beforeEach(() => {
  gameboardInstance = new Gameboard();
});

test("create a gameboard", () => {
  expect(gameboardInstance.board.length).toBe(10);
  expect(gameboardInstance.board[0].length).toBe(10);
});

test("put a 4ship on 0:0", () => {
  const shipInstance = new Ship(4);
  gameboardInstance.placeShip([0, 0], shipInstance);
  expect(gameboardInstance.getBoard()[0][0]).toBe(shipInstance);
});

test("sunk a horizontal 4ship", () => {
  const shipInstance = new Ship(4);
  gameboardInstance.placeShip([0, 0], shipInstance);
  gameboardInstance.receiveAttack([0, 0]);
  gameboardInstance.receiveAttack([0, 1]);
  gameboardInstance.receiveAttack([0, 2]);
  gameboardInstance.receiveAttack([0, 3]);
  expect(shipInstance.isSunk()).toBe(true);
});
test("rotate a ship and make sure it's horizontal version is deleted", () => {
  const shipInstance = new Ship(2);
  gameboardInstance.placeShip([0, 0], shipInstance);
  gameboardInstance.rotateShip([0, 0]);
  expect(gameboardInstance.getBoard()[0][1]).toBe(0);
  expect(gameboardInstance.getBoard()[0][0]).toBe(shipInstance);
  expect(gameboardInstance.getBoard()[1][0]).toBe(shipInstance);
});
test("sunk a vertical 4ship in middle of board", () => {
  const shipInstance = new Ship(4);
  gameboardInstance.placeShip([4, 4], shipInstance);
  gameboardInstance.rotateShip([4, 4]);
  gameboardInstance.receiveAttack([4, 4]);
  gameboardInstance.receiveAttack([5, 4]);
  gameboardInstance.receiveAttack([6, 4]);
  gameboardInstance.receiveAttack([7, 4]);
  expect(shipInstance.isSunk()).toBe(true);
});
