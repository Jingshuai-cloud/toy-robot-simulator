const Board = require("./Board.js");

const TEST_BOARD_INITIAL_SIZE = [5, 5];
const testBoard = new Board(TEST_BOARD_INITIAL_SIZE);

it("should run constructor correctly", () => {
  expect(testBoard.boardRange).toStrictEqual({ X: 4, Y: 4 });
});

it("should return true when robot position is valid", () => {
  expect(testBoard.isBoradPositionValid(0, 0)).toBe(true);
  expect(testBoard.isBoradPositionValid(0, 4)).toBe(true);
  expect(testBoard.isBoradPositionValid(4, 0)).toBe(true);
  expect(testBoard.isBoradPositionValid(4, 4)).toBe(true);
});

it("should return false when robot position is not valid", () => {
  expect(testBoard.isBoradPositionValid(-1, 0)).toBe(false);
  expect(testBoard.isBoradPositionValid(0, -1)).toBe(false);
  expect(testBoard.isBoradPositionValid(5, 0)).toBe(false);
  expect(testBoard.isBoradPositionValid(0, 5)).toBe(false);
});
