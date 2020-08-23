module.exports = class Robot {
  constructor(initialPosition, board) {
    const [x, y, initialFacing] = initialPosition;
    this.initialFacing = initialFacing;
    this.position = { X: x, Y: y, facing: initialFacing };
    this.board = board;
  }

  place(command) {
    //split command to [3, 4, NORTH]
    const placeCommand = command.split(" ")[1];
    const placePosition = placeCommand.split(",");
    const newX = parseInt(placePosition[0]);
    const newY = parseInt(placePosition[1]);
    const newFacing = placePosition[2];
    const newPosition = { X: newX, Y: newY, facing: newFacing };

    //check with board whether position is valid
    if (this.board.isBoradPositionValid(newX, newY)) {
      this.position = newPosition;
    }

    return this.position;
  }

  // command = "LEFT" or "RIGHT"
  turn(command) {
    const facing = this.position.facing;
    if (facing === this.initialFacing) return this.position;

    const direction = {
      RIGHT: 0,
      LEFT: 1,
    };

    const turnIndex = direction[command];

    const nextFacing = {
      NORTH: ["EAST", "WEST"],
      EAST: ["SOUTH", "NORTH"],
      SOUTH: ["WEST", "EAST"],
      WEST: ["NORTH", "SOUTH"],
    };

    const newFacing = nextFacing[facing][turnIndex];

    this.position = {
      ...this.position,
      facing: newFacing,
    };

    return this.position;
  }

  move() {
    const facing = this.position.facing;
    if (facing === this.initialFacing) return this.position;

    const nextStep = {
      NORTH: { X: 0, Y: 1 },
      EAST: { X: 1, Y: 0 },
      SOUTH: { X: 0, Y: -1 },
      WEST: { X: -1, Y: 0 },
    };

    //caculate the next step
    const nextPosition = nextStep[facing];
    const newX = this.position.X + nextPosition.X;
    const newY = this.position.Y + nextPosition.Y;

    //check with board whether position is valid
    if (this.board.isBoradPositionValid(newX, newY)) {
      this.position = {
        ...this.position,
        X: newX,
        Y: newY,
      };
    }

    return this.position;
  }

  report() {
    console.log(this.position);
    return this.position;
  }

  execute(command) {
    //Get PLACE from PLACE 3,4,NORTH Command
    let commandFirstWord = command.split(" ")[0];

    switch (commandFirstWord) {
      case "PLACE":
        this.place(command);
        break;

      case "MOVE":
        this.move();
        break;

      case "LEFT":
      case "RIGHT":
        this.turn(command);
        break;

      case "REPORT":
        this.report();
        break;
      //Wrong Command
      default:
        console.log("Wrong Command");
    }
  }
};
