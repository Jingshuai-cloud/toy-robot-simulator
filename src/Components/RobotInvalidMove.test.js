describe("When Robot Position on the Board is not Valid", () => {
  //mock the Board class and let the boardPosition return invalid
  const Robot = require("./Robot.js");
  const Board = require("./Board.js");
  jest.mock("./Board.js", () => {
    return jest.fn().mockImplementation(() => {
      return {
        isBoradPositionValid: () => {
          return false;
        },
      };
    });
  });

  const TEST_ROBOT_INITIAL_POSITION = [0, 0, "INITIAL"];
  const TEST_BOARD_INITIAL_SIZE = [5, 5];
  const testBoard = new Board(TEST_BOARD_INITIAL_SIZE);
  const testRobot = new Robot(TEST_ROBOT_INITIAL_POSITION, testBoard);

  it("should not place Robot to invalid position", () => {
    const testPlaceCommand = "PLACE 4,5,WEST";
    const newPosition = testRobot.place(testPlaceCommand);
    expect(newPosition).toStrictEqual({
      X: 0,
      Y: 0,
      facing: "INITIAL",
    });
  });

  it("should not move Robot before place robot to a valid position", () => {
    expect(testRobot.move()).toStrictEqual({
      X: 0,
      Y: 0,
      facing: "INITIAL",
    });
  });

  it("should not turn left or right before place robot to a valid position", () => {
    expect(testRobot.turn("LEFT")).toStrictEqual({
      X: 0,
      Y: 0,
      facing: "INITIAL",
    });

    expect(testRobot.turn("RIGHT")).toStrictEqual({
      X: 0,
      Y: 0,
      facing: "INITIAL",
    });
  });

  it("should not move Robot to invalid position", () => {
    const TEST_ROBOT_INITIAL_POSITION = [4, 4, "NORTH"];
    const newTestRobot = new Robot(TEST_ROBOT_INITIAL_POSITION, testBoard);
    expect(newTestRobot.move()).toStrictEqual({
      X: 4,
      Y: 4,
      facing: "NORTH",
    });
  });
});
