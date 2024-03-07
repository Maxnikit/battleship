/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, test } from "@jest/globals";
import Ship from "./ship";
import Gameboard from "./gameboard";

let gameboardInstance;

beforeEach(() => {
  gameboardInstance = new Gameboard();
});

describe("gameboard logic", () => {
  test("create a gameboard", () => {
    expect(gameboardInstance.board.length).toBe(10);
    expect(gameboardInstance.board[0].length).toBe(10);
  });
  test("check if board knows when all ships are sunk", () => {
    const shipInstance = new Ship(4);

    gameboardInstance.placeShip([0, 0], shipInstance);
    expect(gameboardInstance.areAllShipsSunk()).toBe(false);
    gameboardInstance.receiveAttack([0, 0]);
    gameboardInstance.receiveAttack([0, 1]);
    gameboardInstance.receiveAttack([0, 2]);
    gameboardInstance.receiveAttack([0, 3]);
    const shipInstance2 = new Ship(1);
    gameboardInstance.placeShip([8, 0], shipInstance2);
    gameboardInstance.receiveAttack([8, 0]);
    expect(gameboardInstance.areAllShipsSunk()).toBe(true);
  });
});

describe("placing ships", () => {
  test("put a 4ship on 0:0", () => {
    const shipInstance = new Ship(4);
    gameboardInstance.placeShip([0, 0], shipInstance);
    expect(gameboardInstance.getBoard()[0][0]).toBe(shipInstance);
  });
  test("put a 4ship on left-up edge", () => {
    const shipInstance = new Ship(4);
    expect(gameboardInstance.placeShip([0, 0], shipInstance)).toBe(true);
  });

  test("put a 4ship on right-up edge", () => {
    const shipInstance = new Ship(4);
    expect(gameboardInstance.placeShip([0, 6], shipInstance)).toBe(true);
  });

  test("put a 4ship on right-down edge", () => {
    const shipInstance = new Ship(4);
    expect(gameboardInstance.placeShip([9, 6], shipInstance)).toBe(true);
  });

  test("put a 4ship on left-down edge", () => {
    const shipInstance = new Ship(4);
    expect(gameboardInstance.placeShip([9, 0], shipInstance)).toBe(true);
  });
  test("try to put a ship next to another ship", () => {
    const shipInstance = new Ship(4);
    gameboardInstance.placeShip([0, 0], shipInstance);
    const shipInstance2 = new Ship(4);
    gameboardInstance.placeShip([1, 0], shipInstance2);
    expect(() => {
      gameboardInstance.getBoard()[1][0].toBe(0);
    });
  });
  test("try to put ship in another ship", () => {
    const shipInstance = new Ship(4);
    gameboardInstance.placeShip([0, 0], shipInstance);
    const shipInstance2 = new Ship(4);
    gameboardInstance.placeShip([0, 1], shipInstance2);
    expect(() => {
      gameboardInstance.getBoard()[0][4].toBe(0);
    });
  });
});

describe("rotate a ship", () => {
  test("rotate a ship and make sure it's horizontal version is deleted", () => {
    const shipInstance = new Ship(2);
    gameboardInstance.placeShip([0, 0], shipInstance);
    gameboardInstance.rotateShip([0, 0]);
    expect(shipInstance.orientation).toBe("vertical");
    expect(gameboardInstance.getBoard()[0][1]).toBe(0);
    expect(gameboardInstance.getBoard()[0][0]).toBe(shipInstance);
    expect(gameboardInstance.getBoard()[1][0]).toBe(shipInstance);
  });
  test("rotate should be impossible due collision with another ship", () => {
    const shipInstance1 = new Ship(3);
    const shipInstance2 = new Ship(3);
    gameboardInstance.placeShip([0, 0], shipInstance1);
    gameboardInstance.placeShip([2, 0], shipInstance2);
    expect(() => {
      gameboardInstance.getBoard()[1][0].toBe(0);
    });
  });
});

describe("attacking ships", () => {
  test("hit a ship", () => {
    const shipInstance = new Ship(4);
    gameboardInstance.placeShip([0, 0], shipInstance);
    gameboardInstance.receiveAttack([0, 0]);
    expect(gameboardInstance.getBoard()[0][0].getHealth()).toBe(3);
  });
  test("miss a ship", () => {
    const shipInstance = new Ship(4);
    gameboardInstance.placeShip([0, 0], shipInstance);
    gameboardInstance.receiveAttack([5, 5]);
    expect(gameboardInstance.getBoard()[5][5]).toBe("miss");
  });
});

describe("sunking ships", () => {
  test("sunk a ship", () => {
    const shipInstance = new Ship(4);
    gameboardInstance.placeShip([0, 0], shipInstance);
    expect(shipInstance.isSunk()).toBe(false);
    gameboardInstance.receiveAttack([0, 0]);
    gameboardInstance.receiveAttack([0, 1]);
    gameboardInstance.receiveAttack([0, 2]);
    gameboardInstance.receiveAttack([0, 3]);
    expect(shipInstance.isSunk()).toBe(true);
  });
});
