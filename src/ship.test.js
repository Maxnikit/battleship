/* eslint-disable import/no-extraneous-dependencies */
import { expect, test } from "@jest/globals";
import Ship from "./ship";

test("create a ship with length of 4", () => {
  const shipInstance = new Ship(4);
  expect(shipInstance.length).toBe(4);
});
test("hit a 4 health ship", () => {
  const shipInstance = new Ship(4);
  shipInstance.hit();
  expect(shipInstance.getHealth()).toBe(3);
});

test("hit a 1 health ship", () => {
  const shipInstance = new Ship(1);
  shipInstance.hit();
  expect(shipInstance.getHealth()).toBe(0);
  expect(shipInstance.isSunk()).toBe(true);
});
test("fail to hit a 0 health ship", () => {
  const shipInstance = new Ship(1).hit();
  expect(() => {
    shipInstance.hit().toThrow("Cannot hit a ship with health of 0");
  });
});
test("create a ship with length of 1", () => {
  const shipInstance = new Ship(1);
  expect(shipInstance.length).toBe(1);
});
test("fail to create a ship with length of 0", () => {
  expect(() => {
    new Ship(0).toThrow(`Length must be between ${minLength} and ${maxLength}`);
  });
});
