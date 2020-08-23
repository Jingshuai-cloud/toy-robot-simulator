describe("When Robot Position on the Board is Valid", () => {
  //mock the Board class and let the boardPosition return valid
  const Robot = require("./Robot.js");
  const Board = require("./Board.js");

  jest.mock("./Board.js", () => {
    return jest.fn().mockImplementation(() => {
      return {
        isBoradPositionValid: () => {
          return true;
        },
      };
    });
  });

  const TEST_ROBOT_INITIAL_POSITION = [0, 0, "INITIAL"];
  const TEST_BOARD_INITIAL_SIZE = [5, 5];
  const testBoard = new Board(TEST_BOARD_INITIAL_SIZE);
  const testRobot = new Robot(TEST_ROBOT_INITIAL_POSITION, testBoard);

  it("should call Robot constructor", () => {
    expect(Board).toHaveBeenCalledTimes(1);
    expect(testRobot.initialFacing).toBe("INITIAL");
    expect(testRobot.position).toStrictEqual({ X: 0, Y: 0, facing: "INITIAL" });
  });

  it("should place Robot to correct position", () => {
    const testPlaceCommand = "PLACE 3,4,WEST";
    const newPosition = testRobot.place(testPlaceCommand);
    expect(newPosition).toStrictEqual({
      X: 3,
      Y: 4,
      facing: "WEST",
    });
  });

  it("should turn to the correct direction", () => {
    let testPlaceCommand = "PLACE 3,4,WEST";
    testRobot.place(testPlaceCommand);
    expect(testRobot.turn("RIGHT").facing).toBe("NORTH");
    expect(testRobot.turn("LEFT").facing).toBe("WEST");

    testPlaceCommand = "PLACE 3,4,EAST";
    testRobot.place(testPlaceCommand);
    expect(testRobot.turn("LEFT").facing).toBe("NORTH");
    expect(testRobot.turn("RIGHT").facing).toBe("EAST");

    testPlaceCommand = "PLACE 3,4,NORTH";
    testRobot.place(testPlaceCommand);
    expect(testRobot.turn("LEFT").facing).toBe("WEST");
    expect(testRobot.turn("RIGHT").facing).toBe("NORTH");

    testPlaceCommand = "PLACE 3,4,SOUTH";
    testRobot.place(testPlaceCommand);
    expect(testRobot.turn("LEFT").facing).toBe("EAST");
    expect(testRobot.turn("RIGHT").facing).toBe("SOUTH");
  });

  it("should move to the correct position", () => {
    let testPlaceCommand = "PLACE 3,3,WEST";
    testRobot.place(testPlaceCommand);
    expect(testRobot.move()).toStrictEqual({
      X: 2,
      Y: 3,
      facing: "WEST",
    });

    testPlaceCommand = "PLACE 3,3,EAST";
    testRobot.place(testPlaceCommand);
    expect(testRobot.move()).toStrictEqual({
      X: 4,
      Y: 3,
      facing: "EAST",
    });

    testPlaceCommand = "PLACE 3,3,NORTH";
    testRobot.place(testPlaceCommand);
    expect(testRobot.move()).toStrictEqual({
      X: 3,
      Y: 4,
      facing: "NORTH",
    });

    testPlaceCommand = "PLACE 3,3,SOUTH";
    testRobot.place(testPlaceCommand);
    expect(testRobot.move()).toStrictEqual({
      X: 3,
      Y: 2,
      facing: "SOUTH",
    });
  });

  it("should report the position correctly", () => {
    console.log = jest.fn();
    testRobot.report();
    expect(console.log).toHaveBeenCalledWith({ X: 3, Y: 2, facing: "SOUTH" });
  });

  it("should execute command correctly", () => {
    testRobot.execute("PLACE 3,3,NORTH");
    expect(testRobot.position).toStrictEqual({ X: 3, Y: 3, facing: "NORTH" });

    testRobot.execute("LEFT");
    expect(testRobot.position).toStrictEqual({ X: 3, Y: 3, facing: "WEST" });

    testRobot.execute("RIGHT");
    expect(testRobot.position).toStrictEqual({ X: 3, Y: 3, facing: "NORTH" });

    testRobot.execute("MOVE");
    expect(testRobot.position).toStrictEqual({ X: 3, Y: 4, facing: "NORTH" });

    console.log = jest.fn();
    testRobot.execute("invalid input");
    expect(console.log).toHaveBeenCalledWith("Wrong Command");
  });
});
