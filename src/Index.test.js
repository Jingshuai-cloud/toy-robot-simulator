const { playGame } = require("./Index");

it("should execute command correctly", () => {
  console.log = jest.fn();
  playGame();
  expect(console.log).toHaveBeenCalledWith({ X: 4, Y: 4, facing: "EAST" });
});
